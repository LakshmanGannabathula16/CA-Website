import React, { useState } from "react";
import bgImage from "../assets/Ca5.jpg";

export default function AdminLogin() {
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [inputCaptcha, setInputCaptcha] = useState("");

    function generateCaptcha() {
        return Math.random().toString(36).substring(2, 7);
    }

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setInputCaptcha("");
    };

    return (
        <div
            className="h-screen w-full flex items-center justify-end bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <div className="
                w-full max-w-md 
                mr-20
                bg-white/30
                backdrop-blur-xl 
                shadow-2xl 
                rounded-2xl 
                p-10 
                border border-white/30
            ">

                <h2 className="text-4xl font-bold text-gray-900 text-center mb-2 drop-shadow-md">
                    Admin Login
                </h2>

                <p className="text-center text-gray-800 mb-8 text-sm font-medium drop-shadow">
                    Secure access to admin portal
                </p>
                <div className="mb-6">
                    <label className="text-gray-900 font-semibold text-sm">Username</label>
                    <input
                        type="text"
                        className="w-full border border-gray-400/60 rounded-lg px-4 py-3 mt-2 bg-white/60 focus:bg-white/80 focus:border-gray-600 transition"
                        placeholder="Enter Username"
                    />
                </div>
                <div className="mb-6">
                    <label className="text-gray-900 font-semibold text-sm">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-400/60 rounded-lg px-4 py-3 mt-2 bg-white/60 focus:bg-white/80 focus:border-gray-600 transition"
                        placeholder="Enter Password"
                    />
                </div>
                <div className="mb-6">
                    <label className="text-gray-900 font-semibold text-sm">Captcha</label>

                    <div className="flex items-center gap-3 mt-2">
                        <input
                            type="text"
                            value={captcha}
                            disabled
                            className="w-32 text-center bg-gray-200/80 border border-gray-400 rounded-lg py-3 font-semibold tracking-wider"
                        />

                        <button
                            onClick={refreshCaptcha}
                            className="text-xl text-gray-700 hover:text-black"
                        >
                            🔄
                        </button>
                    </div>

                    <input
                        type="text"
                        value={inputCaptcha}
                        onChange={(e) => setInputCaptcha(e.target.value)}
                        placeholder="Enter Captcha"
                        className="w-full border border-gray-400/60 rounded-lg px-4 py-3 mt-3 bg-white/60 focus:bg-white/80 focus:border-gray-600 transition"
                    />
                </div>

                <button className="w-full bg-blue-800/90 hover:bg-blue-900 text-white py-3 text-lg rounded-lg shadow-lg transition">
                    Log In
                </button>
            </div>

        </div>
    );
}
