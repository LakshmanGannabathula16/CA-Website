import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function AccountingServices() {
    return (
        <ServiceLayout title="ACCOUNTING SERVICES">

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Accounting System Design & Implementation",
                    "Financial Accounting",
                    "Budgeting",
                    "Financial Reporting",
                    "MIS Reports",
                    "Financial Analysis",
                    "Asset Accounting Management",
                    "Depreciation and Amortization Schedules"
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
