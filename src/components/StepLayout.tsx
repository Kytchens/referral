"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/lib/context/LanguageContext";

interface StepLayoutProps {
  children: ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  progress?: number;
  stepText?: string;
}

export default function StepLayout({
  children,
  onNext,
  onBack,
  nextLabel,
  backLabel,
  showBack = false,
  showNext = true,
  nextDisabled = false,
  progress,
  stepText,
}: StepLayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      {/* Frosted glass header */}
      <header className="sticky top-0 z-10 glass-header border-b border-border/60 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.png" alt="Kytchens" width={32} height={32} className="h-8 w-auto transition-transform group-hover:scale-105" />
            <span className="text-[17px] font-bold text-text tracking-tight font-heading">
              Kytchens
            </span>
          </Link>
          <LanguageToggle />
        </div>
        {progress !== undefined && (
          <div className="max-w-lg mx-auto mt-3">
            {stepText && (
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted">{stepText}</p>
                <p className="text-xs font-semibold text-primary">{progress}%</p>
              </div>
            )}
            <div className="h-2 bg-border/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out progress-bar-gradient"
                style={{ width: `${Math.max(progress, 2)}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full animate-fade-up">
        {children}
      </main>

      {(showBack || showNext) && (
        <footer className="sticky bottom-0 glass-footer border-t border-border/60 px-4 py-3">
          <div className="max-w-lg mx-auto flex gap-3">
            {showBack && (
              <button
                onClick={onBack}
                className="flex-1 py-3.5 rounded-xl border-2 border-primary/80 text-primary font-semibold text-[15px] active:scale-[0.98] transition-all hover:bg-primary-light"
              >
                {backLabel ?? t("btn_back")}
              </button>
            )}
            {showNext && (
              <button
                onClick={onNext}
                disabled={nextDisabled}
                className={`flex-1 py-3.5 rounded-xl text-white font-semibold text-[15px] btn-primary-gradient transition-all ${nextDisabled ? "opacity-60 cursor-not-allowed" : "active:scale-[0.98]"}`}
              >
                {nextLabel ?? t("btn_next")}
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
