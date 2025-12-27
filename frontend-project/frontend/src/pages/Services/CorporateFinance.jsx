import ServiceLayout from "../../components/ServiceLayout";

export default function CorporateFinance() {
    return (
        <ServiceLayout title="CORPORATE FINANCE">

            <ul className="ml-4 mt-1 space-y-1 text-[15px] leading-snug font-medium">
                {[
                    "Preparations of Project Reports",
                    "Preparation of CMA data for bank loans",
                    "Private placement of shares, Inter-Corporate Deposit, Term loans, Working Capital limits, etc.",
                    "External Commercial Borrowings (ECBs)"
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
