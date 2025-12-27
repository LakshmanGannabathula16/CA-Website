import React from "react";

export default function ServiceLayout({ title, children }) {
    return (
        <section className="pt-32 pb-16 container mx-auto px-6 max-w-5xl">


            <h1 className="text-xl font-extrabold text-gray-900 mb-2 tracking-wide">
                {title}
            </h1>


            <hr className="border-t border-gray-300 mb-4" />

            <div className="text-gray-700 leading-relaxed">
                {children}
            </div>
        </section>
    );
}
