// import React, { useEffect, useRef, useState } from "react";

// export default function DueDates() {
//     const [due, setDue] = useState([]);
//     const [month, setMonth] = useState(-1);
//     const [loading, setLoading] = useState(true);
//     const [query, setQuery] = useState("");
//     const boxRef = useRef(null);

//     const MONTHS = [
//         "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
//         "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
//     ];

//     const MANUAL_DUE_DATES = [
//         // DEC 2025
//         { date: "05 DEC 2025", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
//         { date: "07 DEC 2025", title: "FEMA – ECB-2 Return" },
//         { date: "07 DEC 2025", title: "Income Tax – TDS/TCS Deposit for November 2025" },
//         { date: "10 DEC 2025", title: "STPI – STPI-SERF" },
//         { date: "10 DEC 2025", title: "SEZ – SEZ-SERF" },
//         { date: "10 DEC 2025", title: "GST – GSTR-7 (TDS)" },
//         { date: "10 DEC 2025", title: "GST – GSTR-8 (TCS)" },
//         { date: "20 DEC 2025", title: "GST – GSTR-3B" },
//         { date: "31 DEC 2025", title: "Income Tax – Revised / Belated ITR" },

//         // JAN 2026
//         { date: "05 JAN 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
//         { date: "07 JAN 2026", title: "FEMA – ECB-2 Return" },
//         { date: "07 JAN 2026", title: "Income Tax – TDS/TCS Deposit" },
//         { date: "10 JAN 2026", title: "STPI – STPI-SERF" },
//         { date: "10 JAN 2026", title: "SEZ – SEZ-SERF" },
//         { date: "10 JAN 2026", title: "GST – GSTR-7 (TDS)" },
//         { date: "10 JAN 2026", title: "GST – GSTR-8 (TCS)" },
//         { date: "10 JAN 2026", title: "GST – GST SRM-II" },
//         { date: "11 JAN 2026", title: "GST – GSTR-1 (for Dec 2025)" },
//         { date: "13 JAN 2026", title: "GST – QRMP (IFF)" },
//         { date: "13 JAN 2026", title: "GST – GSTR-6 (ISD)" },
//         { date: "15 JAN 2026", title: "Income Tax – TCS Return" },
//         { date: "15 JAN 2026", title: "Income Tax – Form 15G / 15H" },
//         { date: "18 JAN 2026", title: "GST – CMP-08" },
//         { date: "20 JAN 2026", title: "GST – GSTR-3B" },
//         { date: "20 JAN 2026", title: "GST – GSTR-5 (NRTP)" },
//         { date: "20 JAN 2026", title: "GST – GSTR-5A (OIDAR)" },
//         { date: "22 JAN 2026", title: "GST – GSTR-3B – QRMP" },
//         { date: "24 JAN 2026", title: "GST – GSTR-3B – QRMP" },
//         { date: "30 JAN 2026", title: "STPI – STPI-SOFTEX" },
//         { date: "30 JAN 2026", title: "SEZ – SEZ-SOFTEX" },
//         { date: "30 JAN 2026", title: "STPI – STPI-QPR" },
//         { date: "30 JAN 2026", title: "Income Tax – Form 27D" },
//         { date: "31 JAN 2026", title: "Income Tax – TDS Return" },
//         { date: "31 JAN 2026", title: "Income Tax – TP Intimation – Form 3CEAC" },

//         // FEB 2026
//         { date: "05 FEB 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
//         { date: "07 FEB 2026", title: "FEMA – ECB-2 Return" },
//         { date: "07 FEB 2026", title: "Income Tax – TDS/TCS Deposit" },
//         { date: "10 FEB 2026", title: "STPI – STPI-SERF" },
//         { date: "10 FEB 2026", title: "SEZ – SEZ-SERF" },
//         { date: "10 FEB 2026", title: "GST – GSTR-7 (TDS)" },
//         { date: "10 FEB 2026", title: "GST – GSTR-8 (TCS)" },
//         { date: "10 FEB 2026", title: "GST – GST SRM-II (Special Procedure)" },
//         { date: "11 FEB 2026", title: "GST – GSTR-1 (for January 2026)" },
//         { date: "13 FEB 2026", title: "GST – QRMP (IFF) for January 2026" },
//         { date: "13 FEB 2026", title: "GST – GSTR-6 (ISD)" },
//         { date: "15 FEB 2026", title: "Income Tax – Form 16A (for Oct–Dec 2025)" },
//         { date: "20 FEB 2026", title: "GST – GSTR-3B (for January 2026)" },
//         { date: "20 FEB 2026", title: "GST – GSTR-5 (NRTP)" },
//         { date: "20 FEB 2026", title: "GST – GSTR-5A (OIDAR)" },
//         { date: "25 FEB 2026", title: "GST – PMT-06 (for January 2026)" },
//         { date: "28 FEB 2026", title: "Income Tax – Start date for Lower Deduction Certificate" },

//         // MAR 2026
//         { date: "02 MAR 2026", title: "STPI – STPI-SOFTEX (for January 2026)" },
//         { date: "02 MAR 2026", title: "SEZ – SEZ-SOFTEX" },
//         { date: "05 MAR 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
//         { date: "07 MAR 2026", title: "FEMA – ECB-2 Return" },
//         { date: "07 MAR 2026", title: "Income Tax – TDS/TCS Deposit" },
//         { date: "10 MAR 2026", title: "SEZ – SEZ-SERF" },
//         { date: "10 MAR 2026", title: "STPI – STPI-SERF" },
//         { date: "10 MAR 2026", title: "GST – GSTR-7 (TDS)" },
//         { date: "10 MAR 2026", title: "GST – GSTR-8 (TCS)" },
//         { date: "10 MAR 2026", title: "GST – GST SRM-II (Special Procedure)" },
//         { date: "11 MAR 2026", title: "GST – GSTR-1 (for February 2026)" },
//         { date: "13 MAR 2026", title: "GST – QRMP (IFF) (for February 2026)" },
//         { date: "13 MAR 2026", title: "GST – GSTR-6 (ISD)" },
//         { date: "15 MAR 2026", title: "Income Tax – Advance Tax – Q4" },
//         { date: "15 MAR 2026", title: "Income Tax – Full Advance Tax under Section 44AD / 44ADA" },
//         { date: "15 MAR 2026", title: "Income Tax – Last date to apply for Lower Deduction Certificate for FY 2025–26" },
//         { date: "20 MAR 2026", title: "GST – GSTR-3B (for February 2026)" },
//         { date: "20 MAR 2026", title: "GST – GSTR-5 (NRTP)" },
//         { date: "20 MAR 2026", title: "GST – GSTR-5A (OIDAR)" },
//         { date: "25 MAR 2026", title: "GST – PMT-06 (for February 2026)" },
//         { date: "30 MAR 2026", title: "STPI – STPI-SOFTEX" },
//         { date: "30 MAR 2026", title: "SEZ – SEZ-SOFTEX" },
//         { date: "31 MAR 2026", title: "GST – CMP-02 (for FY 2026–27)" },
//         { date: "31 MAR 2026", title: "GST – RFD-11 (LUT) (for FY 2026–27)" },
//         { date: "31 MAR 2026", title: "GST – Filing of Annexure V / VI / VII (as applicable)" },
//         { date: "31 MAR 2026", title: "Income Tax – Updated Tax Return for FY 2022–23" },
//         { date: "31 MAR 2026", title: "Income Tax – Filing of Form 67" },
//     ];

//     const parseDate = (s) => {
//         const parts = s.split(" ");
//         return new Date(Number(parts[2]), MONTHS.indexOf(parts[1]), Number(parts[0]));
//     };

//     useEffect(() => {
//         const final = MANUAL_DUE_DATES.map(item => ({
//             ...item,
//             dateObj: parseDate(item.date),
//         })).sort((a, b) => a.dateObj - b.dateObj);

//         setDue(final);
//         setLoading(false);
//     }, []);

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // search filter
//     const searchFiltered = due.filter(it =>
//         it.title.toLowerCase().includes(query.toLowerCase())
//     );

//     // month filter
//     const monthFiltered =
//         month === -1
//             ? searchFiltered
//             : searchFiltered.filter(it => it.dateObj.getMonth() === month);

//     // group by month
//     const groups = {};
//     monthFiltered.forEach(it => {
//         const key = MONTHS[it.dateObj.getMonth()];
//         if (!groups[key]) groups[key] = [];
//         groups[key].push(it);
//     });

//     // status badge
//     const getStatus = (date) => {
//         const d = parseDate(date);
//         const t = new Date();
//         t.setHours(0, 0, 0, 0);

//         const diff = Math.ceil((d - t) / (1000 * 60 * 60 * 24));

//         if (diff === 0) return { text: "Due Today", color: "bg-green-100 text-green-700" };
//         if (diff === 1) return { text: "Due Tomorrow", color: "bg-yellow-100 text-yellow-700" };
//         if (diff > 1) return { text: `Due in ${diff} days`, color: "bg-blue-100 text-blue-700" };
//         return { text: "Expired", color: "bg-red-100 text-red-700" };
//     };

//     return (
//         <>
//             <div className="w-full text-center bg-white shadow-md py-5 text-3xl sm:text-4xl font-extrabold text-[#0A1A44]">
//                 Due Date Calendar
//             </div>

//             <div className="bg-gradient-to-br from-[#0A1A44] via-[#134EC1] to-[#38C7BA] py-10 sm:py-14">
//                 <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl px-4 sm:px-6 py-6">

//                     <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1A44] mb-3">
//                         📅 Due Dates Calendar
//                     </h2>

//                     {/* SEARCH */}
//                     <input
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         placeholder="Search due dates..."
//                         className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mb-4 font-semibold"
//                     />

//                     {/* MONTH FILTER */}
//                     <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
//                         <button
//                             onClick={() => setMonth(-1)}
//                             className={`px-4 py-2 rounded-full border font-bold whitespace-nowrap ${month === -1
//                                 ? "bg-[#0A1A44] text-white border-[#0A1A44]"
//                                 : "bg-white border-gray-300 text-gray-700"
//                                 }`}
//                         >
//                             ALL
//                         </button>

//                         {MONTHS.map((m, i) => (
//                             <button
//                                 key={i}
//                                 onClick={() => setMonth(i)}
//                                 className={`px-4 py-2 rounded-full border font-bold whitespace-nowrap ${month === i
//                                     ? "bg-[#0A1A44] text-white border-[#0A1A44]"
//                                     : "bg-white border-gray-300 text-gray-700"
//                                     }`}
//                             >
//                                 {m}
//                             </button>
//                         ))}
//                     </div>

//                     {/* LIST */}
//                     <div ref={boxRef} className="h-[360px] sm:h-[460px] overflow-y-auto pr-1">

//                         {loading ? (
//                             <div>Loading…</div>
//                         ) : Object.keys(groups).length === 0 ? (
//                             <div className="text-center py-8 text-gray-600 font-semibold">
//                                 ⚠️ Due dates for this month are not yet updated by the Government.
//                             </div>
//                         ) : (
//                             Object.keys(groups).map((mon, idx) => (
//                                 <div key={idx}>
//                                     <div className="text-xl sm:text-2xl font-extrabold mt-4 mb-2 bg-gradient-to-r from-[#0A1A44] to-[#134EC1] bg-clip-text text-transparent">
//                                         {mon}
//                                     </div>

//                                     {groups[mon].map((d, i) => {
//                                         const status = getStatus(d.date);

//                                         return (
//                                             <div
//                                                 key={i}
//                                                 className="flex gap-3 py-3 border-b border-dashed border-gray-200"
//                                             >
//                                                 <div className="text-2xl">📄</div>

//                                                 <div>
//                                                     <div className="font-bold text-[#0A1A44]">{d.date}</div>

//                                                     <div className="font-semibold text-gray-800 text-sm sm:text-base">
//                                                         {d.title}
//                                                     </div>

//                                                     <div
//                                                         className={`mt-1 text-xs sm:text-sm font-bold w-fit px-2 py-1 rounded ${status.color}`}
//                                                     >
//                                                         {status.text}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


import React, { useEffect, useRef, useState } from "react";

export default function DueDates() {
    const [due, setDue] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());   // ⭐ show current month first
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    const boxRef = useRef(null);
    const monthRefs = useRef({});   // ⭐ store month DOM refs

    const MONTHS = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const CURRENT_MONTH = new Date().getMonth();
    const CURRENT_YEAR = new Date().getFullYear();

    const MANUAL_DUE_DATES = [
        // -------- DEC 2025 ----------
        { date: "05 DEC 2025", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 DEC 2025", title: "FEMA – ECB-2 Return" },
        { date: "07 DEC 2025", title: "Income Tax – TDS/TCS Deposit for November 2025" },
        { date: "10 DEC 2025", title: "STPI – STPI-SERF" },
        { date: "10 DEC 2025", title: "SEZ – SEZ-SERF" },
        { date: "10 DEC 2025", title: "GST – GSTR-7 (TDS)" },
        { date: "10 DEC 2025", title: "GST – GSTR-8 (TCS)" },
        { date: "20 DEC 2025", title: "GST – GSTR-3B" },
        { date: "31 DEC 2025", title: "Income Tax – Revised / Belated ITR" },

        // -------- JAN 2026 ----------
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

        // -------- FEB 2026 ----------
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

        // -------- MAR 2026 ----------
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

        // -------- APR 2026 ----------
        { date: "05 APR 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 APR 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 APR 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 APR 2026", title: "STPI – STPI-SERF" },
        { date: "10 APR 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 APR 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 APR 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 APR 2026", title: "GST – GSTR-1 (for March 2026)" },
        { date: "13 APR 2026", title: "GST – QRMP (IFF) (for March 2026)" },
        { date: "13 APR 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 APR 2026", title: "Income Tax – TCS Return" },
        { date: "15 APR 2026", title: "Income Tax – Form 15G / 15H" },
        { date: "15 APR 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 APR 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 APR 2026", title: "GST – GSTR-3B (for March 2026)" },
        { date: "20 APR 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 APR 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 APR 2026", title: "GST – PMT-06 (for March 2026)" },
        { date: "30 APR 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 APR 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 APR 2026", title: "STPI – STPI-QPR" },
        { date: "30 APR 2026", title: "Professional Tax Payment" },

        // -------- MAY 2026 ----------
        { date: "05 MAY 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 MAY 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 MAY 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 MAY 2026", title: "STPI – STPI-SERF" },
        { date: "10 MAY 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 MAY 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 MAY 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 MAY 2026", title: "GST – GSTR-1 (for April 2026)" },
        { date: "13 MAY 2026", title: "GST – QRMP (IFF) (for April 2026)" },
        { date: "13 MAY 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 MAY 2026", title: "Income Tax – Form 16A (Quarter 4)" },
        { date: "15 MAY 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 MAY 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 MAY 2026", title: "GST – GSTR-3B (for April 2026)" },
        { date: "20 MAY 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 MAY 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 MAY 2026", title: "GST – PMT-06 (for April 2026)" },
        { date: "30 MAY 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 MAY 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 MAY 2026", title: "Professional Tax Payment" },
        { date: "31 MAY 2026", title: "Income Tax – Annual Information Statement Review" },

        // -------- JUN 2026 ----------
        { date: "05 JUN 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 JUN 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 JUN 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 JUN 2026", title: "STPI – STPI-SERF" },
        { date: "10 JUN 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 JUN 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 JUN 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 JUN 2026", title: "GST – GSTR-1 (for May 2026)" },
        { date: "13 JUN 2026", title: "GST – QRMP (IFF) (for May 2026)" },
        { date: "13 JUN 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 JUN 2026", title: "Income Tax – Advance Tax (First Installment)" },
        { date: "15 JUN 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 JUN 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 JUN 2026", title: "GST – GSTR-3B (for May 2026)" },
        { date: "20 JUN 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 JUN 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 JUN 2026", title: "GST – PMT-06 (for May 2026)" },
        { date: "30 JUN 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 JUN 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 JUN 2026", title: "Quarterly GST & Accounts Reconciliation" },
        { date: "30 JUN 2026", title: "Professional Tax Payment" },

        // -------- JUL 2026 ----------
        { date: "05 JUL 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 JUL 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 JUL 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 JUL 2026", title: "STPI – STPI-SERF" },
        { date: "10 JUL 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 JUL 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 JUL 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 JUL 2026", title: "GST – GSTR-1 (for June 2026)" },
        { date: "13 JUL 2026", title: "GST – QRMP (IFF) (for June 2026)" },
        { date: "13 JUL 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 JUL 2026", title: "Income Tax – TCS Return" },
        { date: "15 JUL 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 JUL 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 JUL 2026", title: "GST – GSTR-3B (for June 2026)" },
        { date: "20 JUL 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 JUL 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 JUL 2026", title: "GST – PMT-06 (for June 2026)" },
        { date: "30 JUL 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 JUL 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 JUL 2026", title: "Income Tax – ITR Filing (Non-Audit Cases)" },
        { date: "31 JUL 2026", title: "Professional Tax Payment" },

        // -------- AUG 2026 ----------
        { date: "05 AUG 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 AUG 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 AUG 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 AUG 2026", title: "STPI – STPI-SERF" },
        { date: "10 AUG 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 AUG 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 AUG 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 AUG 2026", title: "GST – GSTR-1 (for July 2026)" },
        { date: "13 AUG 2026", title: "GST – QRMP (IFF) (for July 2026)" },
        { date: "13 AUG 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 AUG 2026", title: "Income Tax – Form 16A Issue" },
        { date: "15 AUG 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 AUG 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 AUG 2026", title: "GST – GSTR-3B (for July 2026)" },
        { date: "20 AUG 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 AUG 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 AUG 2026", title: "GST – PMT-06 (for July 2026)" },
        { date: "30 AUG 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 AUG 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 AUG 2026", title: "Annual GST Reconciliation Review" },
        { date: "31 AUG 2026", title: "Professional Tax Payment" },

        // -------- SEP 2026 ----------
        { date: "05 SEP 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 SEP 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 SEP 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 SEP 2026", title: "STPI – STPI-SERF" },
        { date: "10 SEP 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 SEP 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 SEP 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 SEP 2026", title: "GST – GSTR-1 (for August 2026)" },
        { date: "13 SEP 2026", title: "GST – QRMP (IFF) (for August 2026)" },
        { date: "13 SEP 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 SEP 2026", title: "Income Tax – Advance Tax (Second Installment)" },
        { date: "15 SEP 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 SEP 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 SEP 2026", title: "GST – GSTR-3B (for August 2026)" },
        { date: "20 SEP 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 SEP 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 SEP 2026", title: "GST – PMT-06 (for August 2026)" },
        { date: "30 SEP 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 SEP 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 SEP 2026", title: "Quarterly Compliance Review" },
        { date: "30 SEP 2026", title: "Professional Tax Payment" },

        // -------- OCT 2026 ----------
        { date: "05 OCT 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 OCT 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 OCT 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 OCT 2026", title: "STPI – STPI-SERF" },
        { date: "10 OCT 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 OCT 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 OCT 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 OCT 2026", title: "GST – GSTR-1 (for September 2026)" },
        { date: "13 OCT 2026", title: "GST – QRMP (IFF) (for September 2026)" },
        { date: "13 OCT 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 OCT 2026", title: "Income Tax – TCS Return" },
        { date: "15 OCT 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 OCT 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 OCT 2026", title: "GST – GSTR-3B (for September 2026)" },
        { date: "20 OCT 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 OCT 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 OCT 2026", title: "GST – PMT-06 (for September 2026)" },
        { date: "30 OCT 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 OCT 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 OCT 2026", title: "Income Tax – Tax Audit Report Filing" },
        { date: "31 OCT 2026", title: "Professional Tax Payment" },

        // -------- NOV 2026 ----------
        { date: "05 NOV 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 NOV 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 NOV 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 NOV 2026", title: "STPI – STPI-SERF" },
        { date: "10 NOV 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 NOV 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 NOV 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 NOV 2026", title: "GST – GSTR-1 (for October 2026)" },
        { date: "13 NOV 2026", title: "GST – QRMP (IFF) (for October 2026)" },
        { date: "13 NOV 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 NOV 2026", title: "Income Tax – Form 16A (Quarter 2)" },
        { date: "15 NOV 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 NOV 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 NOV 2026", title: "GST – GSTR-3B (for October 2026)" },
        { date: "20 NOV 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 NOV 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 NOV 2026", title: "GST – PMT-06 (for October 2026)" },
        { date: "30 NOV 2026", title: "Income Tax – Return Filing (Audit Cases)" },
        { date: "30 NOV 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 NOV 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 NOV 2026", title: "Professional Tax Payment" },

        // -------- DEC 2026 ----------
        { date: "05 DEC 2026", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 DEC 2026", title: "FEMA – ECB-2 Return" },
        { date: "07 DEC 2026", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 DEC 2026", title: "STPI – STPI-SERF" },
        { date: "10 DEC 2026", title: "SEZ – SEZ-SERF" },
        { date: "10 DEC 2026", title: "GST – GSTR-7 (TDS)" },
        { date: "10 DEC 2026", title: "GST – GSTR-8 (TCS)" },
        { date: "11 DEC 2026", title: "GST – GSTR-1 (for November 2026)" },
        { date: "13 DEC 2026", title: "GST – QRMP (IFF) (for November 2026)" },
        { date: "13 DEC 2026", title: "GST – GSTR-6 (ISD)" },
        { date: "15 DEC 2026", title: "Income Tax – Advance Tax (Third Installment)" },
        { date: "15 DEC 2026", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 DEC 2026", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 DEC 2026", title: "GST – GSTR-3B (for November 2026)" },
        { date: "20 DEC 2026", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 DEC 2026", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 DEC 2026", title: "GST – PMT-06 (for November 2026)" },
        { date: "30 DEC 2026", title: "STPI – STPI-SOFTEX" },
        { date: "30 DEC 2026", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 DEC 2026", title: "Income Tax – Revised / Belated Return Filing" },
        { date: "31 DEC 2026", title: "Professional Tax Payment" },

        // -------- JAN 2027 ----------
        { date: "05 JAN 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 JAN 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 JAN 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 JAN 2027", title: "STPI – STPI-SERF" },
        { date: "10 JAN 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 JAN 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 JAN 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 JAN 2027", title: "GST – GSTR-1 (for December 2026)" },
        { date: "13 JAN 2027", title: "GST – QRMP (IFF) (for December 2026)" },
        { date: "13 JAN 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 JAN 2027", title: "Income Tax – TCS Return" },
        { date: "15 JAN 2027", title: "Income Tax – Form 15G / 15H" },
        { date: "15 JAN 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 JAN 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 JAN 2027", title: "GST – GSTR-3B (for December 2026)" },
        { date: "20 JAN 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 JAN 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "22 JAN 2027", title: "GST – GSTR-3B – QRMP" },
        { date: "24 JAN 2027", title: "GST – GSTR-3B – QRMP" },
        { date: "30 JAN 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 JAN 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 JAN 2027", title: "STPI – STPI-QPR" },
        { date: "30 JAN 2027", title: "Income Tax – Form 27D" },
        { date: "31 JAN 2027", title: "Income Tax – TDS Return" },
        { date: "31 JAN 2027", title: "Income Tax – TP Intimation – Form 3CEAC" },

        // -------- FEB 2027 ----------
        { date: "05 FEB 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 FEB 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 FEB 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 FEB 2027", title: "STPI – STPI-SERF" },
        { date: "10 FEB 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 FEB 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 FEB 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "10 FEB 2027", title: "GST – GST SRM-II (Special Procedure)" },
        { date: "11 FEB 2027", title: "GST – GSTR-1 (for January 2027)" },
        { date: "13 FEB 2027", title: "GST – QRMP (IFF) (for January 2027)" },
        { date: "13 FEB 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 FEB 2027", title: "Income Tax – Form 16A (Quarter 3)" },
        { date: "15 FEB 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 FEB 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 FEB 2027", title: "GST – GSTR-3B (for January 2027)" },
        { date: "20 FEB 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 FEB 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 FEB 2027", title: "GST – PMT-06 (for January 2027)" },
        { date: "28 FEB 2027", title: "Income Tax – Lower Deduction Certificate Review" },
        { date: "28 FEB 2027", title: "Professional Tax Payment" },

        // -------- MAR 2027 ----------
        { date: "02 MAR 2027", title: "STPI – STPI-SOFTEX (for January 2027)" },
        { date: "02 MAR 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "05 MAR 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 MAR 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 MAR 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 MAR 2027", title: "STPI – STPI-SERF" },
        { date: "10 MAR 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 MAR 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 MAR 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "10 MAR 2027", title: "GST – GST SRM-II (Special Procedure)" },
        { date: "11 MAR 2027", title: "GST – GSTR-1 (for February 2027)" },
        { date: "13 MAR 2027", title: "GST – QRMP (IFF) (for February 2027)" },
        { date: "13 MAR 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 MAR 2027", title: "Income Tax – Advance Tax (Fourth Installment)" },
        { date: "15 MAR 2027", title: "Income Tax – Presumptive Tax Payment (44AD / 44ADA)" },
        { date: "15 MAR 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 MAR 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 MAR 2027", title: "GST – GSTR-3B (for February 2027)" },
        { date: "20 MAR 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 MAR 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 MAR 2027", title: "GST – PMT-06 (for February 2027)" },
        { date: "30 MAR 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 MAR 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 MAR 2027", title: "GST – CMP-02 (for FY 2027–28)" },
        { date: "31 MAR 2027", title: "GST – RFD-11 (LUT) (for FY 2027–28)" },
        { date: "31 MAR 2027", title: "Income Tax – Updated Tax Return" },
        { date: "31 MAR 2027", title: "Income Tax – Filing of Form 67" },
        // -------- APR 2027 ----------
        { date: "05 APR 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 APR 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 APR 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 APR 2027", title: "STPI – STPI-SERF" },
        { date: "10 APR 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 APR 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 APR 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 APR 2027", title: "GST – GSTR-1 (for March 2027)" },
        { date: "13 APR 2027", title: "GST – QRMP (IFF) (for March 2027)" },
        { date: "13 APR 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 APR 2027", title: "Income Tax – TCS Return" },
        { date: "15 APR 2027", title: "Income Tax – Form 15G / 15H" },
        { date: "15 APR 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 APR 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 APR 2027", title: "GST – GSTR-3B (for March 2027)" },
        { date: "20 APR 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 APR 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 APR 2027", title: "GST – PMT-06 (for March 2027)" },
        { date: "30 APR 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 APR 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 APR 2027", title: "STPI – STPI-QPR" },
        { date: "30 APR 2027", title: "Professional Tax Payment" },

        // -------- MAY 2027 ----------
        { date: "05 MAY 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 MAY 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 MAY 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 MAY 2027", title: "STPI – STPI-SERF" },
        { date: "10 MAY 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 MAY 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 MAY 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 MAY 2027", title: "GST – GSTR-1 (for April 2027)" },
        { date: "13 MAY 2027", title: "GST – QRMP (IFF) (for April 2027)" },
        { date: "13 MAY 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 MAY 2027", title: "Income Tax – Form 16A (Quarter 4)" },
        { date: "15 MAY 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 MAY 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 MAY 2027", title: "GST – GSTR-3B (for April 2027)" },
        { date: "20 MAY 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 MAY 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 MAY 2027", title: "GST – PMT-06 (for April 2027)" },
        { date: "30 MAY 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 MAY 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 MAY 2027", title: "Income Tax – Annual Information Statement (AIS) Review" },
        { date: "31 MAY 2027", title: "Professional Tax Payment" },

        // -------- JUN 2027 ----------
        { date: "05 JUN 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 JUN 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 JUN 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 JUN 2027", title: "STPI – STPI-SERF" },
        { date: "10 JUN 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 JUN 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 JUN 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 JUN 2027", title: "GST – GSTR-1 (for May 2027)" },
        { date: "13 JUN 2027", title: "GST – QRMP (IFF) (for May 2027)" },
        { date: "13 JUN 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 JUN 2027", title: "Income Tax – Advance Tax (First Installment)" },
        { date: "15 JUN 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 JUN 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 JUN 2027", title: "GST – GSTR-3B (for May 2027)" },
        { date: "20 JUN 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 JUN 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 JUN 2027", title: "GST – PMT-06 (for May 2027)" },
        { date: "30 JUN 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 JUN 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 JUN 2027", title: "Quarterly GST & Accounts Reconciliation" },
        { date: "30 JUN 2027", title: "Professional Tax Payment" },

        // -------- JUL 2027 ----------
        { date: "05 JUL 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 JUL 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 JUL 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 JUL 2027", title: "STPI – STPI-SERF" },
        { date: "10 JUL 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 JUL 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 JUL 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 JUL 2027", title: "GST – GSTR-1 (for June 2027)" },
        { date: "13 JUL 2027", title: "GST – QRMP (IFF) (for June 2027)" },
        { date: "13 JUL 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 JUL 2027", title: "Income Tax – TCS Return" },
        { date: "15 JUL 2027", title: "Income Tax – Form 15G / 15H Declaration" },
        { date: "15 JUL 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 JUL 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 JUL 2027", title: "GST – GSTR-3B (for June 2027)" },
        { date: "20 JUL 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 JUL 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 JUL 2027", title: "GST – PMT-06 (for June 2027)" },
        { date: "30 JUL 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 JUL 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 JUL 2027", title: "Income Tax – ITR Filing (Non-Audit Cases)" },
        { date: "31 JUL 2027", title: "Professional Tax Payment" },

        // -------- AUG 2027 ----------
        { date: "05 AUG 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 AUG 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 AUG 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 AUG 2027", title: "STPI – STPI-SERF" },
        { date: "10 AUG 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 AUG 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 AUG 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 AUG 2027", title: "GST – GSTR-1 (for July 2027)" },
        { date: "13 AUG 2027", title: "GST – QRMP (IFF) (for July 2027)" },
        { date: "13 AUG 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 AUG 2027", title: "Income Tax – Form 16A (Quarter 1)" },
        { date: "15 AUG 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 AUG 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 AUG 2027", title: "GST – GSTR-3B (for July 2027)" },
        { date: "20 AUG 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 AUG 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 AUG 2027", title: "GST – PMT-06 (for July 2027)" },
        { date: "30 AUG 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 AUG 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 AUG 2027", title: "Annual GST Compliance Review" },
        { date: "31 AUG 2027", title: "Professional Tax Payment" },

        // -------- SEP 2027 ----------
        { date: "05 SEP 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 SEP 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 SEP 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 SEP 2027", title: "STPI – STPI-SERF" },
        { date: "10 SEP 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 SEP 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 SEP 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 SEP 2027", title: "GST – GSTR-1 (for August 2027)" },
        { date: "13 SEP 2027", title: "GST – QRMP (IFF) (for August 2027)" },
        { date: "13 SEP 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 SEP 2027", title: "Income Tax – Advance Tax (Second Installment)" },
        { date: "15 SEP 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 SEP 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 SEP 2027", title: "GST – GSTR-3B (for August 2027)" },
        { date: "20 SEP 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 SEP 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 SEP 2027", title: "GST – PMT-06 (for August 2027)" },
        { date: "30 SEP 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 SEP 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 SEP 2027", title: "Quarterly GST & Accounts Reconciliation" },
        { date: "30 SEP 2027", title: "Professional Tax Payment" },

        // -------- JUL 2027 ----------
        { date: "05 JUL 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 JUL 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 JUL 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 JUL 2027", title: "STPI – STPI-SERF" },
        { date: "10 JUL 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 JUL 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 JUL 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 JUL 2027", title: "GST – GSTR-1 (for June 2027)" },
        { date: "13 JUL 2027", title: "GST – QRMP (IFF) (for June 2027)" },
        { date: "13 JUL 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 JUL 2027", title: "Income Tax – TCS Return" },
        { date: "15 JUL 2027", title: "Income Tax – Form 15G / 15H Declaration" },
        { date: "15 JUL 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 JUL 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 JUL 2027", title: "GST – GSTR-3B (for June 2027)" },
        { date: "20 JUL 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 JUL 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 JUL 2027", title: "GST – PMT-06 (for June 2027)" },
        { date: "30 JUL 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 JUL 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 JUL 2027", title: "Income Tax – ITR Filing (Non-Audit Cases)" },
        { date: "31 JUL 2027", title: "Professional Tax Payment" },

        // -------- AUG 2027 ----------
        { date: "05 AUG 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 AUG 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 AUG 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 AUG 2027", title: "STPI – STPI-SERF" },
        { date: "10 AUG 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 AUG 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 AUG 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 AUG 2027", title: "GST – GSTR-1 (for July 2027)" },
        { date: "13 AUG 2027", title: "GST – QRMP (IFF) (for July 2027)" },
        { date: "13 AUG 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 AUG 2027", title: "Income Tax – Form 16A (Quarter 1)" },
        { date: "15 AUG 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 AUG 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 AUG 2027", title: "GST – GSTR-3B (for July 2027)" },
        { date: "20 AUG 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 AUG 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 AUG 2027", title: "GST – PMT-06 (for July 2027)" },
        { date: "30 AUG 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 AUG 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "31 AUG 2027", title: "Annual GST Compliance Review" },
        { date: "31 AUG 2027", title: "Professional Tax Payment" },

        // -------- SEP 2027 ----------
        { date: "05 SEP 2027", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 SEP 2027", title: "FEMA – ECB-2 Return" },
        { date: "07 SEP 2027", title: "Income Tax – TDS/TCS Deposit" },
        { date: "10 SEP 2027", title: "STPI – STPI-SERF" },
        { date: "10 SEP 2027", title: "SEZ – SEZ-SERF" },
        { date: "10 SEP 2027", title: "GST – GSTR-7 (TDS)" },
        { date: "10 SEP 2027", title: "GST – GSTR-8 (TCS)" },
        { date: "11 SEP 2027", title: "GST – GSTR-1 (for August 2027)" },
        { date: "13 SEP 2027", title: "GST – QRMP (IFF) (for August 2027)" },
        { date: "13 SEP 2027", title: "GST – GSTR-6 (ISD)" },
        { date: "15 SEP 2027", title: "Income Tax – Advance Tax (Second Installment)" },
        { date: "15 SEP 2027", title: "Employees Provident Fund (EPF) Payment" },
        { date: "15 SEP 2027", title: "Employees State Insurance (ESI) Contribution" },
        { date: "20 SEP 2027", title: "GST – GSTR-3B (for August 2027)" },
        { date: "20 SEP 2027", title: "GST – GSTR-5 (NRTP)" },
        { date: "20 SEP 2027", title: "GST – GSTR-5A (OIDAR)" },
        { date: "25 SEP 2027", title: "GST – PMT-06 (for August 2027)" },
        { date: "30 SEP 2027", title: "STPI – STPI-SOFTEX" },
        { date: "30 SEP 2027", title: "SEZ – SEZ-SOFTEX" },
        { date: "30 SEP 2027", title: "Quarterly GST & Accounts Reconciliation" },
        { date: "30 SEP 2027", title: "Professional Tax Payment" },


    ];

    const parseDate = (s) => {
        const parts = s.split(" ");
        return new Date(Number(parts[2]), MONTHS.indexOf(parts[1]), Number(parts[0]));
    };

    // prepare + sort
    useEffect(() => {
        const final = MANUAL_DUE_DATES.map(item => ({
            ...item,
            dateObj: parseDate(item.date),
        })).sort((a, b) => a.dateObj - b.dateObj);

        setDue(final);
        setLoading(false);
    }, []);

    // browser tab title
    useEffect(() => {
        if (month === -1) {
            document.title = "All Due Dates | Pavan Kalyan & Associates";
        } else {
            document.title = `${MONTHS[month]} Due Dates | Pavan Kalyan & Associates`;
        }
    }, [month]);

    // auto scroll to current month when ALL selected
    useEffect(() => {
        if (month === -1) {
            const mon = MONTHS[new Date().getMonth()];
            const el = monthRefs.current[mon];

            if (el && boxRef.current) {
                boxRef.current.scrollTo({
                    top: el.offsetTop - 20,
                    behavior: "smooth",
                });
            }
        }
    }, [month]);

    const searchFiltered = due.filter(it =>
        it.title.toLowerCase().includes(query.toLowerCase())
    );

    const monthFiltered =
        month === -1
            ? searchFiltered
            : searchFiltered.filter(it => it.dateObj.getMonth() === month);

    const groups = {};
    monthFiltered.forEach(it => {
        const key = MONTHS[it.dateObj.getMonth()];
        if (!groups[key]) groups[key] = [];
        groups[key].push(it);
    });

    const getStatus = (date) => {
        const d = parseDate(date);
        const t = new Date();
        t.setHours(0, 0, 0, 0);

        const diff = Math.ceil((d - t) / (1000 * 60 * 60 * 24));

        if (diff === 0) return { text: "Due Today", color: "bg-green-100 text-green-700" };
        if (diff === 1) return { text: "Due Tomorrow", color: "bg-yellow-100 text-yellow-700" };
        if (diff > 1) return { text: `Due in ${diff} days`, color: "bg-blue-100 text-blue-700" };
        return { text: "Expired", color: "bg-gray-200 text-gray-500 opacity-60" }; // faded
    };

    return (
        <>
            <div className="w-full text-center bg-white shadow-md py-5 text-3xl sm:text-4xl font-extrabold text-[#0A1A44]">
                Due Date Calendar
            </div>

            <div className="bg-gradient-to-br from-[#0A1A44] via-[#134EC1] to-[#38C7BA] py-10 sm:py-14">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl px-4 sm:px-6 py-6">

                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1A44] mb-2">
                        📅 Due Dates Calendar
                    </h2>

                    {/* BADGE + BACK BUTTON */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {month === -1
                                ? "Showing: All Due Dates"
                                : `Showing: ${MONTHS[month]} ${CURRENT_YEAR}`}
                        </div>

                        {month !== CURRENT_MONTH && (
                            <button
                                onClick={() => setMonth(CURRENT_MONTH)}
                                className="text-xs sm:text-sm font-bold bg-[#0A1A44] text-white px-3 py-1 rounded-full hover:opacity-90"
                            >
                                Back to This Month
                            </button>
                        )}
                    </div>

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

                    <div ref={boxRef} className="h-[360px] sm:h-[460px] overflow-y-auto pr-1">

                        {loading ? (
                            <div>Loading…</div>
                        ) : Object.keys(groups).length === 0 ? (
                            <div className="text-center py-8 text-gray-600 font-semibold">
                                ⚠️ Due dates for this month are not yet updated by the Government.
                            </div>
                        ) : (
                            Object.keys(groups).map((mon, idx) => (
                                <div
                                    key={idx}
                                    ref={(el) => (monthRefs.current[mon] = el)}
                                >
                                    <div
                                        className={`text-xl sm:text-2xl font-extrabold mt-4 mb-2 ${mon === MONTHS[CURRENT_MONTH]
                                            ? "text-[#0A1A44] underline"
                                            : "bg-gradient-to-r from-[#0A1A44] to-[#134EC1] bg-clip-text text-transparent"
                                            }`}
                                    >
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
