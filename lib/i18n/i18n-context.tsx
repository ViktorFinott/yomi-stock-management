"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { translations, localeNames, localeFlags, type Locale, type Translations } from "./translations"

interface I18nContextType {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
  availableLocales: Locale[]
  getLocaleName: (locale: Locale) => string
  getLocaleFlag: (locale: Locale) => string
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string
  formatCurrency: (amount: number, currency?: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const DEFAULT_LOCALE: Locale = "pt-BR"
const STORAGE_KEY = "yomi-locale"

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (savedLocale && translations[savedLocale]) {
      setLocaleState(savedLocale)
    } else {
      // Detect browser language
      const browserLang = navigator.language
      const matchedLocale = Object.keys(translations).find((l) => browserLang.startsWith(l.split("-")[0])) as
        | Locale
        | undefined
      if (matchedLocale) {
        setLocaleState(matchedLocale)
      }
    }
    setIsLoaded(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    if (translations[newLocale]) {
      setLocaleState(newLocale)
      localStorage.setItem(STORAGE_KEY, newLocale)
      document.documentElement.lang = newLocale
    }
  }, [])

  const formatDate = useCallback(
    (date: Date, options?: Intl.DateTimeFormatOptions) => {
      return new Intl.DateTimeFormat(locale, options).format(date)
    },
    [locale],
  )

  const formatNumber = useCallback(
    (num: number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(locale, options).format(num)
    },
    [locale],
  )

  const formatCurrency = useCallback(
    (amount: number, currency = "BRL") => {
      const currencyMap: Record<Locale, string> = {
        "pt-BR": "BRL",
        "en-US": "USD",
        "es-ES": "EUR",
        "fr-FR": "EUR",
        "de-DE": "EUR",
      }
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency || currencyMap[locale],
      }).format(amount)
    },
    [locale],
  )

  const getLocaleName = (loc: Locale) => localeNames[loc] || loc
  const getLocaleFlag = (loc: Locale) => localeFlags[loc] || ""

  if (!isLoaded) {
    return null
  }

  return (
    <I18nContext.Provider
      value={{
        locale,
        t: translations[locale],
        setLocale,
        availableLocales: Object.keys(translations) as Locale[],
        getLocaleName,
        getLocaleFlag,
        formatDate,
        formatNumber,
        formatCurrency,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
