import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function GST() {
    return (
        <ServiceLayout title="GST">

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "GST Migrations and Registrations",
                    "Filing of GST Returns (Regular Dealer, Composition Dealer, ISD, Non-Resident, E-Commerce, etc.)",
                    "GST Consultancy / Advisory on various issues of GST",
                    "Impact Analysis on Business Segments",
                    "GST Audits as per GST Act, 2017",
                    "GST Implementation",
                    "Compilation of Data of Input Tax Credit",
                    "GST Assessments",
                    "Transition from Pre-GST to GST Regime",
                    "Maintenance of Records for Compliance",
                    "Strategic Business Planning under GST Regime",
                    "Supplier / Buyer Management",
                    "GSTN Number Verification Services",
                    "HSN Code Finder"
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
