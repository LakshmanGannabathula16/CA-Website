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


@csrf_exempt
def apply_form(request):

    if request.method != "POST":
        return JsonResponse({"ok": False, "message": "Invalid request"}, status=405)

    try:
        data = request.POST
        files = request.FILES

        form_type = data.get("formType", "application")

        # =========================================================
        # CONTACT FORM
        # =========================================================
        if form_type == "contact":
            name = data.get("name", "")
            number = data.get("number", "")
            email = data.get("email", "")
            city = data.get("city", "")
            message = data.get("message", "")

            html_body = f"""
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#eef1f6;">
    <table width="100%" cellspacing="0" cellpadding="0" style="background:#eef1f6;">
      <tr>
        <td align="center" style="padding:12px 8px;">

          <table width="100%" cellspacing="0" cellpadding="0" style="max-width:900px;background:#ffffff;border:1px solid #d9dde5;border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">

            <!-- HEADER -->
            <tr>
              <td style="background:#0A1A44;padding:16px 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td valign="middle">
                            <img src="https://ca-website-qj5u.onrender.com/static/ca-logo.png"
                                 style="display:block;width:52px;height:auto;border-radius:10px;margin-right:10px;">
                          </td>
                          <td valign="middle">
                            <div style="color:#ffffff;font-size:18px;font-weight:800;white-space:nowrap;">
                              Pavan Kalyan & Associates — <span style="font-weight:500;">Chartered Accountants</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:14px 16px;color:#1c1c1c;font-size:14px;">

                <h3 style="margin:6px 0 12px;">Contact Enquiry</h3>

                <b>Contact Details</b><br>
                Name: {name}<br>
                Email: {email}<br>
                Mobile: {number}<br>
                City: {city}<br>
                Message: {message}<br>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f6f7fb;padding:10px;text-align:center;color:#666;font-size:11px;">
                Sent to HR Email: {settings.HR_EMAIL}<br>
                © Pavan Kalyan & Associates — Chartered Accountants
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
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

        # =========================================================
        # JOB APPLICATION
        # =========================================================
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
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#eef1f6;">
    <table width="100%" cellspacing="0" cellpadding="0" style="background:#eef1f6;">
      <tr>
        <td align="center" style="padding:12px 8px;">

          <table width="100%" cellspacing="0" cellpadding="0" style="max-width:900px;background:#ffffff;border:1px solid #d9dde5;border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">

            <!-- HEADER -->
            <tr>
              <td style="background:#0A1A44;padding:16px 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td valign="middle">
                            <img src="https://ca-website-qj5u.onrender.com/static/ca-logo.png"
                                 style="display:block;width:52px;height:auto;border-radius:10px;margin-right:10px;">
                          </td>
                          <td valign="middle">
                            <div style="color:#ffffff;font-size:18px;font-weight:800;white-space:nowrap;">
                              Pavan Kalyan & Associates — <span style="font-weight:500;">Chartered Accountants</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:14px 16px;color:#1c1c1c;font-size:14px;">

                <h3 style="margin:6px 0 12px;">Job Application</h3>

                <b>Personal Details</b><br>
                Name: {first} {last}<br>
                Email: {email}<br>
                Mobile: {mobile}<br>
                Gender: {gender or "—"}<br>
                Date of Birth: {dob or "—"}<br><br>

                <b>Professional Details</b><br>
                Position: {position}<br>
                Qualification: {qualification}<br>
                Last Company: {lastCompany or "—"}<br>
                Experience: {experienceYear or "0"} Years {experienceMonth or "0"} Months<br><br>

                <b>Additional Information</b><br>
                Portfolio: {portfolio or "—"}<br>
                Comments: {comments or "—"}<br>

                <div style="margin-top:12px;background:#0A1A44;color:#ffffff;padding:10px;border-radius:8px;text-align:center;font-size:12px;">
                  The applicant’s resume is attached with this email.
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f6f7fb;padding:10px;text-align:center;color:#666;font-size:11px;">
                Sent to HR Email: {settings.HR_EMAIL}<br>
                © Pavan Kalyan & Associates — Chartered Accountants
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
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
