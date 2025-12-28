import React, { useEffect, useRef, useState } from "react";
export default function NewsUpdatesSection() {

    const API_URL = "/api/live-news/";

    const [today, setToday] = useState([]);
    const [previous, setPrevious] = useState([]);
    const [dueDates, setDueDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [monthFilter, setMonthFilter] = useState(-1);

    const latestRef = useRef(null);
    const dueRef = useRef(null);
    const todayRef = useRef(null);
    const rafIds = useRef({ latest: null, due: null, today: null });

    const MANUAL_DUE_DATES = [
        { date: "05 JAN 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 JAN 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 JAN 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "11 JAN 2026", title: "GST – GSTR-1" },
        { date: "20 JAN 2026", title: "GST – GSTR-3B" },

        { date: "05 FEB 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 FEB 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "11 FEB 2026", title: "GST – GSTR-1" },
        { date: "20 FEB 2026", title: "GST – GSTR-3B" },

        { date: "05 MAR 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 MAR 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "11 MAR 2026", title: "GST – GSTR-1" },
        { date: "20 MAR 2026", title: "GST – GSTR-3B" },
    ];


    const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const parseDate = (value) => {
        if (!value) return null;

        const apiDate = new Date(value);
        if (!isNaN(apiDate)) return apiDate;

        if (typeof value === "string") {
            const [dd, mon, yyyy] = value.split(" ");
            const m = MONTHS.indexOf(mon);
            if (m !== -1) return new Date(+yyyy, m, +dd);
        }
        return null;
    };

    const formatDate = (d) =>
        d
            ? d.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
            : "";

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (!mounted || !data?.ok) return;
                setToday(data.today || []);
                setPrevious(data.previous || []);
            })
            .finally(() => mounted && setLoading(false));

        return () => (mounted = false);
    }, []);

    useEffect(() => {
        setDueDates(MANUAL_DUE_DATES);
    }, []);

    const filteredDueDates = (
        monthFilter === -1
            ? dueDates
            : dueDates.filter(d => parseDate(d.date)?.getMonth() === monthFilter)
    )
        .map(d => ({ ...d, _date: parseDate(d.date) }))
        .filter(d => d._date)
        .sort((a, b) => a._date - b._date);

    const startAutoScroll = (ref, key, speed) => {
        const el = ref.current;
        if (!el) return;
        let pos = 0;
        const step = () => {
            pos += speed;
            if (pos >= el.scrollHeight - el.clientHeight) pos = 0;
            el.scrollTop = pos;
            rafIds.current[key] = requestAnimationFrame(step);
        };
        rafIds.current[key] = requestAnimationFrame(step);
    };

    const stopAutoScroll = (key) => {
        const id = rafIds.current[key];
        if (id) cancelAnimationFrame(id);
    };

    useEffect(() => {
        const t = setTimeout(() => {
            startAutoScroll(latestRef, "latest", 0.18);
            startAutoScroll(dueRef, "due", 0.12);
            startAutoScroll(todayRef, "today", 0.18);
        }, 400);

        return () => {
            clearTimeout(t);
            stopAutoScroll("latest");
            stopAutoScroll("due");
            stopAutoScroll("today");
        };
    }, [previous, today, filteredDueDates, monthFilter, loading]);

    const safeText = (v) => (v || "").toString();
    return (
        <section className="py-6 premium-bg">


            <div className="max-w-6xl mx-auto px-4">


                <style>{`
          /* Premium background - subtle */
          .premium-bg {
            background: linear-gradient(140deg, #0A1A44 0%, #134EC1 50%, #3BC6B6 100%);
            background-size: 300% 300%;
            animation: bgShift 18s ease infinite;
            padding-bottom: 36px;
          }
          @keyframes bgShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Card layout */
          .cards-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          @media (min-width: 768px) {
            .cards-grid { grid-template-columns: repeat(3, 1fr); }
          }

          .card {
            background: rgba(255,255,255,0.96);
            border-radius: 14px;
            height: 480px;
            display: flex;
            flex-direction: column;
            padding: 18px;
            box-shadow: 0 8px 30px rgba(10,26,68,0.12);
            border: 1px solid rgba(10,26,68,0.06);
            transition: transform .32s ease, box-shadow .32s ease;
            overflow: hidden;
          }
          .card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 40px rgba(10,26,68,0.16);
          }

          .card-header {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border-radius: 10px;
            padding: 8px 12px;
            box-shadow: inset 0 -1px 0 rgba(15,23,42,0.03);
            font-weight: 700;
            color: #0A1A44;
            letter-spacing: 0.2px;
            margin-bottom: 12px;
            font-size: 14px;
          }

          .card-body {
            flex: 1;
            overflow: hidden;
            position: relative;
            padding-right: 6px;
          }

          /* Scroll content - used for auto scroll lists */
          .scroll-list {
            overflow-y: auto;
            height: 100%;
            padding-right: 6px;
          }

          .news-item {
            padding: 10px 6px;
            border-bottom: 1px dashed #e8eef6;
          }
          .news-title {
            color: #0A1A44;
            font-weight: 700;
            font-size: 14px;
            line-height: 1.15;
          }
          .news-meta {
            margin-top: 6px;
            font-size: 12px;
            color: #6b7280;
            display:flex;
            justify-content:space-between;
          }

          /* Auto-scroll animation class (applies to inner element when we want continuous animation) */
          .auto-scroll {
            position: relative;
            overflow: hidden;
            height: 100%;
          }
          .auto-scroll .inner {
            /* we do not rely purely on CSS animation; JS controls scrollTop for best cross-browser control */
          }

          /* Fades at top/bottom */
          .fade-top, .fade-bottom {
            position: absolute;
            left: 0;
            right: 0;
            height: 36px;
            z-index: 10;
            pointer-events: none;
          }
          .fade-top {
            top: 0;
            background: linear-gradient(180deg, rgba(255,255,255,0.95), transparent);
          }
          .fade-bottom {
            bottom: 0;
            background: linear-gradient(0deg, rgba(255,255,255,0.95), transparent);
          }

          /* Month tabs - A1 White Tabs */
          .months-row {
            display: flex;
            gap: 8px;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 8px 4px;
            margin-bottom: 10px;
            -webkit-overflow-scrolling: touch;
          }
          .months-row::-webkit-scrollbar { height: 8px; }
          .month-pill {
            white-space: nowrap;
            padding: 8px 12px;
            border-radius: 999px;
            background: #fff;
            border: 1px solid rgba(10,26,68,0.08);
            font-weight: 700;
            font-size: 12px;
            color: #0A1A44;
            cursor: pointer;
            transition: transform .18s ease, box-shadow .18s ease;
            flex: 0 0 auto;
          }
          .month-pill:hover { transform: translateY(-3px); }
          .month-pill.active {
            background: #0A1A44;
            color: white;
            box-shadow: 0 6px 18px rgba(10,26,68,0.18);
          }

          /* Small helpers */
          .card-footer {
            margin-top: 10px;
            text-align: right;
            font-size: 13px;
          }

          /* Make sure content scrollbars are subtle */
          .scroll-list::-webkit-scrollbar { width: 8px; }
          .scroll-list::-webkit-scrollbar-thumb { background: rgba(10,26,68,0.08); border-radius: 6px; }

        `}</style>

                <div className="text-center mb-6">
                    <h2 style={{ color: "#ffffff", fontSize: 32, margin: 0, fontWeight: 800 }}>
                        News & Updates
                    </h2>
                </div>


                <div className="bg-white/95 rounded-2xl p-6 shadow-xl">

                    <div className="cards-grid">


                        <div className="card">
                            <div className="card-header">Latest News</div>

                            <div className="card-body">
                                <div className="auto-scroll" ref={latestRef}>
                                    <div className="inner">
                                        <div className="scroll-list">
                                            {loading ? (
                                                <div style={{ padding: 12 }}>Loading...</div>
                                            ) : previous && previous.length > 0 ? (

                                                [...previous, ...previous].map((it, i) => (
                                                    <div className="news-item" key={`prev-${i}`}>
                                                        <div className="news-title">{safeText(it.title)}</div>
                                                        <div className="news-meta">
                                                            <span>{it.date ? (parseDate(it.date) ? parseDate(it.date).toLocaleDateString() : it.date) : ""}</span>
                                                            <span style={{ color: "#3BC6B6", fontWeight: 700 }}>{safeText(it.source)}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: 12 }}>No recent news available.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="fade-top" />
                                <div className="fade-bottom" />
                            </div>

                            <div className="card-footer">
                                <a href="/news" style={{ color: "#134EC1", fontWeight: 700 }}>All News</a>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">Due Date Reminder</div>


                            <div style={{ marginBottom: 6 }}>
                                <div className="months-row" role="tablist" aria-label="Filter by month">
                                    <button
                                        className={`month-pill ${monthFilter === -1 ? "active" : ""}`}
                                        onClick={() => setMonthFilter(-1)}
                                    >
                                        ALL
                                    </button>

                                    {MONTHS.map((m, idx) => (
                                        <button
                                            key={m}
                                            className={`month-pill ${monthFilter === idx ? "active" : ""}`}
                                            onClick={() => setMonthFilter(idx)}
                                            aria-pressed={monthFilter === idx}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="auto-scroll" ref={dueRef}>
                                    <div className="inner">
                                        <div className="scroll-list">
                                            {loading ? (
                                                <div style={{ padding: 12 }}>Loading due dates...</div>
                                            ) : filteredDueDates && filteredDueDates.length > 0 ? (

                                                [...filteredDueDates, ...filteredDueDates].map((d, i) => (
                                                    <div className="news-item" key={`due-${i}`}>
                                                        <div className="news-title">{safeText(d.title)}</div>
                                                        <div className="news-meta">
                                                            <span>{d.date ? (parseDate(d.date) ? parseDate(d.date).toLocaleDateString() : d.date) : ""}</span>
                                                            <span style={{ color: "#6b7280" }}>{safeText(d.source || "")}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: 12 }}>No due dates for selected month.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="fade-top" />
                                <div className="fade-bottom" />
                            </div>

                            <div className="card-footer">
                                <a href="/due-dates" style={{ color: "#134EC1", fontWeight: 700 }}>View Calendar</a>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">Today's Headlines</div>

                            <div className="card-body">
                                <div className="auto-scroll" ref={todayRef}>
                                    <div className="inner">
                                        <div className="scroll-list">
                                            {loading ? (
                                                <div style={{ padding: 12 }}>Loading headlines...</div>
                                            ) : today && today.length > 0 ? (
                                                [...today, ...today].map((t, i) => (
                                                    <div className="news-item" key={`today-${i}`}>
                                                        <div className="news-title">{safeText(t.title)}</div>
                                                        <div className="news-meta">
                                                            <span>{t.date ? (parseDate(t.date) ? parseDate(t.date).toLocaleTimeString() : t.date) : ""}</span>
                                                            <span style={{ color: "#3BC6B6", fontWeight: 700 }}>{safeText(t.source)}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: 12 }}>No headlines today.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="fade-top" />
                                <div className="fade-bottom" />
                            </div>

                            <div className="card-footer">
                                <a href="/contact" style={{ color: "#134EC1", fontWeight: 700 }}>Contact HR</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
