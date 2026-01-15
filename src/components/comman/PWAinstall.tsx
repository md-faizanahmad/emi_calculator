"use client";

import React, { useEffect, useState } from "react";
import {
  Download,
  Zap,
  ShieldCheck,
  Smartphone,
  Monitor,
  ChevronRight,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaInstallSection() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      alert(
        "To install: Click the 'Install' icon in your browser address bar or 'Add to Home Screen' in your mobile menu."
      );
      return;
    }
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setInstallPrompt(null);
  };

  return (
    <section className="py-16 px-4 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Branding & Trust */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Zap size={14} fill="currentColor" /> Better Experience
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
              Install <span className="text-blue-600">EMI Mitra</span> as an App
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Enjoy a faster, full-screen experience without data sharing.
              Access your favorite calculators directly from your home screen
              anytime.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                <ShieldCheck size={16} className="text-green-500" /> 100%
                Privacy
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                <Zap size={16} className="text-orange-500" /> Offline Ready
              </div>
            </div>

            <button
              onClick={handleInstall}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200"
            >
              <Download size={20} className="group-hover:bounce" />
              DOWNLOAD APP NOW
            </button>
          </div>

          {/* Right Side: Responsive Guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuideCard
              icon={<Monitor className="text-blue-600" />}
              title="Desktop"
              steps={[
                "Click the Install icon in Address Bar",
                "Or Menu > Apps > Install",
              ]}
            />
            <GuideCard
              icon={<Smartphone className="text-purple-600" />}
              title="Mobile"
              steps={["Open Browser Menu (⋮ or ≡)", "Tap 'Add to Home Screen'"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function GuideCard({
  icon,
  title,
  steps,
}: {
  icon: React.ReactNode;
  title: string;
  steps: string[];
}) {
  return (
    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-3">{title} Instructions</h3>
      <ul className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
            <ChevronRight size={14} className="mt-1 text-blue-400 shrink-0" />
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
