import React from "react";

export default function About() {
    return (
        <section className="pt-32 pb-20 container mx-auto px-6 max-w-5xl">

            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
                ABOUT US
            </h2>

            <ul className="ml-4 mt-2 space-y-1 text-[15.5px] leading-snug font-medium text-gray-700">

                <li className="flex items-start gap-3 pl-1">
                    <span className="mt-[6px] w-[6px] h-[6px] bg-black rounded-full inline-block"></span>
                    <span>
                        <strong>Pavan Kalyan Associates</strong> is a trusted Chartered Accountancy firm
                        offering comprehensive financial, regulatory, and advisory services with accuracy,
                        professionalism, and client focus.
                    </span>
                </li>

                <li className="flex items-start gap-3 pl-1">
                    <span className="mt-[6px] w-[6px] h-[6px] bg-black rounded-full inline-block"></span>
                    <span>
                        Our expertise spans across auditing, taxation, accounting, corporate advisory,
                        business consulting, financial planning, compliance management, and virtual CFO services.
                    </span>
                </li>

                <li className="flex items-start gap-3 pl-1">
                    <span className="mt-[6px] w-[6px] h-[6px] bg-black rounded-full inline-block"></span>
                    <span>
                        The firm is led by qualified Chartered Accountants who combine technical knowledge
                        with real-world experience to deliver strategic and practical solutions tailored
                        to each client's financial goals.
                    </span>
                </li>

                <li className="flex items-start gap-3 pl-1">
                    <span className="mt-[6px] w-[6px] h-[6px] bg-black rounded-full inline-block"></span>
                    <span>
                        We stay updated with evolving tax laws, financial regulations, and industry practices
                        to ensure clients receive precise, compliant, and future-ready guidance.
                    </span>
                </li>

                <li className="flex items-start gap-3 pl-1">
                    <span className="mt-[6px] w-[6px] h-[6px] bg-black rounded-full inline-block"></span>
                    <span>
                        At <strong>Pavan Kalyan Associates</strong>, our mission is to simplify finance,
                        strengthen businesses, and help clients make confident, informed decisions through
                        trust, transparency, and excellence.
                    </span>
                </li>

            </ul>

        </section>
    );
}
