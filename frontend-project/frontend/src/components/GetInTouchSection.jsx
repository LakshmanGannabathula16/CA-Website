import React, { useState } from "react";
import getInTouchImg from "../assets/getintouch3.png";

export default function GetInTouchSection() {
    const [form, setForm] = useState({
        name: "",
        number: "",
        email: "",
        city: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [formMessage, setFormMessage] = useState("");
    const [formStatus, setFormStatus] = useState("");

    const [fieldError, setFieldError] = useState({});

    const update = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setFieldError((prev) => ({ ...prev, [field]: false }));
        setFormMessage("");
    };


    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const isValidPhone = (phone) =>
        /^[6-9]\d{9}$/.test(phone);

    const handleSubmit = async () => {
        let errors = {};
        setFormMessage("");
        setFormStatus("");


        Object.keys(form).forEach((key) => {
            if (!form[key].trim()) errors[key] = true;
        });


        if (form.email && !isValidEmail(form.email)) {
            errors.email = true;
            setFormMessage("❌ Please enter a valid email address.");
            setFormStatus("error");
        }


        if (form.number && !isValidPhone(form.number)) {
            errors.number = true;
            setFormMessage("❌ Please enter a valid 10-digit mobile number.");
            setFormStatus("error");
        }

        if (Object.keys(errors).length > 0) {
            setFieldError(errors);

            if (!formMessage) {
                setFormMessage("❌ Please fill all required fields correctly.");
                setFormStatus("error");
            }
            return;
        }

        setLoading(true);

        try {
            const fd = new FormData();
            fd.append("formType", "contact");
            fd.append("name", form.name);
            fd.append("number", form.number);
            fd.append("email", form.email);
            fd.append("city", form.city);
            fd.append("message", form.message);

            const res = await fetch(
                "https://ca-website-qj5u.onrender.com/api/apply/",
                {
                    method: "POST",
                    body: fd,
                }
            );

            const data = await res.json();

            if (!data.ok) throw new Error(data.message || "Submission failed");

            setFormStatus("success");
            setFormMessage("✅ Message sent successfully!");

            setForm({
                name: "",
                number: "",
                email: "",
                city: "",
                message: "",
            });

            setFieldError({});

            setTimeout(() => {
                setFormMessage("");
                setFormStatus("");
            }, 3000);

        } catch (err) {
            setFormStatus("error");
            setFormMessage(err.message || "❌ Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-10 bg-white">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-[#1e3a8a]">GET IN TOUCH</h2>
                <div className="w-20 h-1 bg-[#1e3a8a] mx-auto mt-3 rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="bg-white rounded-xl shadow-lg border border-gray-300 grid md:grid-cols-2 overflow-hidden">


                    <div className="w-full h-[340px]">
                        <img
                            src={getInTouchImg}
                            alt="Get In Touch"
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div className="w-full p-6">


                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                className={`border rounded-md px-4 py-3 w-full 
                  ${fieldError.name ? "border-red-500" : "border-gray-400"}`}
                            />

                            <input
                                type="text"
                                placeholder="Your Number"
                                value={form.number}
                                onChange={(e) => update("number", e.target.value)}
                                className={`border rounded-md px-4 py-3 w-full 
                  ${fieldError.number ? "border-red-500" : "border-gray-400"}`}
                            />
                        </div>


                        <input
                            type="email"
                            placeholder="Your Email ID"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={`border rounded-md px-4 py-3 w-full mt-4 
                ${fieldError.email ? "border-red-500" : "border-gray-400"}`}
                        />

                        <input
                            type="text"
                            placeholder="City"
                            value={form.city}
                            onChange={(e) => update("city", e.target.value)}
                            className={`border rounded-md px-4 py-3 w-full mt-4 
                ${fieldError.city ? "border-red-500" : "border-gray-400"}`}
                        />

                        <textarea
                            placeholder="Type Your Message..."
                            rows="4"
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            className={`border rounded-md px-4 py-3 w-full mt-4 resize-none 
                ${fieldError.message ? "border-red-500" : "border-gray-400"}`}
                        ></textarea>


                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full mt-5 bg-[#1e3a8a] text-white font-semibold py-2 text-[14px] rounded-lg shadow-md hover:bg-[#ff5670] transition disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>


                        {formMessage && (
                            <p
                                className={`text-center mt-3 text-sm font-semibold 
                  ${formStatus === "success" ? "text-green-600" : "text-red-600"}`}
                            >
                                {formMessage}
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}
