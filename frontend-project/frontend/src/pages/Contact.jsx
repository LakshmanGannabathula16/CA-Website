import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-2"
            >
                CONTACT US
            </motion.h1>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full h-[1px] bg-gray-300 mb-6"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <h2 className="text-xl font-bold text-gray-900">
                    Pavan Kalyan Associates
                </h2>
                <p className="text-gray-600 text-sm mb-6 -mt-1">
                    Chartered Accountants
                </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 group transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:scale-[1.01]"
                >
                    <div style={{ width: "100%", height: "100%" }}>
                        <iframe
                            src="https://www.google.com/maps?q=MUTHU%20%26%20CO.,%20Bengaluru&z=17&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>


                    <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/25 to-transparent pointer-events-none"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="bg-[#0b2447] text-white p-6 rounded-2xl shadow-xl mb-4 transition-all hover:scale-[1.02]"
                    >
                        <h3 className="text-lg font-semibold mb-2">Office:</h3>
                        <p className="leading-relaxed text-[15px]">
                            No. 01, Mahalakshmi Nilaya, 11th A Cross, HN Layout,
                            Swimming Pool Extension, Malleshwaram, Bengaluru,
                            Karnataka – 560003.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-[#0b2447] text-white p-6 rounded-2xl shadow-xl mb-4 transition-all hover:scale-[1.02]"
                    >
                        <h3 className="text-lg font-semibold mb-2">Contact:</h3>
                        <a
                            href="tel:+919590150805"
                            className="text-[15px] hover:underline"
                        >
                            +91 95901 50805
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-[#0b2447] text-white p-6 rounded-2xl shadow-xl transition-all hover:scale-[1.02]"
                    >
                        <h3 className="text-lg font-semibold mb-2">Email:</h3>
                        <a
                            href="mailto:pavan@muthuandco.co.in"
                            className="text-[15px] hover:underline"
                        >
                            pavan@muthuandco.co.in
                        </a>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
