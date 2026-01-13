import { Outlet, NavLink } from "react-router-dom";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container.jsx";
import Glow from "./Glow.jsx";

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
                    isActive ? "text-white" : "text-white/70 hover:text-white",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}

export default function Layout() {
    const [open, setOpen] = useState(false);

    const socials = useMemo(
        () => [
            { label: "GitHub", href: "https://github.com/" },
            { label: "LinkedIn", href: "https://linkedin.com/" },
            { label: "X", href: "https://x.com/" },
        ],
        []
    );

    return (
        <div className="relative min-h-screen bg-zinc-950">
            <Glow />

            <header className="relative z-20 border-b border-white/10 bg-black/20 backdrop-blur">
                <Container className="flex h-16 items-center justify-between">
                    <NavLink to="/" className="font-semibold tracking-tight">
                        <span className="text-white">Krish Patel</span>
                    </NavLink>

                    <nav className="hidden items-center gap-6 sm:flex">
                        {nav.map((n) => (
                            <NavItem key={n.to} to={n.to}>
                                {n.label}
                            </NavItem>
                        ))}
                    </nav>

                    <div className="hidden sm:flex items-center gap-3">
                        <a
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/20 transition"
                            href="/contact"
                        >
                            Message me
                        </a>
                    </div>

                    <button
                        className="sm:hidden rounded-xl border border-white/10 bg-white/5 p-2 text-white/80"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </Container>

                {open && (
                    <div className="sm:hidden border-t border-white/10 bg-black/40 backdrop-blur">
                        <Container className="py-4 flex flex-col gap-3">
                            {nav.map((n) => (
                                <NavItem key={n.to} to={n.to} onClick={() => setOpen(false)}>
                                    {n.label}
                                </NavItem>
                            ))}
                            <div className="pt-3 border-t border-white/10 flex gap-3 text-sm">
                                {socials.map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white">
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </Container>
                    </div>
                )}
            </header>

            <main className="relative z-10">
                <Outlet />
            </main>

            <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur">
                <Container className="py-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm text-white/70">Links</div>
                            <div className="mt-2 flex flex-wrap gap-4">
                                {nav.map((n) => (
                                    <NavLink key={n.to} to={n.to} className="text-sm text-white/70 hover:text-white">
                                        {n.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-white/70">Socials</div>
                            <div className="mt-2 flex flex-wrap gap-4">
                                {socials.map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-white">
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-xs text-white/50">
                        © {new Date().getFullYear()} YourName. Built with React.
                    </div>
                </Container>
            </footer>
        </div>
    );
}
