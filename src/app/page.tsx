"use client";

import { useState } from "react";
import StepLayout from "@/components/StepLayout";
import { useLanguage } from "@/lib/context/LanguageContext";
import type { TranslationKey } from "@/lib/i18n";

export default function ReferralPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const RECRUITMENT_URL = process.env.NEXT_PUBLIC_RECRUITMENT_URL ?? "https://jobs.kytchens.com";

  const referralUrl = `${RECRUITMENT_URL}/?ref=${encodeURIComponent(name.trim())}${phone.trim() ? `&ref_phone=${encodeURIComponent(phone.trim())}` : ""}`;

  const isValidPhone = (p: string) => /^[6-9]\d{9}$/.test(p);

  const handleGenerate = () => {
    setShowCard(true);
  };

  const shareViaWhatsApp = () => {
    const waText = encodeURIComponent(
      `Kytchens mein job ka mauka! Apply karo: ${referralUrl}`
    );
    const target = phone.trim() ? `91${phone.trim()}` : "";
    const url = `https://wa.me/${target}?text=${waText}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    setSharing(true);
    try {
      const response = await fetch("/hiring-banner.png");
      const blob = await response.blob();
      const file = new File([blob], "kytchens-hiring.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Kytchens Referral",
          text: `Kytchens mein job ka mauka! Apply karo: ${referralUrl}`,
        });
      } else {
        shareViaWhatsApp();
      }
    } catch {
      shareViaWhatsApp();
    } finally {
      setSharing(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <StepLayout showNext={false} showBack={false}>
      {!showCard ? (
        <div className="flex flex-col items-center text-center animate-fade-up">
          <h1 className="text-[28px] font-bold text-text tracking-tight leading-tight">
            {t("ref_hero_title")}
          </h1>
          <p className="text-[15px] text-text-secondary mt-2 leading-relaxed max-w-xs">
            {t("ref_hero_subtitle")}
          </p>

          {/* Bonus highlight */}
          <div className="w-full mt-4 modern-card p-3 text-center border-[1.5px] border-primary/15">
            <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wide">
              {t("ref_bonus_per_referral")}
            </p>
            <p className="text-[28px] font-bold text-primary mt-1 leading-tight">
              ₹2,000
            </p>
          </div>

          {/* How it works */}
          <div className="w-full mt-3 px-4 py-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15">
            <p className="text-[15px] font-bold text-primary mb-2">
              {t("ref_how_title")}
            </p>
            <div className="space-y-2">
              {([1, 2, 3] as const).map((n) => (
                <div key={n} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {n}
                  </span>
                  <p className="text-[12px] text-text-secondary leading-relaxed text-left">
                    {t(`ref_how_step_${n}` as TranslationKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="w-full mt-4 space-y-3">
            <div>
              <label htmlFor="ref-name" className="block text-[13px] font-medium text-text-secondary mb-1.5 text-left">
                {t("referral_name_label")}
              </label>
              <input
                id="ref-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("referral_name_placeholder")}
                className="w-full px-4 py-3 rounded-xl border-[1.5px] border-border bg-surface text-[15px] input-ring placeholder:text-muted"
              />
            </div>

            <div>
              <label htmlFor="ref-phone" className="block text-[13px] font-medium text-text-secondary mb-1.5 text-left">
                {t("referral_phone_label")}
              </label>
              <div className={`flex items-center rounded-xl border-[1.5px] bg-surface input-ring ${
                phoneError ? "border-error" : "border-border"
              }`}>
                <span className="pl-4 pr-2 py-3 text-[15px] text-muted select-none font-medium">+91</span>
                <input
                  id="ref-phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setPhoneError(false);
                  }}
                  placeholder={t("referral_phone_placeholder")}
                  className="flex-1 py-3 pr-4 text-[15px] bg-transparent focus:outline-none placeholder:text-muted"
                />
              </div>
              {phoneError && (
                <p className="mt-1 text-xs text-error font-medium">{t("invalid_phone")}</p>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleGenerate}
              className="w-full flex flex-col items-center justify-center px-4 py-4 rounded-xl btn-primary-gradient text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-bold text-[17px]">
                {t("referral_generate_btn")}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center animate-fade-up">
          <p className="text-[15px] text-text-secondary mb-4 font-medium">
            {t("referral_share_hint")}
          </p>

          {/* Referral link */}
          <div className="w-full mt-4 px-4 py-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15">
            <p className="text-[11px] text-text-secondary font-medium uppercase tracking-wider mb-1">
              {t("ref_your_link")}
            </p>
            <p className="text-[13px] text-primary font-medium break-all overflow-hidden leading-relaxed">
              {referralUrl}
            </p>
            <button
              onClick={copyLink}
              className="mt-2 text-[12px] font-semibold text-primary underline underline-offset-2"
            >
              {copied ? t("ref_copied") : t("ref_copy_link")}
            </button>
          </div>

          {/* WhatsApp — primary action on mobile */}
          <a
            href={`https://wa.me/${phone.trim() ? `91${phone.trim()}` : ""}?text=${encodeURIComponent(`Kytchens mein job ka mauka! Apply karo: ${referralUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-4 rounded-xl btn-primary-gradient text-white no-underline"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="font-bold text-[15px]">
              {t("ref_whatsapp_btn")}
            </span>
          </a>

          {/* Share via other apps */}
          <button
            onClick={handleShare}
            disabled={sharing}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-4 rounded-xl border-[1.5px] border-primary text-primary hover:bg-primary/5 transition-colors disabled:opacity-70"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
            <span className="font-bold text-[15px]">
              {sharing ? "..." : t("referral_share_btn")}
            </span>
          </button>

        </div>
      )}
    </StepLayout>
  );
}
