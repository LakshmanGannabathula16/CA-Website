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
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import base64, requests


LOGO_URL = "https://ca-website-gilt-one.vercel.app/ca-logo.png"



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
    return JsonResponse(final, safe=False)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import base64, requests


@csrf_exempt
def apply_form(request):

    if request.method != "POST":
        return JsonResponse({"ok": False, "message": "Invalid request"}, status=405)

    try:
        data = request.POST
        files = request.FILES

        form_type = data.get("formType", "application").strip().lower()

        # ============================================================
        # CONTACT FORM  (UNCHANGED — EXACTLY YOUR TEMPLATE)
        # ============================================================
        if form_type == "contact":

            name = data.get("name", "")
            number = data.get("number", "")
            email = data.get("email", "")
            city = data.get("city", "")
            message = data.get("message", "")

            html_body = f"""
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#e9ecf4;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:14px 0;">
<tr>
<td align="center">

<table width="760" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;border:1px solid #d9ddea;font-family:Arial,Helvetica,sans-serif;">

<!-- HEADER -->
<tr>
<td style="background:#091a44;padding:22px 10px;border-radius:14px 14px 0 0;">
<table width="100%">
<tr>
<td align="center" style="color:#ffffff;font-size:20px;font-weight:900;padding:6px 0;">
Pavan Kalyan & Associates
<br>
<span style="font-size:13px;color:#dfe5ff;font-weight:600;">
Chartered Accountants
</span>
</td>
</tr>
</table>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:16px;font-size:14px;color:#1c1c1c;">

<h4 style="margin:0 0 10px;">Contact Enquiry</h4>

<table width="100%" style="line-height:2;">
<tr><td width="180"><b>Name:</b></td><td>{name}</td></tr>
<tr><td><b>Email:</b></td><td>{email}</td></tr>
<tr><td><b>Mobile:</b></td><td>{number}</td></tr>
<tr><td><b>City:</b></td><td>{city}</td></tr>
<tr><td><b>Message:</b></td><td>{message}</td></tr>
</table>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f6f8ff;padding:10px;text-align:center;font-size:11px;color:#666;border-radius:0 0 14px 14px;">
Sent to HR: {settings.HR_EMAIL}<br>
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

        # ============================================================
        # JOB APPLICATION  (LEFT AS IS — NO CHANGE)
        # ============================================================
        elif form_type in ["application", "job"]:

            first = data.get("firstName", "")
            last = data.get("lastName", "")
            applicant_email = data.get("email", "")
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
<body style="margin:0;padding:0;background:#e9ecf4;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:14px 0;">
<tr>
<td align="center">

<table width="760" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;border:1px solid #d9ddea;font-family:Arial,Helvetica,sans-serif;">

<tr>
<td style="background:#091a44;padding:22px 10px;border-radius:14px 14px 0 0;">
<table width="100%">
<tr>
<td align="center" style="color:#ffffff;font-size:20px;font-weight:900;padding:6px 0;">
Pavan Kalyan & Associates
<br>
<span style="font-size:13px;color:#dfe5ff;font-weight:600;">
Chartered Accountants
</span>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:16px;font-size:14px;color:#1c1c1c;">

<h3 style="margin:0 0 14px;text-align:center;font-size:18px;">
Job Application
</h3>

<table width="100%" style="line-height:2;">

<tr><td width="200"><b>Full Name:</b></td><td>{first} {last}</td></tr>
<tr><td><b>Email:</b></td><td>{applicant_email}</td></tr>
<tr><td><b>Mobile:</b></td><td>{mobile}</td></tr>
<tr><td><b>Gender:</b></td><td>{gender or "—"}</td></tr>
<tr><td><b>Date of Birth:</b></td><td>{dob or "—"}</td></tr>

<tr><td><b>Position:</b></td><td>{position}</td></tr>
<tr><td><b>Qualification:</b></td><td>{qualification}</td></tr>
<tr><td><b>Last Company:</b></td><td>{lastCompany or "—"}</td></tr>
<tr><td><b>Experience:</b></td><td>{experienceYear or "0"} Years {experienceMonth or "0"} Months</td></tr>

<tr><td><b>Portfolio:</b></td><td>{portfolio or "—"}</td></tr>
<tr><td><b>Comments:</b></td><td>{comments or "—"}</td></tr>

</table>

<div style="margin-top:14px;background:#091a44;color:#ffffff;padding:10px;border-radius:8px;text-align:center;">
The applicant’s resume is attached with this email.
</div>

</td>
</tr>

<tr>
<td style="background:#f6f8ff;padding:10px;text-align:center;font-size:11px;color:#666;border-radius:0 0 14px 14px;">
Sent to HR: {settings.HR_EMAIL}<br>
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
                "reply_to": {"email": applicant_email},
                "content": [
                    {"type": "text/plain", "value": "Job application"},
                    {"type": "text/html", "value": html_body},
                ],
                "attachments": attachments
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

        else:
            return JsonResponse({"ok": False, "message": "Unknown form type"}, status=400)

    except Exception as e:
        print("APPLY_FORM ERROR:", e)
        return JsonResponse({"ok": False, "message": "Server error"}, status=500)
