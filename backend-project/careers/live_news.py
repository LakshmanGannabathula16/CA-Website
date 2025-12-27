import requests
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

def fetch_mca_news():
    url = "https://www.mca.gov.in/bin/mca/rss-feed.xml"
    news = []

    try:
        r = requests.get(url, timeout=5)
        root = ET.fromstring(r.content)

        for item in root.findall('.//item')[:10]:
            news.append({
                "date": item.find("pubDate").text if item.find("pubDate") is not None else "",
                "title": item.find("title").text,
                "source": "MCA"
            })
    except:
        pass

    return news


def fetch_gst_news():
    url = "https://www.gst.gov.in/newsandupdates"
    news = []

    try:
        r = requests.get(url, timeout=5)
        soup = BeautifulSoup(r.text, "html.parser")

        updates = soup.select(".newstitle")[:10]
        dates = soup.select(".newsDate")[:10]

        for u, d in zip(updates, dates):
            news.append({
                "date": d.text,
                "title": u.text.strip(),
                "source": "GST"
            })

    except:
        pass

    return news


def fetch_taxguru_news():
    url = "https://taxguru.in/feed"
    news = []

    try:
        r = requests.get(url, timeout=5)
        root = ET.fromstring(r.content)

        for item in root.findall(".//item")[:10]:
            news.append({
                "date": item.find("pubDate").text,
                "title": item.find("title").text,
                "source": "TaxGuru"
            })
    except:
        pass

    return news


def get_all_news():
    final = []
    final.extend(fetch_mca_news())
    final.extend(fetch_gst_news())
    final.extend(fetch_taxguru_news())

    return final[:25] 
