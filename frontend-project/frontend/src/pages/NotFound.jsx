import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="w-screen min-h-screen bg-[#0b2a4a] text-white overflow-x-hidden">


            <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">

                <h1 className="text-[120px] md:text-[160px] font-extrabold leading-none">
                    404
                </h1>

                <h2 className="text-3xl md:text-4xl font-semibold tracking-wide mt-4">
                    Page Not Found
                </h2>

                <Link
                    to="/"
                    className="mt-10 inline-block bg-white text-[#0b2a4a]
                     px-10 py-3 rounded font-semibold
                     hover:bg-gray-100 transition"
                >
                    Go to Home
                </Link>

                <p className="mt-10 text-sm opacity-70">
                    Scroll down to explore our services ↓
                </p>
            </section>


            <section className="bg-white text-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-6">

                    <h3 className="text-3xl font-bold text-[#0b2a4a] text-center mb-14">
                        Our Professional Services
                    </h3>

                    <div className="grid md:grid-cols-3 gap-10">

                        {[
                            {
                                title: "Corporate Services",
                                desc: "Company incorporation, ROC filings, and compliance management.",
                                link: "/services/corporate-services",
                                featured: true,
                            },
                            {
                                title: "Audit & Assurance",
                                desc: "Statutory audits, internal audits, and risk assessment.",
                                link: "/services/audit",
                                featured: true,
                            },
                            {
                                title: "Income Tax",
                                desc: "Tax planning, return filing, and assessments.",
                                link: "/services/income-tax",
                                featured: true,
                            },
                            {
                                title: "GST Services",
                                desc: "GST registration, compliance, and advisory services.",
                                link: "/services/gst",
                                featured: true,

                            },
                            {
                                title: "Accounting Services",
                                desc: "Bookkeeping, MIS reporting, and system setup.",
                                link: "/services/accounting-services",
                                featured: true,
                            },
                            {
                                title: "Payroll Services",
                                desc: "Payroll processing, PF & ESI compliance.",
                                link: "/services/payroll",
                                featured: true,
                            },
                        ].map((svc, i) => (
                            <Link
                                key={i}
                                to={svc.link}
                                className={`
      group border rounded-lg p-8 transition-all duration-300
      ${svc.featured
                                        ? "bg-[#0b2a4a] border-[#0b2a4a]"
                                        : "hover:bg-[#0b2a4a] hover:border-[#0b2a4a]"
                                    }
    `}
                            >
                                <h4
                                    className={`
        text-xl font-semibold mb-3 transition
        ${svc.featured ? "text-white" : "text-[#0b2a4a] group-hover:text-white"}
      `}
                                >
                                    {svc.title}
                                </h4>

                                <p
                                    className={`
        transition
        ${svc.featured ? "text-white/90" : "text-gray-600 group-hover:text-white/90"}
      `}
                                >
                                    {svc.desc}
                                </p>
                            </Link>
                        ))}


                    </div>
                </div>
            </section>


        </div>
    );
}
