"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Languages, DollarSign, PoundSterling } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const { setTheme } = useTheme()
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [currency, setCurrency] = useState<"USD" | "LL">("USD")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
    document.documentElement.dir = language === "en" ? "rtl" : "ltr"
  }

  const toggleCurrency = () => {
    setCurrency(currency === "USD" ? "LL" : "USD")
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
          <Languages className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={toggleCurrency} aria-label="Toggle currency">
          {currency === "USD" ? <DollarSign className="h-5 w-5" /> : <PoundSterling className="h-5 w-5" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Toggle theme">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
