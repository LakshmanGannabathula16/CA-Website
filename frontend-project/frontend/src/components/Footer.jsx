import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import caLogo from "../assets/ca1.png";

export default function Footer() {
    return (
        <footer className="bg-[#0b2447] text-white pt-16 pb-8 mt-20">

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className="container mx-auto px-8 grid lg:grid-cols-4 md:grid-cols-2 gap-12"
            >

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <img src={caLogo} alt="CA Logo" className="h-12 w-auto" />

                        <div className="flex flex-col">
                            <h3 className="text-lg font-bold leading-tight">
                                Pavan Kalyan Associates
                            </h3>
                            <span className="text-sm text-gray-300 -mt-1">
                                Chartered Accountants
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                        <strong>Office:</strong> No. 01, Mahalakshmi Nilaya, 11th A Cross,
                        HN Layout, Swimming Pool Extension, Malleshwaram,
                        Bengaluru, Karnataka – 560003
                    </p>

                    <p className="mt-4 text-gray-300 text-sm">
                        <strong>Phone:</strong> +91 95901 50805
                    </p>
                    <p className="text-gray-300 text-sm">
                        <strong>Email:</strong> pavan@muthuandco.co.in
                    </p>


                    <div className="flex gap-4 mt-4 text-xl">
                        <a
                            href="https://www.linkedin.com/in/pavan-kalyan-n-8aa907112/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                        >
                            <FaLinkedin />
                        </a>

                        <a
                            href="https://www.instagram.com/thisiscapk?igsh=ZjVkZzV5enB3ZnJz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-400"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://www.facebook.com/share/1Cabj8hhJ5/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500"
                        >
                            <FaFacebook />
                        </a>

                        <a
                            href="https://wa.me/919590150805"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-400"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                >
                    <h3 className="text-lg font-semibold mb-3 border-b border-gray-500 pb-2">
                        Quick Links
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="/" className="hover:text-white">Home</a></li>
                        <li><a href="/about" className="hover:text-white">About Us</a></li>
                        <li><a href="/team" className="hover:text-white">Our Team</a></li>
                        <li><a href="/services" className="hover:text-white">Services</a></li>
                        <li><a href="/contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <h3 className="text-lg font-semibold mb-3 border-b border-gray-500 pb-2">
                        Useful Links
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">Income Tax Dept.</a></li>
                        <li><a href="https://cbic-gst.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">GST Portal</a></li>
                        <li><a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">Ministry of Corporate Affairs</a></li>
                        <li><a href="https://www.epfindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">Employees Provident Fund</a></li>
                        <li><a href="https://gst.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">E-Tax Information Network</a></li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.65 }}
                >
                    <h3 className="text-lg font-semibold mb-3 border-b border-gray-500 pb-2">
                        Reach Us
                    </h3>

                    <iframe
                        src="https://www.google.com/maps?q=MUTHU%20%26%20CO.,%20Bengaluru&z=17&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.div>

            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="mt-12 border-t border-gray-600 pt-4 text-center text-xs text-gray-300"
            >
                © {new Date().getFullYear()} Pavan Kalyan Associates. All Rights Reserved.
                <br />
                <span className="text-gray-400">
                    Designed & Developed by <span className="text-white">Lakshman</span>
                </span>
            </motion.div>

        </footer>
    );
}
