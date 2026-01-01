import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/charted.jpeg";

export default function Hero() {

    const fullName = "Pavan Kalyan & Associates";
    const fullTitle = "Chartered Accountants";

    const [nameText, setNameText] = useState("");
    const [titleText, setTitleText] = useState("");

    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const typeSpeed = isDeleting ? 70 : 120;

        const type = () => {
            setNameText(fullName.substring(0, index));
            setTitleText(fullTitle.substring(0, index));

            if (!isDeleting && index < fullName.length) {
                setIndex(index + 1);
            }
            else if (!isDeleting && index === fullName.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            }
            else if (isDeleting && index > 0) {
                setIndex(index - 1);
            }
            else if (isDeleting && index === 0) {
                setIsDeleting(false);
            }
        };

        const timer = setTimeout(type, typeSpeed);
        return () => clearTimeout(timer);
    }, [index, isDeleting]);


    return (
        <section id="hero" className="relative">


            <div
                className="h-[90vh] w-full bg-no-repeat bg-center bg-cover md:bg-[center_top] relative"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    objectFit: "cover"
                }}
            >

                <div className="absolute inset-0 bg-black/45"></div>


                <div className="absolute inset-0 flex items-center px-6 container mx-auto">
                    <div className="max-w-3xl">


                        <h1 className="text-4xl sm:text-5xl font-bold text-white ">
                            {nameText}
                        </h1>


                        <p className="text-xl text-white mt-3 ">
                            {titleText}
                        </p>


                        <div className="flex gap-6 mt-8">
                            <a
                                href="/about"
                                className="px-6 py-2 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition duration-300"
                            >
                                About
                            </a>

                            <a
                                href="/contact"
                                className="px-6 py-2 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition duration-300"
                            >
                                Contact Us
                            </a>
                        </div>

                    </div>
                </div>
            </div>


            <div className="-mt-4">
                <div className="h-4 bg-white"></div>
            </div>

        </section>
    );
}
