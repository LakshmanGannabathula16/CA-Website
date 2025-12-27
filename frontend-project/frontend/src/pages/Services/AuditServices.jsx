import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function AuditServices() {
    return (
        <ServiceLayout title="AUDIT SERVICES">
            <p className="text-[16px] font-semibold mb-2 text-gray-800">
                Broadly, Audit involves the following:
            </p>

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Indepth study of existing systems, procedures and controls with suggestions for improvement and strengthening",
                    "Ensuring compliance with policies, procedures and statutes",
                    "Comprehensive review to ensure accounts comply with GAAP and applicable Accounting Standards/IFRS",
                    "Checking the genuineness of expenses booked in accounts",
                    "Reporting inefficiencies at any operational level",
                    "Detecting and preventing income leakages and suggesting corrective measures",
                    "Certification of books of account in agreement with the Balance Sheet and Profit & Loss Account",
                    "Issuing Audit Reports under various applicable laws"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                        <span className="mt-[6px] w-[6px] h-[6px] bg-black rounded-full inline-block"></span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>


            <p className="text-[16px] font-semibold mt-6 mb-2 text-gray-800">
                Types of Audits conducted:
            </p>
            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Statutory Audit of Companies",
                    "Tax Audit under Section 44AB of the Income Tax Act, 1961",
                    "Audits under sections such as 80HHC, 80-IA, etc.",
                    "Concurrent Audits",
                    "Revenue Audit of Banks",
                    "Branch Audits of Banks",
                    "Audit of PF Trusts, Charitable Trusts, Schools, etc.",
                    "Audit of Co-operative Societies",
                    "Information System Audit",
                    "Internal Audits"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                        <span className="mt-[6px] w-[6px] h-[6px] bg-black rounded-full inline-block"></span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

        </ServiceLayout>
    );
}
