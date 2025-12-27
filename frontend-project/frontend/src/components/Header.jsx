import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import caLogo from "../assets/ca1.png";

export default function Header() {

    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === "/";


    useEffect(() => {
        if (!isHome) return;

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);


    useEffect(() => {
        if (isHome) {
            setScrolled(window.scrollY > 50);
        }
    }, [location.pathname]);

    return (
        <header
            className={`
                fixed inset-x-0 top-0 z-50 transition-all duration-300 shadow-lg
                ${isHome
                    ? scrolled
                        ? "bg-[#0b2447]"
                        : "bg-transparent"
                    : "bg-[#0b2447]"
                }
            `}
        >
            <div className="w-full mx-auto px-6 py-4 flex items-center justify-between">


                <div className="flex items-center gap-4">
                    <img
                        src={caLogo}
                        alt="CA Logo"
                        className="h-12 w-auto object-contain rounded-lg bg-white/90 p-1 shadow-md"
                    />

                    <div className="leading-tight text-white">
                        <h1 className="text-xl font-bold">Pavan Kalyan & Associates</h1>
                        <p className="text-xs uppercase tracking-wide text-white/80">
                            Chartered Accountants
                        </p>
                    </div>
                </div>


                <nav className="hidden md:flex gap-8 items-center text-white text-lg font-medium">


                    <span
                        onClick={() => {
                            if (location.pathname === "/") {
                                window.location.href = "/";
                            }
                        }}
                    >
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-pkred hover:text-[#4da6ff]"
                                    : "hover:text-[#4da6ff]"
                            }
                        >
                            Home
                        </NavLink>
                    </span>

                    {/* ABOUT */}
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-pkred hover:text-[#4da6ff]"
                                : "hover:text-[#4da6ff]"
                        }
                    >
                        About
                    </NavLink>


                    <NavLink
                        to="/team"
                        className={({ isActive }) =>
                            isActive
                                ? "text-pkred hover:text-[#4da6ff]"
                                : "hover:text-[#4da6ff]"
                        }
                    >
                        Team
                    </NavLink>


                    <div className="relative group">
                        <span className="cursor-pointer hover:text-[#4da6ff] flex items-center gap-1">
                            Services ▾
                        </span>

                        <div
                            className="
            absolute left-0 invisible opacity-0
            group-hover:visible group-hover:opacity-100
            transition-all duration-200 mt-3
            w-56 bg-white rounded-md shadow-lg
            border border-gray-200 z-50
        "
                        >
                            {[
                                "Corporate Services",
                                "Audit",
                                "Corporate Finance",
                                "Services for Non-Residents",
                                "Accounting Services",
                                "Payroll",
                                "Benefits of Outsourcing",
                                "Income Tax",
                                "GST",
                                "Corporate Governance",
                                "TDS"
                            ].map((item, index) => {
                                const url = `/services/${item.replaceAll(" ", "-").toLowerCase()}`;

                                return (
                                    <NavLink
                                        key={index}
                                        to={url}
                                        className={({ isActive }) =>
                                            `
                        block px-4 py-2 text-sm whitespace-nowrap transition
                        ${isActive
                                                ? "bg-gray-100 text-[#0b2447] font-semibold pl-6 border-l-4 border-[#4da6ff]"
                                                : "hover:text-[#4da6ff] hover:bg-gray-100 text-gray-700 pl-4"
                                            }
                    `
                                        }
                                    >
                                        {item}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>



                    <NavLink
                        to="/careers"
                        className={({ isActive }) =>
                            isActive
                                ? "text-pkred hover:text-[#4da6ff]"
                                : "hover:text-[#4da6ff]"
                        }
                    >
                        Careers
                    </NavLink>


                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "text-pkred hover:text-[#4da6ff]"
                                : "hover:text-[#4da6ff]"
                        }
                    >
                        Contact Us
                    </NavLink>
                </nav>

                <div className="md:hidden text-white text-2xl">☰</div>

            </div>
        </header>
    );
}


