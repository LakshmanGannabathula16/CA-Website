import React from "react";
import member1 from "../assets/Pavan.jpeg";

export default function Team() {
    return (
        <section className="pt-32 pb-20 container mx-auto px-6 max-w-5xl">


            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
                OUR TEAM
            </h2>

            <p className="text-gray-700 leading-snug mb-12 text-[15.5px] font-medium">
                Our dedicated team comprises competent professionals with extensive knowledge and experience.
                Our professionalism and expertise help us serve clients with excellence and responsibility.
            </p>


            <div
                className="
                    bg-white 
                    rounded-2xl 
                    shadow-lg 
                    p-10 
                    border 
                    border-gray-200
                "
            >
                <div className="grid md:grid-cols-[220px_1fr] gap-10 items-start">


                    <div className="text-center">
                        <div
                            className="
                                w-44 h-44 mx-auto 
                                rounded-full 
                                p-[3px]
                                bg-gradient-to-br 
                                from-[#0b2447] to-[#193766]
                                shadow-xl
                            "
                        >
                            <img
                                src={member1}
                                alt="N Pavan Kalyan Kumar"
                                className="
                                    w-full h-full 
                                    rounded-full 
                                    object-cover 
                                    object-top
                                    shadow-md
                                "
                            />
                        </div>


                        <p className="mt-4 text-red-500 font-semibold text-[15px] leading-snug">
                            +91 9590150805
                        </p>
                        <p className="text-gray-600 text-[14px] leading-snug">pavan@muthuandco.co.in</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            N PAVAN KALYAN KUMAR (FCA, B.COM)
                        </h3>

                        <div className="text-gray-700 text-[15.5px] leading-snug font-medium text-justify">

                            <p className="mb-4">
                                Pavan Kalyan serves as a <strong>Proprietor and Leader</strong> within the firm’s
                                <strong> Tax and Regulatory Practice</strong>. Based in Bengaluru, he contributes
                                <strong> over six years of extensive professional experience</strong> in tax advisory
                                and compliance functions.
                            </p>

                            <p className="mb-4">
                                He heads the <strong>Financial Services Tax and Advisory Practice</strong>, providing
                                strategic tax planning, regulatory representations, and specialized advisory across
                                complex taxation matters.
                            </p>

                            <p className="font-semibold mt-4 mb-2 text-gray-900 text-[16px]">
                                Core Specializations:
                            </p>

                            <ul className="ml-6 mb-4 space-y-1 text-[15px] leading-snug font-medium">
                                <li className="list-disc">Income & Corporate Taxation</li>
                                <li className="list-disc">Regulatory & Tax Compliance</li>
                                <li className="list-disc">Payroll Management & Compliance Services</li>
                                <li className="list-disc">Virtual CFO Solutions</li>
                            </ul>

                            <p className="font-semibold mt-4 mb-2 text-gray-900 text-[16px]">
                                Assurance Expertise:
                            </p>

                            <ul className="ml-6 mb-4 space-y-1 text-[15px] leading-snug font-medium">
                                <li className="list-disc">Statutory & Internal Audits</li>
                                <li className="list-disc">Financial Reporting</li>
                                <li className="list-disc">Internal Control Reviews</li>
                                <li className="list-disc">Business Process Advisory</li>
                            </ul>

                            <p>
                                Mr. Kalyan’s methodology integrates <strong>technical precision</strong> with
                                <strong> deep business insight</strong>. His structured and analytical approach enables
                                clients to navigate complex financial and regulatory frameworks confidently.
                                He is committed to delivering <strong>value-driven, compliant, and growth-focused</strong>
                                solutions tailored to each client’s needs.
                            </p>

                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
