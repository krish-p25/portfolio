import Container from "../components/Container.jsx";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Stat({ value, label }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-2xl font-semibold">{value}</div>
            <div className="mt-1 text-sm text-white/70">{label}</div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="relative">
            <Container className="pt-14 pb-16 sm:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className=" w-full"
                >
                    <div className="text-sm text-white/70">
                        Welcome to <span className="text-white">Krish</span>&apos;s Portfolio
                    </div>

                    <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight">
                        I’m <span className="text-white">Krish</span>
                    </h1>

                    <p className="mt-5 text-base sm:text-lg text-white/70 leading-7 w-full">
                        A passionate full-stack developer with creative thinking. I craft sleek UIs and build
                        revenue-impacting, clean, scalable, and impactful.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            to="/projects"
                            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm hover:bg-white/15 transition"
                        >
                            My Projects
                        </Link>
                        <Link
                            to="/about"
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
                        >
                            About Me
                        </Link>
                    </div>
                </motion.div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Stat value="£10,000,000+" label="Revenue Generated from solo projects" />
                    <Stat value="4" label="Businesses Scaled and Managed" />
                    <Stat value="3+" label="Years Crafting Solutions" />
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <div className="text-sm text-white/70">Focusing on the best</div>
                        <h2 className="mt-2 text-2xl font-semibold">Multiple Tech Stack</h2>
                        <p className="mt-3 text-sm text-white/70 leading-6">
                            I work across modern frameworks, backend systems, and cloud tooling to ship scalable, stable products.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {["React", "Node.js", "PostgreSQL", "AWS", "CSS3", "Express", "Tailwind CSS", "Vite", "HTML5", "Electron", "Git", "GitHub", "JavaScript ES6", "Atlas MongoDB", "+ 3rd Party Integrations"].map((t) => (
                                <span key={t} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-2xl font-semibold">Open to collaborations</h2>
                        <p className="mt-3 text-sm text-white/70 leading-6">
                            Whether it’s a small feature or your next big SaaS, I’m happy to jump in and help you ship.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/contact"
                                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm hover:bg-white/15 transition"
                            >
                                Contact me
                            </Link>
                            <a
                                href="https://cal.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
                            >
                                Book a meeting
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
