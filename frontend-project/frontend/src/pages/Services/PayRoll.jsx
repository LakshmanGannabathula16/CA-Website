import React from "react";
import ServiceLayout from "../../components/ServiceLayout";

export default function PayRoll() {
    return (
        <ServiceLayout title="PAYROLL">

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Preparation of Monthly Salary Sheet",
                    "Deductions as per applicable laws like Income Tax, Provident Fund, and Professional Tax etc.",
                    "Computation and deposit of TDS, ESI, PF etc.",
                    "Disbursement / Online Payment of Salary",
                    "Pay slip by password-protected e-mail",
                    "Reimbursement of telephone, medical bills etc.",
                    "Issue of Form 16 to employees",
                    "Periodic Reconciliation of payments/statutory deductions etc. with books of accounts",
                    "Administration of gratuity, superannuation, pension schemes etc."
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
