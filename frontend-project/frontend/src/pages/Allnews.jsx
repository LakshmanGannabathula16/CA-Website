import React, { useEffect, useMemo, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/live-news/";
const PAGE_SIZE = 10;

function autoCategorize(title = "") {
    const t = title.toLowerCase();
    if (t.includes("gst") || t.includes("cbic")) return "GST";
    if (t.includes("income tax") || t.includes("tds") || t.includes("itr")) return "Income Tax";
    if (t.includes("mca") || t.includes("company") || t.includes("corporate")) return "Corporate";
    if (t.includes("audit")) return "Corporate";
    return "Other";
}

export default function AllNews() {
    const [loading, setLoading] = useState(true);
    const [allItems, setAllItems] = useState([]);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("ALL");
    const [sortType, setSortType] = useState("latest");
    const [page, setPage] = useState(1);

    useEffect(() => {
        let mounted = true;

        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                if (!mounted) return;

                const t = data.today || [];
                const prev = data.previous || data.news || [];
                const b = data.blogs || [];

                const normalize = (it, source) => ({
                    title: it.title || "",
                    date: it.date || it.published || "",
                    source,
                    link: it.link || "",
                    category: autoCategorize(it.title || "")
                });

                const combined = [
                    ...t.map((i) => normalize(i, "Today")),
                    ...prev.map((i) => normalize(i, "News")),
                    ...b.map((i) => normalize(i, "Blog"))
                ];

                setAllItems(dedupe(combined));
                setLoading(false);
            });

        return () => (mounted = false);
    }, []);

    function dedupe(arr) {
        const out = [];
        const seen = new Set();
        for (const n of arr) {
            const k = n.title.toLowerCase();
            if (!seen.has(k)) {
                seen.add(k);
                out.push(n);
            }
        }
        return out;
    }

    const parseDate = (d) => {
        const t = new Date(d);
        return isNaN(t) ? 0 : t.getTime();
    };

    const filtered = useMemo(() => {
        let arr = [...allItems];

        if (query.trim()) {
            const q = query.toLowerCase();
            arr = arr.filter((i) => i.title.toLowerCase().includes(q));
        }

        if (category !== "ALL") {
            arr = arr.filter((i) => i.category === category);
        }

        arr.sort((a, b) =>
            sortType === "latest"
                ? parseDate(b.date) - parseDate(a.date)
                : parseDate(a.date) - parseDate(b.date)
        );

        return arr;
    }, [allItems, query, category, sortType]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <section style={pageBg}>
            <div className="max-w-6xl mx-auto px-4">


                <div style={headerRow}>
                    <div>
                        <h1 style={titleStyle}>All News</h1>
                        <p style={subtitleStyle}>Latest CA, GST, Tax & Corporate Updates</p>
                    </div>


                    <div style={filterBox}>
                        <div style={searchWrapper}>
                            <span style={searchIcon}>🔍</span>
                            <input
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                                placeholder="Search news..."
                                style={searchStyle}
                            />
                        </div>
                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            style={sortDropdown}
                        >
                            <option value="latest">Latest → Oldest</option>
                            <option value="oldest">Oldest → Latest</option>
                        </select>
                    </div>
                </div>
                <div style={tabsRow}>
                    {["ALL", "GST", "Income Tax", "Corporate", "Other"].map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            style={c === category ? pillActive : pill}
                        >
                            {c}
                        </button>
                    ))}
                </div>
                <div style={listContainer}>
                    {loading ? (
                        <div style={loadingBox}>Loading…</div>
                    ) : paginated.length === 0 ? (
                        <div style={loadingBox}>No results found.</div>
                    ) : (
                        paginated.map((it, idx) => (
                            <article key={idx} style={newsCard}
                                onMouseEnter={(e) => Object.assign(e.currentTarget.style, newsCardHover)}
                                onMouseLeave={(e) => Object.assign(e.currentTarget.style, newsCard)}
                            >
                                <div>
                                    <h3 style={newsTitle}>{it.title}</h3>

                                    <div style={metaRow}>
                                        <span style={metaSource}>{it.source}</span>
                                        <span style={metaCat}>{it.category}</span>
                                        <span style={metaDate}>{new Date(it.date).toLocaleString()}</span>
                                    </div>
                                </div>

                                {it.link && (
                                    <a href={it.link} target="_blank" rel="noreferrer" style={readBtn}>
                                        Read
                                    </a>
                                )}
                            </article>
                        ))
                    )}
                </div>

            </div>
        </section>
    );
}


const pageBg = {
    background: "linear-gradient(90deg, #0A1A44, #1554a1, #22c1e8)",
    minHeight: "100vh",
    paddingTop: 100,
    color: "#0A1A44",
};



const headerRow = { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" };
const titleStyle = { fontSize: 32, color: "#fff", fontWeight: 900 };
const subtitleStyle = { color: "#dceafe", marginTop: 4 };


const filterBox = {
    display: "flex",
    gap: 16,
    alignItems: "center",
    padding: "12px 18px",
    background: "#ffffff",
    borderRadius: 12,
    border: "1px solid #d0d7e5",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};


const searchWrapper = { position: "relative", display: "flex", alignItems: "center" };
const searchIcon = { position: "absolute", left: 10, fontSize: 16, color: "#6b7280" };

const searchStyle = {
    padding: "10px 14px 10px 38px",
    borderRadius: 8,
    border: "2px solid #4b5563",
    background: "#fff",
    color: "#111",
    fontWeight: 600,
    minWidth: 260,
};


const sortDropdown = {
    padding: "10px 14px",
    borderRadius: 8,
    border: "2px solid #4b5563",
    background: "#fff",
    color: "#111",
    fontWeight: 700,
    cursor: "pointer",
};

const tabsRow = { marginTop: 18, marginBottom: 18, display: "flex", gap: 10, flexWrap: "wrap" };

const pill = {
    padding: "8px 14px",
    borderRadius: 999,
    background: "#ffffff",
    border: "1px solid #d0d7e5",
    cursor: "pointer",
    color: "#0A1A44",
    fontWeight: 700,
};

const pillActive = {
    ...pill,
    background: "#0A1A44",
    color: "#fff",
    border: "1px solid #0A1A44",
};


const listContainer = { display: "grid", gap: 14 };

const newsCard = {
    background: "#ffffff",
    padding: 18,
    borderRadius: 12,
    border: "1px solid #d0d7e5",
    color: "#0A1A44",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.25s",
};

const newsCardHover = {
    border: "1px solid #0A1A44",
    transform: "translateY(-3px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
};


const newsTitle = { fontSize: 17, fontWeight: 800 };
const metaRow = { marginTop: 6, display: "flex", gap: 12, fontSize: 14 };
const metaSource = { fontWeight: 700, color: "#0A1A44" };
const metaCat = { color: "#374151" };
const metaDate = { color: "#475569" };

const readBtn = {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "8px 12px",
    borderRadius: 8,
    fontWeight: 700,
    textDecoration: "none",
};

const loadingBox = { padding: 28, textAlign: "center", color: "#fff" };
