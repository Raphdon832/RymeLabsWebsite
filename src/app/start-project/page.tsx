"use client";

import FadeIn from "@/components/FadeIn";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import PageShell from "@/components/PageShell";

export default function StartProjectPage() {
    const serviceOptions = useMemo(
        () => [
            "Web Application",
            "Mobile App",
            "Marketing Site",
            "E-commerce",
            "Custom Software",
            "Other",
        ],
        []
    );
    const budgetOptions = useMemo(
        () => ["< $10k", "$10k - $50k", "$50k - $100k", "$100k+"],
        []
    );
    const [step, setStep] = useState<number>(1);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        trigger,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<{
        serviceType: string;
        budget: string;
        name: string;
        email: string;
        details: string;
    }>({
        defaultValues: {
            serviceType: "",
            budget: "",
            name: "",
            email: "",
            details: "",
        },
    });

    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [feedback, setFeedback] = useState<string>("");
    const [lastSubmission, setLastSubmission] = useState<
        | {
              serviceType: string;
              budget: string;
              email: string;
          }
        | null
    >(null);

    const formValues = watch();
    const confirmationValues = lastSubmission ?? formValues;

    const nextDisabled =
        (step === 1 && !formValues.serviceType) ||
        (step === 2 && !formValues.budget);

    const advanceStep = async () => {
        if (step === 1) {
            const valid = await trigger("serviceType");
            if (!valid) return;
        }
        if (step === 2) {
            const valid = await trigger("budget");
            if (!valid) return;
        }
        setStep((current) => current + 1);
        setFeedback("");
    };

    const handleSelect = (field: "serviceType" | "budget", value: string) => {
        setValue(field, value, { shouldValidate: true });
        setFeedback("");
    };

    const onSubmit = async (data: {
        serviceType: string;
        budget: string;
        name: string;
        email: string;
        details: string;
    }) => {
        try {
            setStatus("idle");
            setFeedback("");
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const payload = await response.json();

            if (!response.ok) {
                setStatus("error");
                setFeedback(
                    payload?.errors
                        ? Object.values<string>(payload.errors).join(" · ")
                        : payload?.error || "Unable to submit your project right now."
                );
                return;
            }

            setStatus("success");
            setFeedback("We received your request. Expect a response within 24 hours.");
            setLastSubmission({
                serviceType: data.serviceType,
                budget: data.budget,
                email: data.email,
            });
            reset();
            setStep(1);
        } catch (error) {
            setStatus("error");
            setFeedback("Something went wrong. Please try again.");
        }
    };

        return (
                <PageShell containerClassName="max-w-3xl">
                        <div className="max-w-3xl mx-auto">
                                <FadeIn inView={false}>
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
              Start a Project
            </h1>
            <div className="flex items-center gap-4 mb-8">
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-white' : 'bg-white/10'}`} />
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-white' : 'bg-white/10'}`} />
             <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-white' : 'bg-white/10'}`} />
          </div>
        </div>
                                </FadeIn>

                                <FadeIn delay={0.2} inView={false}>
                    <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm min-h-[400px] flex flex-col justify-between">
                        {status === "success" ? (
                            <div className="space-y-6">
                                <p className="text-xs uppercase tracking-[0.4em] text-emerald-300/80">
                                    Intake received
                                </p>
                                <h2 className="text-3xl font-bold">
                                    We locked in your project brief.
                                </h2>
                                <p className="text-white/70 text-sm">
                                      The delivery team will review the request and reach out using {confirmationValues.email || "your email"}.
                                    Sit tight while we prepare a tailored response.
                                </p>
                                <div className="space-y-2 text-sm text-white/70">
                                      <p>Scope: {confirmationValues.serviceType}</p>
                                      <p>Budget: {confirmationValues.budget}</p>
                                </div>
                                <Link
                                    href="/dashboard/projects"
                                    className="inline-flex items-center gap-2 text-sm text-white underline"
                                >
                                    Peek at the pipeline
                                </Link>
                                <button
                                    onClick={() => {
                                        setStatus("idle");
                                        setFeedback("");
                                        setLastSubmission(null);
                                    }}
                                    className="text-sm text-white/70 hover:text-white underline"
                                >
                                    Submit another brief
                                </button>
                            </div>
                        ) : (
                            <>
                                {step === 1 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <input
                                            type="hidden"
                                            {...register("serviceType", {
                                                required: "Select what you want to build",
                                            })}
                                        />
                                        <h2 className="text-2xl font-bold">What are you looking to build?</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {serviceOptions.map((opt) => {
                                                const isActive = formValues.serviceType === opt;
                                                return (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => handleSelect("serviceType", opt)}
                                                        className={`p-4 rounded-xl border transition-all text-left font-medium ${
                                                            isActive
                                                                ? "bg-white text-black border-white"
                                                                : "border-white/10 hover:bg-white hover:text-black"
                                                        }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {errors.serviceType && (
                                            <p className="text-xs text-rose-300">{errors.serviceType.message}</p>
                                        )}
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <input
                                            type="hidden"
                                            {...register("budget", {
                                                required: "Select a budget range",
                                            })}
                                        />
                                        <h2 className="text-2xl font-bold">What is your estimated budget?</h2>
                                        <div className="grid grid-cols-1 gap-4">
                                            {budgetOptions.map((opt) => {
                                                const isActive = formValues.budget === opt;
                                                return (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => handleSelect("budget", opt)}
                                                        className={`p-4 rounded-xl border transition-all text-left font-medium ${
                                                            isActive
                                                                ? "bg-white text-black border-white"
                                                                : "border-white/10 hover:bg-white hover:text-black"
                                                        }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {errors.budget && (
                                            <p className="text-xs text-rose-300">{errors.budget.message}</p>
                                        )}
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <h2 className="text-2xl font-bold">Last details</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Your Name"
                                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50"
                                                    {...register("name", { required: "Name is required" })}
                                                />
                                                {errors.name && (
                                                    <p className="text-xs text-rose-300 mt-1">{errors.name.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <input
                                                    type="email"
                                                    placeholder="Your Email"
                                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: "Enter a valid email",
                                                        },
                                                    })}
                                                />
                                                {errors.email && (
                                                    <p className="text-xs text-rose-300 mt-1">{errors.email.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <textarea
                                                    placeholder="Anything else we should know?"
                                                    rows={4}
                                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-white/50"
                                                    {...register("details")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
                                    {step > 1 ? (
                                        <button
                                            onClick={() => {
                                                setStep((s) => s - 1);
                                                setFeedback("");
                                            }}
                                            className="text-zinc-400 hover:text-white transition-colors font-medium"
                                        >
                                            Back
                                        </button>
                                    ) : (
                                        <div></div>
                                    )}

                                    {step < 3 ? (
                                        <MagneticButton
                                            onClick={() => {
                                                if (nextDisabled) return;
                                                void advanceStep();
                                            }}
                                            className={`bg-white text-black px-8 py-3 rounded-full font-bold transition-colors ${
                                                nextDisabled ? "opacity-30 pointer-events-none" : "hover:bg-zinc-200"
                                            }`}
                                        >
                                            Next Step
                                        </MagneticButton>
                                    ) : (
                                        <MagneticButton
                                            onClick={handleSubmit(onSubmit)}
                                            className={`bg-white text-black px-8 py-3 rounded-full font-bold transition-colors ${
                                                isSubmitting
                                                    ? "opacity-50 cursor-progress"
                                                    : "hover:bg-zinc-200"
                                            }`}
                                        >
                                            {isSubmitting ? "Sending" : "Submit Request"}
                                        </MagneticButton>
                                    )}
                                </div>
                                {feedback && (
                                    <p
                                        className={`text-sm mt-4 ${
                                            status === "error" ? "text-rose-300" : "text-emerald-300"
                                        }`}
                                    >
                                        {feedback}
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                                </FadeIn>
                        </div>

                </PageShell>
  );
}
