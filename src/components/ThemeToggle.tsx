"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Laptop } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)  return null

  return (
    <ToggleGroup type="single" value={theme} onValueChange={setTheme}>
      <ToggleGroupItem value="light" aria-label="Toggle bold">
        <Sun className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="Toggle italic">
        <Laptop className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Toggle strikethrough">
        <Moon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
