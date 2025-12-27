import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function ServicesForNonResidents() {
    return (
        <ServiceLayout title="SERVICES FOR NON-RESIDENTS">

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Allotment of Permanent Account Number (PAN)",
                    "Tax planning",
                    "Obtaining Advance Rulings on debatable issues",
                    "Consultancy / advice on FEMA / RBI matters",
                    "Filing Income Tax / Wealth Tax Returns",
                    "Advice on making investments",
                    "Issuing certificate for repatriation of income / assets from India",
                    "Making application to RBI for matters including sale and purchase of residential or commercial properties"
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
