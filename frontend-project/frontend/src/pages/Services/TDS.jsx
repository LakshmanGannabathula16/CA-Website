import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function TDS() {
    return (
        <ServiceLayout title="TAX DEDUCTED AT SOURCE (TDS)">

            <ul className="ml-4 mt-2 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Advice on all matters related to compliance of TDS/TCS provisions",
                    "Obtaining Tax Deduction Account Number (TAN)",
                    "Periodic review of TDS / Withholding Tax compliance",
                    "Computation of monthly TDS",
                    "Monthly reconciliation of TDS due and deposited",
                    "Monthly deposit of TDS electronically/manually",
                    "Issue of monthly/annual TDS certificates",
                    "Filing of quarterly E-TDS / Manual Returns",
                    "Filing of Correction Statements",
                    "TDS assessment"
                ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 pl-1">
                        <span className="mt-[6px] w-[6px] h-[6px] bg-black rounded-full inline-block"></span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

        </ServiceLayout>
    );
}
