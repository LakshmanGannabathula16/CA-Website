import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Hero from "../components/Hero";
import heroImg from "../assets/Samp.jpeg";

import corporateImg from "../assets/Business2.jpeg";
import auditImg from "../assets/Audit.jpeg";
import financeImg from "../assets/corporatefinance.jpeg";
import accountingImg from "../assets/accounting.jpeg";
import incomeTaxImg from "../assets/IncomeTax.jpeg";
import payrollImg from "../assets/Payroll.jpeg";

import GetInTouchSection from "../components/GetInTouchSection";
import NewsUpdatesSection from "../components/NewsUpdatesSection";

export default function Home() {
    return (
        <>
            <Hero />


            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.4 }}
                        className="relative"
                    >

                        <div className="absolute -top-6 -left-6 w-40 h-40 bg-[#1e3a8a] rotate-45 z-10"></div>

                        <img
                            src={heroImg}
                            alt="Office Work"
                            className="w-full rounded-xl shadow-xl relative z-20"
                        />

                        <div className="absolute right-[-28px] top-[40%] w-24 h-32 bg-[#1e3a8a] z-20"></div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.4 }}
                    >

                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-5 -mt-4 leading-snug">

                            Welcome to Pavan Kalyan & Associates
                        </h2>



                        <p className="text-slate-700 leading-relaxed mb-4 text-[16px]">
                            <strong>Pavan Kalyan & Associates</strong> is a modern Chartered
                            Accountancy firm offering audit, taxation, GST advisory, corporate
                            advisory, financial consulting, and end-to-end accounting solutions.
                        </p>

                        <p className="text-slate-700 leading-relaxed mb-6 text-[16px]">
                            Led by <strong>CA N. Pavan Kalyan Kumar</strong>, our firm delivers
                            reliable, value-driven, and client-focused financial solutions.
                        </p>

                        <Link
                            to="/about"
                            className="inline-block mt-8 px-10 py-3 rounded-full bg-[#1e3a8a] text-white 
        font-semibold shadow-lg hover:bg-[#0b2447] transition duration-300"
                        >
                            About Us
                        </Link>
                    </motion.div>

                </div>
            </section>


            <motion.section
                className="pt-6 pb-14 bg-white"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#1e3a8a]">OUR SERVICES</h2>
                    <div className="w-20 h-1 bg-[#1e3a8a] mx-auto mt-3 rounded-full"></div>
                </div>

                <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-3 gap-10">

                    {[
                        {
                            img: corporateImg,
                            title: "CORPORATE SERVICES",
                            desc: "Incorporation, ROC filings & company law consultancy.",
                            link: "/services/corporate-services"
                        },
                        {
                            img: auditImg,
                            title: "AUDIT & ASSURANCE",
                            desc: "Indepth system review, controls and reporting.",
                            link: "/services/audit"
                        },
                        {
                            img: financeImg,
                            title: "CORPORATE FINANCE",
                            desc: "CMA data, project reports & funding support.",
                            link: "/services/corporate-finance"
                        },
                        {
                            img: accountingImg,
                            title: "ACCOUNTING SERVICES",
                            desc: "Bookkeeping, MIS reports & system setup.",
                            link: "/services/accounting-services"
                        },
                        {
                            img: incomeTaxImg,
                            title: "INCOME TAX",
                            desc: "Filing returns, assessments & tax planning.",
                            link: "/services/income-tax"
                        },
                        {
                            img: payrollImg,
                            title: "PAYROLL SERVICES",
                            desc: "Payroll processing, PF/ESI filings & compliance.",
                            link: "/services/payroll"
                        }
                    ].map((svc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            viewport={{ once: true }}
                        >

                            <Link to={svc.link} className="group block cursor-pointer">
                                <div className="relative overflow-hidden rounded-lg shadow-xl">
                                    <img
                                        src={svc.img}
                                        className="w-full h-56 object-cover transition duration-700 group-hover:scale-110"
                                        alt={svc.title}
                                    />

                                    <div className="
                    absolute bottom-0 left-0 right-0
                    bg-white group-hover:bg-[#0A2A48]
                    text-black group-hover:text-white
                    p-6 transition-all duration-500
                    shadow-xl rounded-t-lg
                  ">
                                        <h3 className="font-bold text-lg mb-2">{svc.title}</h3>
                                        <p className="text-sm opacity-90">{svc.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                </div>
            </motion.section>
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                viewport={{ once: true }}
            >
                <NewsUpdatesSection />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                viewport={{ once: true }}
            >
                <GetInTouchSection />
            </motion.div>
        </>
    );
}
