from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from email.mime.image import MIMEImage

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import feedparser
import requests
from bs4 import BeautifulSoup
import os
import json
import time
import calendar
from datetime import datetime, timezone


_LIVE_NEWS_CACHE = {"ts": 0, "data": None}
_CACHE_TTL = 60 * 10  


def _try_parse_entry_date(entry):
    """Attempts to get a proper datetime from an RSS entry."""
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
    """Fetch RSS feed items."""
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
    """Scrape websites like TaxScan / CBIC."""
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
    """Regex-based extraction of date-like strings from CA/GST/IT pages."""
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


def _normalize_item(title, date, source, link):
    return {
        "title": (title or "").strip(),
        "date": date or "",
        "source": source or "",
        "link": link or ""
    }


@csrf_exempt
def live_news(request):
    """
    FINAL AUTOMATIC VERSION
    Returns:
    {
      ok: True,
      today: [...],
      previous: [...],
      blogs: [...],
      due_dates: [...]
    }
    """

    now_ts = time.time()


    if (
        _LIVE_NEWS_CACHE["data"]
        and now_ts - _LIVE_NEWS_CACHE["ts"] < _CACHE_TTL
    ):
        return JsonResponse(_LIVE_NEWS_CACHE["data"])

    news = []
    blogs = []
    due_dates = []
    news += _parse_feed("https://taxguru.in/feed", "TaxGuru", limit=12)
    news += _parse_feed("https://www.mca.gov.in/bin/mca/rss-feed.xml", "MCA", limit=8)
    news += _parse_feed("https://incometaxindia.gov.in/_layouts/15/dit/TaxNewsHandler.ashx", "IncomeTax", limit=8)


    blogs += _parse_feed("https://www.caknowledge.com/feed", "CAknowledge", limit=10)
    blogs += _scrape_simple_list("https://taxscan.in/category/gst/", ["h2.entry-title a"], "TaxScan", limit=10)

    news += _scrape_simple_list("https://cbic-gst.gov.in/news.html",
                                [".listing li a", ".news-list a"],
                                "CBIC/GST",
                                limit=12)

  
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
        normalized = _normalize_item(item["title"], item.get("date", ""), item["source"], item.get("link", ""))
        if i < 6:
            today.append(normalized)
        else:
            previous.append(normalized)

    final = {
        "ok": True,
        "today": today,
        "previous": previous[:40],
        "blogs": blogs[:12],
        "due_dates": due_dates[:12],
    }


    _LIVE_NEWS_CACHE["ts"] = time.time()
    _LIVE_NEWS_CACHE["data"] = final

    return JsonResponse(final)
    
@csrf_exempt
def apply_form(request):

    if request.method != "POST":
        return JsonResponse({"ok": False, "message": "Invalid request"}, status=405)

    try:
        data = request.POST
        form_type = data.get("formType", "application")

        # =================================================
        # CONTACT FORM
        # =================================================
        if form_type == "contact":

            name = data.get("name", "")
            number = data.get("number", "")
            email = data.get("email", "")
            city = data.get("city", "")
            message = data.get("message", "")

            if not name or not email:
                return JsonResponse(
                    {"ok": False, "message": "Name and Email required"},
                    status=400
                )

            # ⭐ YOUR ORIGINAL HTML — NOT TOUCHED ⭐
            html_body = f"""
<div style='width:100%; background:#f1f3f6; padding:20px; font-family:Arial, sans-serif;'>

  <table align='center' width='600' cellpadding='0' cellspacing='0'
         style='background:#ffffff; border-radius:10px; border:1px solid #d7dce2;
                box-shadow:0 2px 8px rgba(0,0,0,0.08);'>

    <tr>
      <td style="background:#0A1A44; padding:28px 20px; color:#fff;
                 border-radius:10px 10px 0 0; text-align:center;">

        <table align="center" cellpadding="0" cellspacing="0"
               style="margin:0 auto; text-align:center;">
          <tr>
            <td align="right" valign="middle" style="padding-right:12px;">
              <img src="cid:firmlogo" alt="Firm Logo" style="width:65px; height:auto; display:block;">
            </td>
            <td align="left" valign="middle">
              <div style="font-size:22px; font-weight:700; margin-bottom:2px;">
                Pavan Kalyan & Associates
              </div>
              <div style="font-size:14px; opacity:0.85;">
                Chartered Accountants
              </div>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <tr>
      <td style='padding:24px;'>

        <h3 style='font-size:16px; color:#0A1A44; margin:0 0 8px 0;'>Contact Enquiry</h3>

        <table width='100%' style='font-size:15px; line-height:1.45;'>
          <tr><td><b>Name:</b></td><td>{name}</td></tr>
          <tr><td><b>Email:</b></td><td>{email}</td></tr>
          <tr><td><b>Mobile:</b></td><td>{number}</td></tr>
          <tr><td><b>City:</b></td><td>{city}</td></tr>
          <tr><td><b>Message:</b></td><td>{message}</td></tr>
        </table>

      </td>
    </tr>

    <tr>
      <td style='background:#f1f3f7; padding:14px; text-align:center; font-size:13px;
                 color:#555; border-top:1px solid #d8dce2; border-radius:0 0 10px 10px;'>
        Sent to HR Email: {settings.HR_EMAIL}<br>
        © Pavan Kalyan & Associates — Chartered Accountants
      </td>
    </tr>

  </table>

</div>
"""

            # ---- SEND EMAIL (SAFE, NO CRASH) ----
            try:
                mail = EmailMultiAlternatives(
                    subject=f"Contact Enquiry — {name}",
                    body="",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[settings.HR_EMAIL],
                )
                mail.attach_alternative(html_body, "text/html")

                try:
                    mail.send()
                except Exception as e:
                    print("CONTACT EMAIL ERROR:", e)

            except Exception as e:
                print("CONTACT SEND BLOCK ERROR:", e)

            return JsonResponse({"ok": True, "message": "Message sent"})

        # =================================================
        # JOB APPLICATION
        # =================================================
        first = data.get("firstName", "")
        last = data.get("lastName", "")
        email = data.get("email", "")
        mobile = data.get("mobile", "")
        position = data.get("position", "")

        if not all([first, last, email, mobile, position]):
            return JsonResponse({"ok": False, "message": "Missing required fields"}, status=400)

        resume = request.FILES.get("resume")

        try:
            mail = EmailMultiAlternatives(
                subject=f"Job Application — {first} {last}",
                body=f"Position: {position}\nMobile: {mobile}\nEmail: {email}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.HR_EMAIL],
            )

            if resume:
                mail.attach(resume.name, resume.read(), resume.content_type)

            try:
                mail.send()
            except Exception as e:
                print("JOB EMAIL ERROR:", e)

        except Exception as e:
            print("JOB SEND BLOCK ERROR:", e)

        return JsonResponse({"ok": True, "message": "Application sent"})

    except Exception as e:
        print("APPLY_FORM ERROR:", e)
        return JsonResponse({"ok": False, "message": "Server error"}, status=500)