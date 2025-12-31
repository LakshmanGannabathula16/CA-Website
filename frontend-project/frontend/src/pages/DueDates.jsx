import React, { useEffect, useRef, useState } from "react";

export default function DueDates() {
    const [due, setDue] = useState([]);
    const [month, setMonth] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const boxRef = useRef(null);

    const MONTHS = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const MANUAL_DUE_DATES = [
        // DEC 2025
        { date: "05 DEC 2025", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 DEC 2025", title: "FEMA – ECB-2 Return" },
        { date: "07 DEC 2025", title: "Income Tax – TDS/TCS Deposit for November 2025" },
        { date: "10 DEC 2025", title: "STPI – STPI-SERF" },
        { date: "10 DEC 2025", title: "SEZ – SEZ-SERF" },
        { date: "10 DEC 2025", title: "GST – GSTR-7 (TDS)" },
        { date: "10 DEC 2025", title: "GST – GSTR-8 (TCS)" },
        { date: "20 DEC 2025", title: "GST – GSTR-3B" },
        { date: "31 DEC 2025", title: "Income Tax – Revised / Belated ITR" },

        // JAN 2026
        { date: "05 JAN 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 JAN 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 JAN 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 JAN 2026", title: "STPI – STPI-SERF" },
        { date: "10 JAN 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 JAN 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 JAN 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "10 JAN 2026", title: "GST – GST SRM-II" },
        { date: "11 JAN 2026", title: "GST – GSTR-1 (for Dec 2025)" },
        { date: "13 JAN 2026", title: "GST – QRMP (IFF)" },
        { date: "13 JAN 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 JAN 2026", title: "Income Tax – TCS Return" },
        { date: "15 JAN 2026", title: "Income Tax – Form 15G / 15H" },
        { date: "18 JAN 2026", title: "GST – CMP-08" },
        { date: "20 JAN 2026", title: "GST – GSTR-3B" },
        { date: "20 JAN 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 JAN 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "22 JAN 2026", title: "GST – GSTR-3B – QRMP" },
        { date: "24 JAN 2026", title: "GST – GSTR-3B – QRMP" },
        { date: "30 JAN 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 JAN 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 JAN 2026", title: "STPI – STPI-QPR" },
        { date: "30 JAN 2026", title: "Income Tax – Form 27D" },
        { date: "31 JAN 2026", title: "Income Tax – TDS Return" },
        { date: "31 JAN 2026", title: "Income Tax – TP Intimation – Form 3CEAC" },

        // FEB 2026
        { date: "05 FEB 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 FEB 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 FEB 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 FEB 2026", title: "STPI – STPI-SERF" },
        { date: "10 FEB 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 FEB 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 FEB 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "10 FEB 2026", title: "GST – GST SRM-II (Special Procedure)" },
        { date: "11 FEB 2026", title: "GST – GSTR-1 (for January 2026)" },
        { date: "13 FEB 2026", title: "GST – QRMP (IFF) for January 2026" },
        { date: "13 FEB 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 FEB 2026", title: "Income Tax – Form 16A (for Oct–Dec 2025)" },
        { date: "20 FEB 2026", title: "GST – GSTR-3B (for January 2026)" },
        { date: "20 FEB 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 FEB 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 FEB 2026", title: "GST – PMT-06 (for January 2026)" },
        { date: "28 FEB 2026", title: "Income Tax – Start date for Lower Deduction Certificate" },

        // MAR 2026
        { date: "02 MAR 2026", title: "STPI – STPI-SOFTEX (for January 2026)" },
        { date: "02 MAR 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "05 MAR 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 MAR 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 MAR 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 MAR 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 MAR 2026", title: "STPI – STPI-SERF" },
        { date: "10 MAR 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 MAR 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "10 MAR 2026", title: "GST – GST SRM-II (Special Procedure)" },
        { date: "11 MAR 2026", title: "GST – GSTR-1 (for February 2026)" },
        { date: "13 MAR 2026", title: "GST – QRMP (IFF) (for February 2026)" },
        { date: "13 MAR 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 MAR 2026", title: "Income Tax – Advance Tax – Q4" },
        { date: "15 MAR 2026", title: "Income Tax – Full Advance Tax under Section 44AD / 44ADA" },
        { date: "15 MAR 2026", title: "Income Tax – Last date to apply for Lower Deduction Certificate for FY 2025–26" },
        { date: "20 MAR 2026", title: "GST – GSTR-3B (for February 2026)" },
        { date: "20 MAR 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 MAR 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 MAR 2026", title: "GST – PMT-06 (for February 2026)" },
        { date: "30 MAR 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 MAR 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 MAR 2026", title: "GST – CMP-02 (for FY 2026–27)" },
        { date: "31 MAR 2026", title: "GST – RFD-11 (LUT) (for FY 2026–27)" },
        { date: "31 MAR 2026", title: "GST – Filing of Annexure V / VI / VII (as applicable)" },
        { date: "31 MAR 2026", title: "Income Tax – Updated Tax Return for FY 2022–23" },
        { date: "31 MAR 2026", title: "Income Tax – Filing of Form 67" },
    ];

    const parseDate = (s) => {
        const parts = s.split(" ");
        return new Date(Number(parts[2]), MONTHS.indexOf(parts[1]), Number(parts[0]));
    };

    useEffect(() => {
        const final = MANUAL_DUE_DATES.map(item => ({
            ...item,
            dateObj: parseDate(item.date),
        })).sort((a, b) => a.dateObj - b.dateObj);

        setDue(final);
        setLoading(false);
    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // search filter
    const searchFiltered = due.filter(it =>
        it.title.toLowerCase().includes(query.toLowerCase())
    );

    // month filter
    const monthFiltered =
        month === -1
            ? searchFiltered
            : searchFiltered.filter(it => it.dateObj.getMonth() === month);

    // group by month
    const groups = {};
    monthFiltered.forEach(it => {
        const key = MONTHS[it.dateObj.getMonth()];
        if (!groups[key]) groups[key] = [];
        groups[key].push(it);
    });

    // status badge
    const getStatus = (date) => {
        const d = parseDate(date);
        const t = new Date();
        t.setHours(0, 0, 0, 0);

        const diff = Math.ceil((d - t) / (1000 * 60 * 60 * 24));

        if (diff === 0) return { text: "Due Today", color: "bg-green-100 text-green-700" };
        if (diff === 1) return { text: "Due Tomorrow", color: "bg-yellow-100 text-yellow-700" };
        if (diff > 1) return { text: `Due in ${diff} days`, color: "bg-blue-100 text-blue-700" };
        return { text: "Expired", color: "bg-red-100 text-red-700" };
    };

    return (
        <>
            <div className="w-full text-center bg-white shadow-md py-5 text-3xl sm:text-4xl font-extrabold text-[#0A1A44]">
                Due Date Calendar
            </div>

            <div className="bg-gradient-to-br from-[#0A1A44] via-[#134EC1] to-[#38C7BA] py-10 sm:py-14">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl px-4 sm:px-6 py-6">

                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1A44] mb-3">
                        📅 Due Dates Calendar
                    </h2>

                    {/* SEARCH */}
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search due dates..."
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mb-4 font-semibold"
                    />

                    {/* MONTH FILTER */}
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
                        <button
                            onClick={() => setMonth(-1)}
                            className={`px-4 py-2 rounded-full border font-bold whitespace-nowrap ${month === -1
                                ? "bg-[#0A1A44] text-white border-[#0A1A44]"
                                : "bg-white border-gray-300 text-gray-700"
                                }`}
                        >
                            ALL
                        </button>

                        {MONTHS.map((m, i) => (
                            <button
                                key={i}
                                onClick={() => setMonth(i)}
                                className={`px-4 py-2 rounded-full border font-bold whitespace-nowrap ${month === i
                                    ? "bg-[#0A1A44] text-white border-[#0A1A44]"
                                    : "bg-white border-gray-300 text-gray-700"
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {/* LIST */}
                    <div ref={boxRef} className="h-[360px] sm:h-[460px] overflow-y-auto pr-1">

                        {loading ? (
                            <div>Loading…</div>
                        ) : Object.keys(groups).length === 0 ? (
                            <div className="text-center py-8 text-gray-600 font-semibold">
                                ⚠️ Due dates for this month are not yet updated by the Government.
                            </div>
                        ) : (
                            Object.keys(groups).map((mon, idx) => (
                                <div key={idx}>
                                    <div className="text-xl sm:text-2xl font-extrabold mt-4 mb-2 bg-gradient-to-r from-[#0A1A44] to-[#134EC1] bg-clip-text text-transparent">
                                        {mon}
                                    </div>

                                    {groups[mon].map((d, i) => {
                                        const status = getStatus(d.date);

                                        return (
                                            <div
                                                key={i}
                                                className="flex gap-3 py-3 border-b border-dashed border-gray-200"
                                            >
                                                <div className="text-2xl">📄</div>

                                                <div>
                                                    <div className="font-bold text-[#0A1A44]">{d.date}</div>

                                                    <div className="font-semibold text-gray-800 text-sm sm:text-base">
                                                        {d.title}
                                                    </div>

                                                    <div
                                                        className={`mt-1 text-xs sm:text-sm font-bold w-fit px-2 py-1 rounded ${status.color}`}
                                                    >
                                                        {status.text}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
