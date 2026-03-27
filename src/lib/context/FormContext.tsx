"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { CandidateFormData } from "@/lib/types";

const STORAGE_KEY = "kytchens_form_data";

function loadFromStorage(): Partial<CandidateFormData> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: Partial<CandidateFormData>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — ignore
  }
}

interface FormContextValue {
  formData: Partial<CandidateFormData>;
  updateFormData: (updates: Partial<CandidateFormData>) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<CandidateFormData>>({});
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setFormData(loadFromStorage());
    setHydrated(true);
  }, []);

  const updateFormData = useCallback((updates: Partial<CandidateFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData({});
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Don't render children until hydrated to avoid flash of empty state
  if (!hydrated) return null;

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormData(): FormContextValue {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormData must be used within FormProvider");
  return ctx;
}
