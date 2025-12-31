import React, { useEffect, useMemo, useState } from "react";
const API_URL =
    window.location.hostname === "localhost"
        ? "http://127.0.0.1:8000/api/live-news/"
        : "https://ca-website-qj5u.onrender.com/api/live-news/";


const PAGE_SIZE = 10;

function autoCategorize(title = "") {
    const t = title.toLowerCase();
    if (t.includes("gst") || t.includes("cbic")) return "GST";
    if (t.includes("income tax") || t.includes("tds") || t.includes("itr"))
        return "Income Tax";
    if (t.includes("mca") || t.includes("company") || t.includes("corporate"))
        return "Corporate";
    if (t.includes("audit")) return "Corporate";
    return "Other";
}

export default function AllNews() {
    const [loading, setLoading] = useState(true);
    const [allItems, setAllItems] = useState([]);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("ALL");
    const [sortType, setSortType] = useState("latest");
    const [visible, setVisible] = useState(PAGE_SIZE);

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
                    category: autoCategorize(it.title || ""),
                });

                const combined = [
                    ...t.map((i) => normalize(i, "Today")),
                    ...prev.map((i) => normalize(i, "News")),
                    ...b.map((i) => normalize(i, "Blog")),
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

    const paginated = filtered.slice(0, visible);

    return (
        <section className="min-h-screen pt-24 bg-gradient-to-r from-[#0A1A44] via-[#1554a1] to-[#22c1e8]">
            <div className="max-w-5xl mx-auto px-4 text-[#0A1A44]">
                <h1 className="text-3xl font-extrabold text-white">All News</h1>
                <p className="text-blue-100 mt-1 mb-6">
                    Latest CA, GST, Tax & Corporate Updates
                </p>

                {/* SEARCH + SORT */}
                <div className="bg-white shadow rounded-2xl p-3 mb-5 flex flex-wrap gap-3 items-center justify-between">
                    <div className="relative flex-1 min-w-[220px]">
                        <span className="absolute right-4 top-2.5 text-gray-500">🔍</span>

                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search news…"
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-[#0A1A44] outline-none text-sm font-medium"
                        />
                    </div>

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="border rounded-full px-4 py-2 text-sm font-semibold"
                    >
                        <option value="latest">Latest → Oldest</option>
                        <option value="oldest">Oldest → Latest</option>
                    </select>
                </div>

                {/* CATEGORY TABS */}
                <div className="flex flex-wrap gap-3 mb-5">
                    {["ALL", "GST", "Income Tax", "Corporate", "Other"].map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-4 py-2 rounded-full border text-sm font-bold transition ${category === c
                                ? "bg-[#0A1A44] text-white border-[#0A1A44]"
                                : "bg-white border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* LIST */}
                <div className="space-y-2">
                    {loading ? (
                        <div className="text-center text-white py-10">Loading…</div>
                    ) : paginated.length === 0 ? (
                        <div className="text-center text-white py-10">
                            No news found.
                        </div>
                    ) : (
                        paginated.map((it, idx) => (
                            <article
                                key={idx}
                                className="bg-white px-4 py-3 rounded-xl border shadow flex items-start justify-between gap-3 hover:-translate-y-0.5 transition"
                            >
                                <div className="flex-1">
                                    <h3 className="font-extrabold text-[15px] leading-snug mb-1">
                                        {it.title}
                                    </h3>

                                    <div className="text-xs flex flex-wrap gap-3 text-gray-700">
                                        <span className="font-bold text-[#0A1A44]">
                                            {it.source}
                                        </span>
                                        <span>{it.category}</span>
                                        <span>{new Date(it.date).toLocaleString()}</span>
                                    </div>
                                </div>

                                {it.link && (
                                    <a
                                        href={it.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-red-100 text-red-700 px-3 py-1 rounded-lg font-bold text-sm whitespace-nowrap"
                                    >
                                        Read
                                    </a>
                                )}
                            </article>
                        ))
                    )}
                </div>

                {/* LOAD MORE */}
                {visible < filtered.length && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setVisible((v) => v + PAGE_SIZE)}
                            className="px-6 py-2 bg-white border rounded-full font-bold"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
