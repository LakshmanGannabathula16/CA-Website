import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import caLogo from "../assets/ca1.png";
import {
    FaLinkedin,
    FaWhatsapp,
    FaInstagram,
    FaFacebook
} from "react-icons/fa";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [openServices, setOpenServices] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === "/";

    useEffect(() => {
        if (!isHome) return;
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    useEffect(() => {
        if (isHome) setScrolled(window.scrollY > 50);
    }, [location.pathname]);

    return (
        <>
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
                    {/* Logo + Title */}
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

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex gap-8 items-center text-white text-lg font-medium">
                        {[
                            { label: "Home", to: "/" },
                            { label: "About", to: "/about" },
                            { label: "Team", to: "/team" },
                            { label: "Careers", to: "/careers" },
                            { label: "Contact Us", to: "/contact" }
                        ].map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `
                    transition
                    ${isActive ? "text-pkred" : "text-white"}
                    hover:text-blue-400
                  `
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}

                        {/* Desktop Services dropdown */}
                        <div className="relative group">
                            <span className="cursor-pointer hover:text-blue-400 flex items-center gap-1">
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
                                    const url = `/services/${item
                                        .replaceAll(" ", "-")
                                        .toLowerCase()}`;

                                    return (
                                        <NavLink
                                            key={index}
                                            to={url}
                                            className={({ isActive }) =>
                                                `
                          block px-4 py-2 text-sm whitespace-nowrap transition
                          ${isActive
                                                    ? "bg-gray-100 text-[#0b2447] font-semibold pl-6 border-l-4 border-blue-400"
                                                    : "text-gray-700 pl-4"
                                                }
                          hover:text-blue-400 hover:bg-gray-100
                        `
                                            }
                                        >
                                            {item}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div
                        className="md:hidden text-white text-3xl cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        ☰
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div
                className={`
          fixed inset-0 z-50 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
                onClick={() => setOpen(false)}
            >
                <div
                    className={`
            absolute top-0 left-0 h-full w-72
            bg-[#0b2447] shadow-2xl p-6
            transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-white text-xl font-semibold">Menu</h2>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-white text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Scrollable Navigation */}
                    <nav className="flex flex-col gap-4 text-white text-lg overflow-y-auto max-h-[85vh] pr-2">
                        {[
                            { label: "Home", to: "/" },
                            { label: "About", to: "/about" },
                            { label: "Team", to: "/team" }
                        ].map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className="transition hover:text-blue-400 active:text-blue-300"
                            >
                                {link.label}
                            </NavLink>
                        ))}

                        {/* SERVICES COLLAPSIBLE */}
                        <div className="border-t border-white/10 pt-2">
                            <button
                                onClick={() => setOpenServices(!openServices)}
                                className="w-full flex justify-between items-center text-left text-white transition hover:text-blue-400 py-2"
                            >
                                <span>Services</span>
                                <span>{openServices ? "▴" : "▾"}</span>
                            </button>

                            {openServices && (
                                <div className="mt-2 pl-3 space-y-1">
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
                                    ].map((item, i) => {
                                        const url = `/services/${item
                                            .replaceAll(" ", "-")
                                            .toLowerCase()}`;

                                        return (
                                            <NavLink
                                                key={i}
                                                to={url}
                                                onClick={() => setOpen(false)}
                                                className="block text-sm py-2 px-2 rounded transition hover:bg-white/10 hover:text-blue-400 active:text-blue-300"
                                            >
                                                {item}
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {[
                            { label: "Careers", to: "/careers" },
                            { label: "Contact Us", to: "/contact" }
                        ].map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className="transition hover:text-blue-400 active:text-blue-300"
                            >
                                {link.label}
                            </NavLink>
                        ))}

                        {/* SOCIAL ICONS — CENTERED */}
                        <div className="mt-6 pt-4 border-t border-white/10 flex justify-center gap-4 text-xl">
                            <a
                                href="https://www.linkedin.com/in/pavan-kalyan-n-8aa907112/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition hover:text-blue-400 active:text-blue-300"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="https://www.instagram.com/thisiscapk?igsh=ZjVkZzV5enB3ZnJz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition hover:text-pink-400 active:text-pink-300"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.facebook.com/share/1Cabj8hhJ5/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition hover:text-blue-500 active:text-blue-300"
                            >
                                <FaFacebook />
                            </a>

                            <a
                                href="https://wa.me/919590150805"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white transition hover:text-green-400 active:text-green-300"
                            >
                                <FaWhatsapp />
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
