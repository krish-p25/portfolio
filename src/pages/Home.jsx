import Container from "../components/Container.jsx";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { projects } from "../data/projects.js";
import { useEffect, useState } from "react";

function Stat({ value, label, delay = 0 }) {
    const [displayValue, setDisplayValue] = useState(0);
    
    // Extract numeric value from string (handles "£10,000,000+", "4", "3+", etc.)
    const getNumericValue = (val) => {
        const cleaned = val.replace(/[£,+\s]/g, '');
        return parseFloat(cleaned) || 0;
    };
    
    // Format the value back to original format
    const formatValue = (num, original) => {
        if (original.includes('£')) {
            return `£${num.toLocaleString()}+`;
        }
        if (original.includes('+')) {
            return `${Math.floor(num)}+`;
        }
        return Math.floor(num).toString();
    };
    
    const numericValue = getNumericValue(value);
    const duration = 2; // seconds
    
    useEffect(() => {
        const startTime = Date.now() + delay * 1000;
        
        const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            if (elapsed < 0) {
                requestAnimationFrame(animate);
                return;
            }
            
            const progress = Math.min(elapsed / duration, 1);
            // Easing function for smooth animation
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericValue * eased;
            
            setDisplayValue(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(numericValue);
            }
        };
        
        requestAnimationFrame(animate);
    }, [numericValue, delay]);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
            <div className="text-2xl font-semibold">{formatValue(displayValue, value)}</div>
            <div className="mt-1 text-sm text-white/70">{label}</div>
        </motion.div>
    );
}

export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
            },
        }),
    };

    const uniqueTags = [...new Set(projects.flatMap(project => project.tags))].sort();

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Container className="pt-14 pb-16 sm:pt-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full"
                >
                    <motion.div variants={itemVariants} className="text-sm text-white/70">
                        Welcome to <span className="text-white">Krish</span>&apos;s Portfolio
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight"
                    >
                        I'm <span className="text-white">Krish</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="mt-5 text-base sm:text-lg text-white/70 leading-7 w-full"
                    >
                        A passionate full-stack developer with creative thinking. I craft solutions and build
                        revenue-impacting, scalable, and impactful products.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="mt-7 flex flex-wrap gap-3"
                    >
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
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                    <Stat value="£10,000,000+" label="Revenue Generated from my projects" delay={0.5} />
                    <Stat value="4" label="Businesses Scaled and Managed" delay={0.6} />
                    <Stat value="3+" label="Years Crafting Solutions" delay={0.7} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                        <div className="text-sm text-white/70">Focusing on the best</div>
                        <h2 className="mt-2 text-2xl font-semibold">Multiple Tech Stack</h2>
                        <p className="mt-3 text-sm text-white/70 leading-6">
                            I work across modern frameworks, backend systems, and cloud tooling to ship scalable, stable products.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {uniqueTags.map((t, i) => (
                                <motion.span
                                    key={t}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={tagVariants}
                                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70"
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                        <h2 className="text-2xl font-semibold">Open to collaborations</h2>
                        <p className="mt-3 text-sm text-white/70 leading-6">
                            Whether it's a small feature or your next big SaaS, I'm happy to jump in and help you ship.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/contact"
                                className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm hover:bg-white/15 transition"
                            >
                                Contact me
                            </Link>
                            <a
                                href="https://cal.com/krish-p-hwfjhs"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
                            >
                                Book a meeting
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </motion.div>
    );
}
