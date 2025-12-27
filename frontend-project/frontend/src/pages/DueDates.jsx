import React, { useEffect, useRef, useState } from "react";

export default function DueDates() {
    const [due, setDue] = useState([]);
    const [month, setMonth] = useState(-1);
    const [loading, setLoading] = useState(true);
    const boxRef = useRef(null);

    const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const MANUAL_DUE_DATES = [
        { date: "05 DEC 2025", title: "SEZ – SEZ Monthly Performance Report (MPR)" },
        { date: "07 DEC 2025", title: "FEMA – ECB-2 Return" },
        { date: "07 DEC 2025", title: "Income Tax – TDS/TCS Deposit for November 2025" },
        { date: "10 DEC 2025", title: "STPI – STPI-SERF" },
        { date: "10 DEC 2025", title: "SEZ – SEZ-SERF" },
        { date: "10 DEC 2025", title: "GST – GSTR-7 (TDS)" },
        { date: "10 DEC 2025", title: "GST – GSTR-8 (TCS)" },

        { date: "20 DEC 2025", title: "GST – GSTR-3B" },
        { date: "31 DEC 2025", title: "Income Tax – Revised / Belated ITR" },

        // ✅ JANUARY 2026 — FULL CORRECT LIST
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

        // ✅ FEBRUARY 2026 — FULL LIST
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


        // ✅ MARCH 2026 — FULL LIST
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
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return new Date(Number(parts[2]), months.indexOf(parts[1]), Number(parts[0]));
    };

    useEffect(() => {
        const final = MANUAL_DUE_DATES.map(item => ({
            ...item,
            dateObj: parseDate(item.date)
        })).sort((a, b) => a.dateObj - b.dateObj);

        setDue(final);
        setLoading(false);
    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = due.filter(it => it.dateObj >= today);
    const monthFiltered = month === -1 ? upcoming : upcoming.filter(it => it.dateObj.getMonth() === month);

    const groups = {};
    monthFiltered.forEach(it => {
        const key = MONTHS[it.dateObj.getMonth()];
        if (!groups[key]) groups[key] = [];
        groups[key].push(it);
    });

    const countdown = (date) => {
        const d = parseDate(date);
        const t = new Date(); t.setHours(0, 0, 0, 0);
        const diff = Math.ceil((d - t) / (1000 * 60 * 60 * 24));
        if (diff === 0) return "Due Today";
        if (diff === 1) return "Due Tomorrow";
        if (diff > 1) return `Due in ${diff} days`;
        return "Expired";
    };

    return (
        <>
            {/* ✅ RESTORED PREMIUM UI STYLES */}
            <style>{`
                .header {
                    padding: 26px 0;
                    background: white;
                    text-align: center;
                    font-size: 38px;
                    font-weight: 800;
                    color: #0A1A44;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
                }
                .bg {
                    background: linear-gradient(145deg, #0A1A44, #134EC1, #38C7BA);
                    padding: 50px 0 80px;
                }
                .wrapper {
                    max-width: 820px;
                    margin: auto;
                    background: white;
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 0 14px 40px rgba(0,0,0,0.12);
                }
                .innerHeading {
                    font-size: 26px;
                    font-weight: 800;
                    color: #0A1A44;
                    margin-bottom: 18px;
                }
                .months {
                    display: flex;
                    gap: 10px;
                    overflow-x: auto;
                    margin-bottom: 12px;
                }
                .pill {
                    padding: 10px 18px;
                    border-radius: 999px;
                    background: white;
                    border: 1px solid #dbe1ee;
                    cursor: pointer;
                    font-weight: 700;
                }
                .pill.active {
                    background: #0A1A44;
                    color: white;
                }
                .scroll {
                    height: 480px;
                    overflow-y: auto;
                }
                .month-title {
                    font-size: 22px;
                    font-weight: 900;
                    margin: 20px 0 10px;
                    background: linear-gradient(145deg, #0A1A44, #134EC1);
                    -webkit-background-clip: text;
                    color: transparent;
                }
                .item {
                    display: flex;
                    gap: 12px;
                    padding: 12px 6px;
                    border-bottom: 1px dashed #dce3ef;
                }
                .date {
                    font-weight: 700;
                    color: #0A1A44;
                }
                .title {
                    margin-top: 4px;
                    font-weight: 600;
                }
                .countdown {
                    color: #2563eb;
                    margin-top: 4px;
                    font-size: 13px;
                    font-weight: 700;
                }
            `}</style>

            <div className="header">Due Date Calendar</div>

            <div className="bg">
                <div className="wrapper">
                    <h2 className="innerHeading">📅 Due Dates Calendar</h2>

                    <div className="months">
                        <div className={`pill ${month === -1 ? "active" : ""}`} onClick={() => setMonth(-1)}>ALL</div>
                        {MONTHS.map((m, i) => (
                            <div key={i} className={`pill ${month === i ? "active" : ""}`} onClick={() => setMonth(i)}>
                                {m}
                            </div>
                        ))}
                    </div>

                    <div className="scroll" ref={boxRef}>
                        {loading ? "Loading..." :
                            Object.keys(groups).map((mon, idx) => (
                                <div key={idx}>
                                    <div className="month-title">{mon}</div>
                                    {groups[mon].map((d, i) => (
                                        <div className="item" key={i}>
                                            <div style={{ fontSize: 22 }}>📄</div>
                                            <div>
                                                <div className="date">{d.date}</div>
                                                <div className="title">{d.title}</div>
                                                <div className="countdown">{countdown(d.date)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
