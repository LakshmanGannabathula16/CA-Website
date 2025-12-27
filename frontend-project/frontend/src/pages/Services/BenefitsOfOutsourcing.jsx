import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function BenefitsOfOutsourcing() {
    return (
        <ServiceLayout title="BENEFITS OF OUTSOURCING">

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Enables business to concentrate on core business activities",
                    "Use of manpower for more important functions",
                    "Investment in fixed assets reduced / minimized",
                    "Substantial savings in cost",
                    "Services of experts made available",
                    "Improved internal controls",
                    "Enhanced reporting capabilities for timely and accurate financial data",
                    "Off-site backup of data"
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
