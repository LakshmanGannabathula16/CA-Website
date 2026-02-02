import React, { useState, useEffect } from "react";

export default function Hero() {

    const images = [
        "/banner1.jpg",
        "/banner2.jpg",
        "/banner3.jpg",
        "/banner4.jpg",
        "/banner5.jpg",
    ];

    const fullName = "Pavan Kalyan & Associates";
    const fullTitle = "Chartered Accountants";

    const maxLength = Math.max(fullName.length, fullTitle.length);

    const [current, setCurrent] = useState(0);
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Slider
    useEffect(() => {
        const slider = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 8000);

        return () => clearInterval(slider);
    }, []);

    // SYNC typing both lines
    useEffect(() => {
        const speed = isDeleting ? 60 : 120;

        const timer = setTimeout(() => {
            if (!isDeleting && index < maxLength) {
                setIndex(index + 1);
            } else if (!isDeleting && index === maxLength) {
                setTimeout(() => setIsDeleting(true), 1200);
            } else if (isDeleting && index > 0) {
                setIndex(index - 1);
            } else if (isDeleting && index === 0) {
                setIsDeleting(false);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [index, isDeleting]);

    return (
        <section className="relative">

            <div className="h-[90vh] relative overflow-hidden">

                {/* Images */}
                {images.map((img, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-[4000ms] ease-in-out ${i === current
                                ? "opacity-100 scale-105"
                                : "opacity-0 scale-100"
                            }`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center px-12 z-20">
                    <div className="max-w-3xl">

                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            {fullName.substring(0, index)}
                        </h1>

                        <p className="text-xl text-gray-200 mt-3">
                            {fullTitle.substring(0, index)}
                        </p>

                        <div className="flex gap-6 mt-8">

                            <a
                                href="/about"
                                className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
                            >
                                About
                            </a>

                            <a
                                href="/contact"
                                className="px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
                            >
                                Contact Us
                            </a>

                        </div>

                    </div>
                </div>

            </div>

        </section>
    );
}
