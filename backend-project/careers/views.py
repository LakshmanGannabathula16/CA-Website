from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

import requests
import feedparser
import time
import calendar
import base64
from pathlib import Path
from datetime import datetime, timezone
from bs4 import BeautifulSoup


# =========================================================
# LIVE NEWS
# =========================================================

_LIVE_NEWS_CACHE = {"ts": 0, "data": None}
_CACHE_TTL = 60 * 10


def _try_parse_entry_date(entry):
    if not entry:
        return None

    t = entry.get("published_parsed") or entry.get("updated_parsed")
    if t:
        try:
            ts = calendar.timegm(t)
            return datetime.fromtimestamp(ts, tz=timezone.utc)
        except Exception:
            pass

    s = entry.get("published") or entry.get("updated") or entry.get("pubDate") or ""
    if s:
        try:
            return datetime.fromtimestamp(
                time.mktime(time.strptime(s[:25], "%a, %d %b %Y %H:%M:%S"))
            ).replace(tzinfo=timezone.utc)
        except Exception:
            pass

    return None


def _parse_feed(url, source, limit=10):
    out = []
    try:
        feed = feedparser.parse(url)
        for entry in feed.entries[:limit]:
            dt = _try_parse_entry_date(entry)
            out.append({
                "title": entry.get("title", "").strip(),
                "parsed_dt": dt.isoformat() if dt else "",
                "date": dt.isoformat() if dt else "",
                "source": source,
                "link": entry.get("link", "")
            })
    except Exception:
        pass
    return out


def _scrape_simple_list(url, selectors, source, limit=8):
    out = []
    try:
        r = requests.get(url, timeout=8, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(r.text, "lxml")

        for sel in selectors:
            for el in soup.select(sel):
                if len(out) >= limit:
                    return out
                title = el.get_text(strip=True)
                href = el.get("href") if el.name == "a" else ""
                if title:
                    full = href if href.startswith("http") else url.rstrip("/") + "/" + href.lstrip("/")
                    out.append({
                        "title": title,
                        "parsed_dt": "",
                        "date": "",
                        "source": source,
                        "link": full
                    })
    except Exception:
        pass
    return out


def _extract_due_dates(url, source, limit=6):
    import re
    out = []
    try:
        r = requests.get(url, timeout=8, headers={"User-Agent": "Mozilla/5.0"})
        txt = r.text

        patterns = [
            r"(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-zA-Z]*\s+\d{4})",
            r"(\d{2}-\d{2}-\d{4})",
            r"(\d{4}-\d{2}-\d{2})"
        ]

        found = set()

        for pat in patterns:
            for m in re.finditer(pat, txt, flags=re.IGNORECASE):
                if len(out) >= limit:
                    return out
                d = m.group(1)
                if d not in found:
                    found.add(d)
                    out.append({
                        "date": d,
                        "title": f"Due date mention ({source})",
                        "source": source
                    })
    except Exception:
        pass

    return out


@csrf_exempt
def live_news(request):

    now_ts = time.time()

    if _LIVE_NEWS_CACHE["data"] and now_ts - _LIVE_NEWS_CACHE["ts"] < _CACHE_TTL:
        return JsonResponse(_LIVE_NEWS_CACHE["data"])

    news = []
    blogs = []
    due_dates = []

    news += _parse_feed("https://taxguru.in/feed", "TaxGuru", 12)
    news += _parse_feed("https://www.mca.gov.in/bin/mca/rss-feed.xml", "MCA", 8)
    news += _parse_feed("https://incometaxindia.gov.in/_layouts/15/dit/TaxNewsHandler.ashx", "IncomeTax", 8)

    blogs += _parse_feed("https://www.caknowledge.com/feed", "CAknowledge", 10)
    blogs += _scrape_simple_list("https://taxscan.in/category/gst/", ["h2.entry-title a"], "TaxScan", 10)

    news += _scrape_simple_list(
        "https://cbic-gst.gov.in/news.html",
        [".listing li a", ".news-list a"],
        "CBIC/GST",
        12
    )

    due_dates += _extract_due_dates("https://cbic-gst.gov.in/news.html", "CBIC/GST")
    due_dates += _extract_due_dates("https://incometaxindia.gov.in", "IncomeTax")
    due_dates += _extract_due_dates("https://taxguru.in", "TaxGuru")

    def dedupe(arr):
        seen = set()
        out = []
        for it in arr:
            key = it.get("title", "").lower().strip()
            if key and key not in seen:
                seen.add(key)
                out.append(it)
        return out

    news = dedupe(news)
    blogs = dedupe(blogs)
    due_dates = dedupe(due_dates)

    def sort_key(x):
        try:
            return datetime.fromisoformat(x.get("parsed_dt") or "").timestamp()
        except:
            return 0

    news.sort(key=sort_key, reverse=True)

    today = []
    previous = []

    for i, item in enumerate(news):
        obj = {
            "title": item["title"],
            "date": item.get("date", ""),
            "source": item["source"],
            "link": item.get("link", "")
        }
        if i < 6:
            today.append(obj)
        else:
            previous.append(obj)

    final = {
        "ok": True,
        "today": today,
        "previous": previous[:40],
        "blogs": blogs[:12],
        "due_dates": due_dates[:12],
    }

    _LIVE_NEWS_CACHE["ts"] = now_ts
    _LIVE_NEWS_CACHE["data"] = final

    return JsonResponse(final)
@csrf_exempt
def apply_form(request):

    if request.method != "POST":
        return JsonResponse({"ok": False, "message": "Invalid request"}, status=405)

    try:
        import base64, requests
        from django.conf import settings

        data = request.POST
        files = request.FILES

        form_type = data.get("formType", "application")

        # -------------------------------------------------------------
        # CONTACT FORM (NO LOGO)
        # -------------------------------------------------------------
        if form_type == "contact":

            name = data.get("name", "")
            number = data.get("number", "")
            email = data.get("email", "")
            city = data.get("city", "")
            message = data.get("message", "")

            html_body = f"""
<div style="font-family:Arial,Helvetica,sans-serif;background:#eef1f6;padding:6px 0;">
  <table cellpadding="0" cellspacing="0"
    style="
      width:100%;
      max-width:680px;
      margin-left:auto;
      margin-right:auto;
      background:#ffffff;
      border-radius:14px;
      border:1px solid #d9dde5;
    ">

    <!-- HEADER -->
    <tr>
      <td style="background:#0A1A44;padding:16px;border-radius:14px 14px 0 0;color:#fff;text-align:center;">
        <div style="font-size:18px;font-weight:800;">Pavan Kalyan & Associates</div>
        <div style="font-size:12px;opacity:.9;">Chartered Accountants</div>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td style="padding:10px 10px;font-size:14px;color:#222;">

        <h3 style="margin:0 0 10px;">Contact Details</h3>

        <table width="100%" style="line-height:1.9; table-layout:fixed;">
          <tr><td width="170"><b>Name:</b></td><td>{name}</td></tr>
          <tr><td><b>Email:</b></td><td>{email}</td></tr>
          <tr><td><b>Mobile:</b></td><td>{number}</td></tr>
          <tr><td><b>City:</b></td><td>{city}</td></tr>
          <tr><td><b>Message:</b></td><td>{message}</td></tr>
        </table>

      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:#f5f7fb;padding:10px;text-align:center;font-size:11px;color:#666;border-radius:0 0 14px 14px;">
        Sent to HR Email: {settings.HR_EMAIL}<br>
        © Pavan Kalyan & Associates — Chartered Accountants
      </td>
    </tr>

  </table>
</div>
"""

            payload = {
                "personalizations": [{
                    "to": [{"email": settings.HR_EMAIL}],
                    "subject": f"Contact Enquiry — {name}",
                }],
                "from": {"email": settings.DEFAULT_FROM_EMAIL},
                "reply_to": {"email": email},
                "content": [
                    {"type": "text/plain", "value": "Contact enquiry"},
                    {"type": "text/html", "value": html_body},
                ],
            }

            requests.post(
                "https://api.sendgrid.com/v3/mail/send",
                json=payload,
                headers={
                    "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
                    "Content-Type": "application/json",
                },
                timeout=15,
            )

            return JsonResponse({"ok": True, "message": "Message sent"})

        # -------------------------------------------------------------
        # JOB APPLICATION (NO LOGO)
        # -------------------------------------------------------------

        first = data.get("firstName", "")
        last = data.get("lastName", "")
        email = data.get("email", "")
        mobile = data.get("mobile", "")
        gender = data.get("gender", "")
        dob = data.get("dob", "")

        position = data.get("position", "")
        qualification = data.get("qualification", "")
        lastCompany = data.get("lastCompany", "")
        experienceYear = data.get("experienceYear", "")
        experienceMonth = data.get("experienceMonth", "")
        portfolio = data.get("portfolio", "")
        comments = data.get("comments", "")

        html_body = f"""
<div style="font-family:Arial,Helvetica,sans-serif;background:#eef1f6;padding:6px 0;">
  <table cellpadding="0" cellspacing="0"
    style="
      width:100%;
      max-width:680px;
      margin-left:auto;
      margin-right:auto;
      background:#ffffff;
      border-radius:14px;
      border:1px solid #d9dde5;
    ">

    <!-- HEADER -->
    <tr>
      <td style="background:#0A1A44;padding:16px;border-radius:14px 14px 0 0;color:#fff;text-align:center;">
        <div style="font-size:18px;font-weight:800;">Pavan Kalyan & Associates</div>
        <div style="font-size:12px;opacity:.9;">Chartered Accountants</div>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td style="padding:10px 10px;font-size:14px;color:#222;">

        <h3 style="margin:0 0 10px;">Personal Details</h3>

        <table width="100%" style="line-height:1.9; table-layout:fixed;">
          <tr><td width="170"><b>Name:</b></td><td>{first} {last}</td></tr>
          <tr><td><b>Email:</b></td><td>{email}</td></tr>
          <tr><td><b>Mobile:</b></td><td>{mobile}</td></tr>
          <tr><td><b>Gender:</b></td><td>{gender or "—"}</td></tr>
          <tr><td><b>Date of Birth:</b></td><td>{dob or "—"}</td></tr>
        </table>

        <hr style="border:none;border-top:1px solid #e3e6ef;margin:10px 0;">

        <h3 style="margin:0 0 10px;">Professional Details</h3>

        <table width="100%" style="line-height:1.9; table-layout:fixed;">
          <tr><td width="170"><b>Position:</b></td><td>{position}</td></tr>
          <tr><td><b>Qualification:</b></td><td>{qualification}</td></tr>
          <tr><td><b>Last Company:</b></td><td>{lastCompany or "—"}</td></tr>
          <tr><td><b>Experience:</b></td><td>{experienceYear or "0"} Years {experienceMonth or "0"} Months</td></tr>
        </table>

        <hr style="border:none;border-top:1px solid #e3e6ef;margin:10px 0;">

        <h3 style="margin:0 0 10px;">Additional Information</h3>

        <table width="100%" style="line-height:1.9; table-layout:fixed;">
          <tr><td width="170"><b>Portfolio:</b></td><td>{portfolio or "—"}</td></tr>
          <tr><td><b>Comments:</b></td><td>{comments or "—"}</td></tr>
        </table>

        <div style="
          margin-top:10px;
          background:#0A1A44;
          color:#ffffff;
          padding:10px;
          border-radius:8px;
          text-align:center;
          font-size:13px;
          width:100%;
          box-sizing:border-box;
        ">
          The applicant’s resume is attached with this email.
        </div>

      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:#f5f7fb;padding:10px;text-align:center;font-size:11px;color:#666;border-radius:0 0 14px 14px;">
        Sent to HR Email: {settings.HR_EMAIL}<br>
        © Pavan Kalyan & Associates — Chartered Accountants
      </td>
    </tr>

  </table>
</div>
"""

        attachments = []
        if "resume" in files:
            resume = files["resume"]
            encoded = base64.b64encode(resume.read()).decode()
            attachments.append({
                "content": encoded,
                "type": resume.content_type,
                "filename": resume.name,
                "disposition": "attachment",
            })

        payload = {
            "personalizations": [{
                "to": [{"email": settings.HR_EMAIL}],
                "subject": f"Job Application — {first} {last}",
            }],
            "from": {"email": settings.DEFAULT_FROM_EMAIL},
            "reply_to": {"email": email},
            "content": [
                {"type": "text/plain", "value": "Job application"},
                {"type": "text/html", "value": html_body},
            ],
            "attachments": attachments or None,
        }

        requests.post(
            "https://api.sendgrid.com/v3/mail/send",
            json=payload,
            headers={
                "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
                "Content-Type": "application/json",
            },
            timeout=15,
        )

        return JsonResponse({"ok": True, "message": "Application sent"})

    except Exception as e:
        print("APPLY_FORM ERROR:", e)
        return JsonResponse({"ok": False, "message": "Server error"}, status=500)
