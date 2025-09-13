import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { Outlet } from "react-router"

export default function DarkModeLayout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="top-4 right-4 fixed z-50">
                <ModeToggle />
            </div>
            <Outlet />
        </ThemeProvider>
    )
}