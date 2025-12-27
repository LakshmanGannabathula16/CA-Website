import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";

export default function Careers() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        gender: "",
        dob: null,
        position: "",
        qualification: "",
        lastCompany: "",
        experienceYear: "",
        experienceMonth: "",
        portfolio: "",
        comments: "",
        resume: null,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [step]);

    const update = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => {
            const copy = { ...prev };
            delete copy[field];
            return copy;
        });
    };

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 1024 * 1024) {
            setErrors((p) => ({ ...p, resume: "File must be less than 1 MB" }));
            update("resume", null);
            return;
        }
        update("resume", file);
    };

    const years = Array.from({ length: 31 }, (_, i) => String(i));
    const months = Array.from({ length: 12 }, (_, i) => String(i));

    const steps = [
        { id: 1, title: "Personal" },
        { id: 2, title: "Professional" },
        { id: 3, title: "Additional" },
        { id: 4, title: "Review" },
    ];

    const progressPercent = ((step - 1) / (steps.length - 1)) * 100;

    const validateStep = (s) => {
        const e = {};

        if (s === 1) {
            if (!formData.firstName.trim()) e.firstName = "Required";
            if (!formData.lastName.trim()) e.lastName = "Required";

            if (!formData.email.trim()) {
                e.email = "Required";
            } else {
                const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@(gmail\.(com|co\.in)|muthuandco\.co\.in)$/;

                if (!emailRegex.test(formData.email)) {
                    e.email = "Enter valid Gmail or Company email";
                }
            }

            if (!formData.mobile.trim()) e.mobile = "Required";
            else if (!/^\d{10}$/.test(formData.mobile))
                e.mobile = "Enter valid 10 digit mobile number";

            if (!formData.gender) e.gender = "Required";
            if (!formData.dob) e.dob = "Required";
        }

        if (s === 2) {
            if (!formData.position.trim()) e.position = "Required";
            if (!formData.qualification.trim()) e.qualification = "Required";
            if (!formData.experienceYear) e.experienceYear = "Required";
        }

        if (s === 3) {
            if (!formData.resume) e.resume = "Resume is required";
        }

        return e;
    };

    const next = () => {
        const e = validateStep(step);
        if (Object.keys(e).length) return setErrors(e);
        setStep((p) => p + 1);
    };

    const prev = () => setStep((p) => Math.max(1, p - 1));

    const formatDateDDMMYYYY = (d) => {
        if (!d) return "—";
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yyyy = d.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    const handleSubmit = async () => {
        const e = {
            ...validateStep(1),
            ...validateStep(2),
            ...validateStep(3),
        };
        if (Object.keys(e).length) return setErrors(e);

        setLoading(true);
        setSubmitError("");

        try {
            const fd = new FormData();
            const fields = [
                "firstName",
                "lastName",
                "email",
                "mobile",
                "gender",
                "position",
                "qualification",
                "lastCompany",
                "experienceYear",
                "experienceMonth",
                "portfolio",
                "comments",
            ];

            fields.forEach((k) => fd.append(k, formData[k] ?? ""));
            fd.append("dob", formData.dob ? formatDateDDMMYYYY(formData.dob) : "");
            if (formData.resume) fd.append("resume", formData.resume);

            const res = await fetch("http://localhost:8000/api/apply/", {
                method: "POST",
                body: fd,
            });

            const data = await res.json();
            if (!data.ok) throw new Error(data.message || "Server error");

            setLoading(false);
            setShowSuccess(true);
            setStep(1);

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                gender: "",
                dob: null,
                position: "",
                qualification: "",
                lastCompany: "",
                experienceYear: "",
                experienceMonth: "",
                portfolio: "",
                comments: "",
                resume: null,
            });

            setTimeout(() => setShowSuccess(false), 2500);
        } catch (err) {
            setLoading(false);
            setSubmitError(err.message || "Submission failed");
        }
    };

    return (
        <section className="min-h-screen bg-gray-100 py-14">
            <div className="max-w-7xl mx-auto px-4 text-center mb-10">
                <div className="py-12 bg-gradient-to-r from-[#0A1A44] to-[#1E3A8A] text-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold">Begin Your Journey Toward Professional Excellence</h1>
                    <p className="mt-3 text-gray-200">Join our CA firm — ethics, mentorship & growth.</p>
                </div>
            </div>

            <div className={`max-w-7xl mx-auto px-4 ${step === 4 ? "grid grid-cols-1" : "grid grid-cols-1 md:grid-cols-2 gap-10"}`}>
                {step !== 4 && (
                    <aside className="bg-white rounded-2xl shadow-xl border">
                        <div className="bg-[#0A1A44] px-6 py-5 text-white rounded-t-2xl">
                            <h2 className="text-2xl font-bold">Why Work With Us?</h2>
                        </div>
                        <div className="p-6 text-gray-700 text-[15.5px] font-medium space-y-3">
                            <p>➤ Ethical work culture</p>
                            <p>➤ Real auditing exposure</p>
                            <p>➤ Mentorship from CA experts</p>
                            <p>➤ Work with industry clients</p>
                        </div>
                    </aside>
                )}

                <main ref={formRef}>
                    <div className="bg-white rounded-2xl shadow-xl border">
                        <div className="px-6 py-5 bg-[#0A1A44] text-white rounded-t-2xl">
                            <h3 className="text-xl font-semibold">Application Form</h3>
                        </div>

                        <div className="p-8">
                            <div className="mb-6">
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div className="h-full bg-[#0A1A44] rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
                                </div>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>


                                {step === 1 && (
                                    <>
                                        <h3 className="font-semibold text-gray-800 mb-3"> PERSONAL DETAILS</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                            <FloatingInput
                                                label="First Name"
                                                value={formData.firstName}
                                                onChange={(v) => update("firstName", v)}
                                                error={errors.firstName}
                                            />

                                            <FloatingInput
                                                label="Last Name"
                                                value={formData.lastName}
                                                onChange={(v) => update("lastName", v)}
                                                error={errors.lastName}
                                            />

                                            <FloatingInput
                                                label="Email"
                                                value={formData.email}
                                                onChange={(v) => {
                                                    if (!v.includes(" ")) {
                                                        update("email", v);

                                                        const emailRegex =
                                                            /^[a-zA-Z0-9._%+-]+@(gmail\.(com|co\.in)|muthuandco\.co\.in)$/;

                                                        if (v.length > 0 && !emailRegex.test(v)) {
                                                            setErrors((prev) => ({
                                                                ...prev,
                                                                email: "Enter valid Gmail or Company email",
                                                            }));
                                                        } else if (emailRegex.test(v)) {
                                                            setErrors((prev) => {
                                                                const copy = { ...prev };
                                                                delete copy.email;
                                                                return copy;
                                                            });
                                                        }
                                                    }
                                                }}
                                                error={errors.email}
                                            />




                                            <FloatingInput
                                                label="Mobile No"
                                                value={formData.mobile}
                                                onChange={(v) => {

                                                    const digits = v.replace(/\D/g, "");
                                                    const final = digits.slice(-10);

                                                    update("mobile", final);

                                                    if (final.length > 0 && final.length < 10) {
                                                        setErrors((prev) => ({ ...prev, mobile: "Invalid mobile number" }));
                                                    } else if (final.length === 10) {
                                                        setErrors((prev) => {
                                                            const copy = { ...prev };
                                                            delete copy.mobile;
                                                            return copy;
                                                        });
                                                    }
                                                }}
                                                error={errors.mobile}
                                            />

                                            <GenderSelect
                                                label="Gender"
                                                value={formData.gender}
                                                onChange={(v) => update("gender", v)}
                                                error={errors.gender}
                                            />

                                            <DOBPicker
                                                label="Date of Birth"
                                                value={formData.dob}
                                                onChange={(d) => update("dob", d)}
                                                error={errors.dob}
                                            />
                                        </div>
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <h3 className="font-semibold text-gray-800 mb-3">💼 PROFESSIONAL DETAILS</h3>

                                        <FloatingInput
                                            label="Position"
                                            value={formData.position}
                                            onChange={(v) => update("position", v)}
                                            error={errors.position}
                                        />

                                        <FloatingInput
                                            label="Highest Qualification"
                                            value={formData.qualification}
                                            onChange={(v) => update("qualification", v)}
                                            error={errors.qualification}
                                        />

                                        <FloatingInput
                                            label="Last Company"
                                            value={formData.lastCompany}
                                            onChange={(v) => update("lastCompany", v)}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FloatingSelect
                                                label="Experience (Years)"
                                                value={formData.experienceYear}
                                                onChange={(v) => update("experienceYear", v)}
                                                options={years}
                                            />
                                            <FloatingSelect
                                                label="Experience (Months)"
                                                value={formData.experienceMonth}
                                                onChange={(v) => update("experienceMonth", v)}
                                                options={months}
                                            />
                                        </div>
                                    </>
                                )}

                                {step === 3 && (
                                    <>
                                        <h3 className="font-semibold text-gray-800 mb-3">📝 ADDITIONAL DETAILS</h3>

                                        <FloatingInput
                                            label="Portfolio Website (http://)"
                                            value={formData.portfolio}
                                            onChange={(v) => update("portfolio", v)}
                                        />

                                        <FloatingTextarea
                                            label="Comments / Questions"
                                            value={formData.comments}
                                            onChange={(v) => update("comments", v)}
                                            error={errors.comments}
                                        />

                                        <div>
                                            <label className="flex items-center gap-2 px-4 py-2 border border-[#0A1A44] rounded-md cursor-pointer text-[#0A1A44] hover:bg-[#0A1A44] hover:text-white transition">
                                                Upload Resume (Max 1 MB)
                                                <input type="file" accept="application/pdf" className="hidden" onChange={handleFile} />
                                            </label>

                                            {formData.resume ? (
                                                <div className="flex items-center mt-2 bg-gray-100 px-3 py-2 rounded-md border">
                                                    <span className="truncate max-w-[200px]">{formData.resume.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            update("resume", null);
                                                        }}
                                                        className="ml-3 text-red-600 hover:text-red-700"
                                                        title="Remove file"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 13a2 2 0 01-2 2H7a2 2 0 01-2-2L4 7zm5-3h6a1 1 0 011 1v2H8V5a1 1 0 011-1z"
                                                            />
                                                        </svg>
                                                    </button>




                                                </div>
                                            ) : (
                                                <p className="text-gray-600 mt-1">No file selected</p>
                                            )}

                                            {errors.resume && <p className="text-red-600 text-xs">{errors.resume}</p>}
                                        </div>
                                    </>
                                )}
                                {step === 4 && (
                                    <div className="py-4 max-w-3xl mx-auto">


                                        <div className="text-center mb-6">
                                            <h2 className="text-xl font-bold text-[#0A1A44]">
                                                Review Your Application
                                            </h2>

                                            <p className="mt-1 text-gray-500 text-sm">
                                                Confirm all details before submitting.
                                            </p>
                                        </div>

                                        {[
                                            {
                                                icon: "👤",
                                                title: "Personal Details",
                                                rows: [
                                                    ["First Name", formData.firstName],
                                                    ["Last Name", formData.lastName],
                                                    ["Email", formData.email],
                                                    ["Mobile No", formData.mobile],
                                                    ["Gender", formData.gender],
                                                    ["Date of Birth", formData.dob ? formatDateDDMMYYYY(formData.dob) : "—"],
                                                ],
                                            },
                                            {
                                                icon: "💼",
                                                title: "Professional Details",
                                                rows: [
                                                    ["Position", formData.position],
                                                    ["Qualification", formData.qualification],
                                                    ["Last Company", formData.lastCompany],
                                                    [
                                                        "Experience",
                                                        `${formData.experienceYear || 0} yrs ${formData.experienceMonth || 0} months`,
                                                    ],
                                                ],
                                            },
                                            {
                                                icon: "📝",
                                                title: "Additional Details",
                                                rows: [
                                                    ["Portfolio", formData.portfolio || "—"],
                                                    ["Resume", formData.resume?.name || "—"],
                                                    ["Comments", formData.comments || "—"],
                                                ],
                                            },
                                        ].map((sec, i) => (
                                            <div key={i} className="border border-gray-400 rounded-md mb-5 bg-white">
                                                <div className="px-3 py-2 border-b border-gray-500 bg-gray-100 flex items-center gap-2">
                                                    <span className="text-sm">{sec.icon}</span>
                                                    <h3 className="text-sm font-semibold text-gray-700">{sec.title}</h3>
                                                </div>
                                                <div className="divide-y divide-gray-300">
                                                    {sec.rows.map(([label, value]) => (
                                                        <div
                                                            key={label}
                                                            className="group flex justify-between px-3 py-2 text-[14px] transition-all rounded hover:bg-[#0A1A44]"
                                                        >
                                                            <span className="text-gray-700 font-semibold group-hover:text-white">
                                                                {label}
                                                            </span>

                                                            <span className="text-[#0A1A44] font-bold group-hover:text-white">
                                                                {value || "—"}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center mt-6 w-full">
                                            <button
                                                type="button"
                                                onClick={() => setStep(3)}
                                                className="px-4 py-2 bg-[#0A1A44] text-white text-sm rounded-md hover:bg-[#081433] transition"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="px-4 py-2 bg-[#0A1A44] text-white text-sm rounded-md hover:bg-[#081433] transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="px-4 py-2 bg-[#0A1A44] text-white text-sm rounded-md hover:bg-[#081433] transition"
                                            >
                                                {loading ? "Submitting..." : "Submit Application"}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step !== 4 && (
                                    <div className="flex justify-between mt-4">
                                        <button
                                            disabled={step === 1}
                                            onClick={prev}
                                            className="px-6 py-2 bg-[#0A1A44] text-white rounded-md disabled:opacity-40"
                                        >
                                            Back
                                        </button>

                                        {step < 4 ? (
                                            <button
                                                onClick={next}
                                                className="px-6 py-2 bg-[#0A1A44] text-white rounded-md"
                                            >
                                                Next
                                            </button>
                                        ) : null}
                                    </div>
                                )}

                                {submitError && <p className="text-red-600 mt-2">{submitError}</p>}
                            </form>
                        </div>
                    </div>
                </main>
            </div>

            {showSuccess && <SuccessPopup />}
        </section>
    );
}

function FloatingInput({ label, value, onChange, error }) {
    return (
        <div>
            <label className="font-semibold">{label}</label>
            <input
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full border-b-[2px] pb-2 pt-1 bg-transparent outline-none text-[15.5px]
                ${error
                        ? "border-red-600 text-red-600"
                        : "border-gray-600 focus:border-[#0A1A44]"
                    }`}
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}
        </div>
    );
}

function FloatingTextarea({ label, value, onChange, error }) {
    return (
        <div>
            <label className="font-semibold">{label}</label>
            <textarea
                rows="4"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full border-b-[2px] pb-2 pt-1 outline-none bg-transparent text-[15.5px] resize-none
                ${error ? "border-red-600 text-red-600" : "border-gray-600 focus:border-[#0A1A44]"}`}
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}
        </div>
    );
}

function FloatingSelect({ label, value, onChange, options }) {
    return (
        <div>
            <label className="font-semibold">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border-b-[2px] pb-2 pt-1 outline-none bg-transparent text-[15.5px] border-gray-600 focus:border-[#0A1A44]"
            >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

function GenderSelect({ label, value, onChange, error }) {
    const options = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
    ];

    return (
        <div>
            <label className="font-semibold">{label}</label>
            <Select
                value={value ? { value, label: value } : null}
                onChange={(opt) => onChange(opt?.value ?? "")}
                options={options}
                className="mt-1"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderWidth: "2px",
                        borderColor: error ? "red" : "#4b5563",
                        boxShadow: "none",
                        padding: "2px",
                        "&:hover": { borderColor: "#0A1A44" },
                    }),
                }}
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}
        </div>
    );
}

function DOBPicker({ label, value, onChange, error }) {
    return (
        <div>
            <label className="font-semibold">{label}</label>
            <div className="mt-1">
                <DatePicker
                    value={value}
                    onChange={onChange}
                    format="dd-MM-yyyy"
                    clearIcon={null}
                    calendarIcon={<span className="text-gray-700">📅</span>}
                    className="w-full border-[2px] border-[#0A1A44] rounded-md px-2 py-1"
                />
            </div>
            {error && <p className="text-red-600 text-xs">{error}</p>}
        </div>
    );
}

function ReviewRow({ label, value }) {
    return (
        <div className="flex justify-between border-b border-dashed py-2">
            <span className="text-gray-600">{label}</span>
            <span className="text-gray-900 font-bold">{value || "—"}</span>
        </div>
    );
}

function SuccessPopup() {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                <p className="text-2xl font-semibold text-green-600">✔ Application Submitted</p>
                <p className="mt-2 text-gray-700">Our HR team will contact you soon.</p>
            </div>
        </div>
    );
}
