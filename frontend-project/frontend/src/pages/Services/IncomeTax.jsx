import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function IncomeTax() {
    return (
        <ServiceLayout title="INCOME TAX">

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Consultancy on various intricate matters pertaining to Income Tax",
                    "Effective Tax Management and Advisory Services",
                    "Tax planning for corporates and other assessees",
                    "Designing / restructuring salary structure to minimise tax burden",
                    "Obtaining Advance Tax Rulings",
                    "Obtaining No Objection Certificates from the Income Tax department",
                    "Obtaining PAN for assessees and employees",
                    "Advance tax estimation and deposit",
                    "Assessing the liability towards deferred taxes",
                    "Providing regular updates on amendments, circulars, notifications & judgments",
                    "Filing Income Tax and Wealth Tax returns for all kinds of assessees",
                    "Filing Income Tax returns for employees of corporate clients",
                    "Liaison with Income Tax department for rectification, assessment and obtaining refunds",
                    "Expertise in complicated direct tax assessments",
                    "Filing and pleading appeals under various provisions of the Income Tax Act",
                    "Special expertise in search, seizure and prosecution litigation",
                    "Advice on tax implications in potential business acquisitions",
                    "Opinions on issues related to Double Tax Avoidance Agreements (DTAA)",
                    "Settlement of issues raised under FEMA"
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
