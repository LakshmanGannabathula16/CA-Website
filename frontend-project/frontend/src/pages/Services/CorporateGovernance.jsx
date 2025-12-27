import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function CorporateGovernance() {
    return (
        <ServiceLayout title="CORPORATE GOVERNANCE">

            <p className="text-[15px] leading-snug font-medium mb-3">
                Corporate governance refers to a combination of laws, regulations, procedures,
                implicit rules and voluntary practices which help companies perform efficiently
                and maximize long-term value for shareholders while safeguarding the interests
                of other stakeholders including buyers, government, lenders, and society.
            </p>

            <p className="text-[15px] leading-snug font-medium mb-3">
                With increasing organizational growth, sound governance has become essential.
                SEBI and stock exchange listing agreements mandate compliance with corporate
                governance norms, emphasizing transparency and fairness in operations.
            </p>

            <p className="text-[15px] leading-snug font-medium mb-3 font-semibold">
                Our services include:
            </p>

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Periodic monitoring through internal audit",
                    "Independent audit",
                    "Independent verification",
                    "Effective supervision",
                    "Accountability",
                    "Sufficient number of Independent Directors on the Board",
                    "Formation of an Independent Audit Committee for the Board",
                    "Adequate disclosure and transparency in reports",
                    "Participation in Board Meetings"
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
