import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function CorporateServices() {
    return (
        <ServiceLayout title="CORPORATE SERVICES">

            <ul className="ml-4 mt-2 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Incorporation of company",
                    "Consultancy on Company Law matters",
                    "Planning for Mergers, Acquisitions, De-mergers, and Corporate re-organizations",
                    "Filing of annual returns and various forms, documents",
                    "Clause 49 review for compliance with fiscal, corporate and tax laws",
                    "Secretarial matters including share transfers",
                    "Maintenance of statutory records",
                    "Consultancy on Public/Rights/Bonus issue of shares",
                    "Change of name, objects, registered office, etc."
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
