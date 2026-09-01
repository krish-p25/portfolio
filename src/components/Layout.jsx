import { Outlet, NavLink } from "react-router-dom";
import { useMemo, useState, useEffect, useCallback } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Container from "./Container.jsx";
import CloudFieldBackground from "./CloudFieldBackground.jsx";
import Glow from "./Glow.jsx";
import LoadingScreen from "./LoadingScreen.jsx";

const nav = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
];

function NavItem({ to, children, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                [
                    "text-sm transition",
                    isActive ? "text-primary" : "text-muted hover:text-primary",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}

export default function Layout() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [bgReady, setBgReady] = useState(false);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    const isLoading = !bgReady || !minTimeElapsed;

    useEffect(() => {
        const timer = setTimeout(() => setMinTimeElapsed(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleBgReady = useCallback(() => setBgReady(true), []);

    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "dark";
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) return storedTheme;
        const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    });

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const socials = useMemo(
        () => [
            { label: "GitHub", href: "https://github.com/krish-p25" },
        ],
        []
    );

    return (
        <div className="relative min-h-screen bg-app flex flex-col">
            <LoadingScreen isLoading={isLoading} />
            <CloudFieldBackground onReady={handleBgReady} />
            <Glow />

            <header className={`sticky z-20 border-b border-subtle bg-glass backdrop-blur transition-all duration-300 relative ${
                isScrolled 
                    ? open
                        ? "top-4 mx-8 sm:mx-12 rounded-t-2xl rounded-b-none border shadow-lg shadow-black/20"
                        : "top-4 mx-8 sm:mx-12 rounded-2xl border shadow-lg shadow-black/20" 
                    : "top-0 mx-0 rounded-none"
            }`}>
                <Container className={`flex h-16 items-center justify-between transition-all duration-300 ${
                    isScrolled ? "px-6" : ""
                }`}>
                    <div className="flex items-center gap-3">
                        <NavLink to="/" className="font-semibold tracking-tight text-primary">
                            Krish Patel
                        </NavLink>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="rounded-xl border border-subtle bg-surface px-2.5 py-1.5 text-muted-strong hover:text-primary hover:border-strong transition cursor-pointer"
                            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                    </div>

                    <nav className="hidden items-center gap-6 sm:flex">
                        {nav.map((n) => (
                            <NavItem key={n.to} to={n.to}>
                                {n.label}
                            </NavItem>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3">
                        <a
                            className="rounded-xl border border-subtle bg-surface px-3 py-1.5 text-sm text-muted hover:text-primary hover:border-strong transition"
                            
                        >
                            Message Me
                        </a>
                    </div>

                    <button
                        className="sm:hidden rounded-xl border border-subtle bg-surface p-2 text-muted-strong"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle Menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </Container>

                {open && (
                    <div className={`sm:hidden absolute left-0 right-0 top-full border-t border-subtle bg-app transition-all duration-300 ${
                        isScrolled ? "rounded-b-2xl" : ""
                    }`}>
                        <Container className={`py-4 flex flex-col gap-3 transition-all duration-300 ${
                            isScrolled ? "px-6" : ""
                        }`}>
                            {nav.map((n) => (
                                <NavItem key={n.to} to={n.to} onClick={() => setOpen(false)}>
                                    {n.label}
                                </NavItem>
                            ))}
                            <div className="pt-3 border-t border-subtle flex gap-3 text-sm">
                                {socials.map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-muted hover:text-primary">
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </Container>
                    </div>
                )}
            </header>

            <main className="relative z-10 flex-1">
                <Outlet />
            </main>

            <footer className="relative z-10 border-t border-subtle bg-glass backdrop-blur">
                <Container className="py-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mt-2 flex flex-wrap gap-4">
                                {nav.map((n) => (
                                    <NavLink key={n.to} to={n.to} className="text-sm text-muted hover:text-primary">
                                        {n.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="mt-2 flex flex-wrap gap-4">
                                {socials.map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-primary">
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-xs text-faint">
                        © {new Date().getFullYear()} Krish Patel. Built with React.
                    </div>
                </Container>
            </footer>
        </div>
    );
}
