import Container from "../components/Container.jsx";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function TimelineHeading() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-2xl font-semibold"
        >
            Timeline
        </motion.h2>
    );
}

function TimelineItem({ time, role, org, desc, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
            <div className="text-xs text-white/60">{time}</div>
            <div className="mt-2 text-base font-semibold">
                {role} <span className="text-white/60">· {org}</span>
            </div>
            <p className="mt-2 text-sm text-white/70 leading-6">{desc}</p>
        </motion.div>
    );
}

export default function About() {
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

    const coreStack = ["React", "NodeJS", "ExpressJS", "PostgreSQL", "AWS", "CloudFlare"];

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
                    className="max-w-3xl"
                >
                    <motion.div variants={itemVariants} className="text-sm text-white/70">
                        About me
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight"
                    >
                        I build products that move numbers.
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="mt-4 text-white/70 leading-7"
                    >
                        When crafting, I focus on performance and end product quality.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="mt-6 flex flex-wrap gap-3"
                    >
                        <a
                            className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm hover:bg-white/15 transition"
                            href="https://docs.google.com/document/d/12ylnVndoXySm5J00QHB1obrKkcNP46ALWHSVS0aoxsU/edit?usp=sharing"
                        >
                            My CV
                        </a>
                        <a
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/20 transition"
                            href="https://portfolio.krishrp.xyz/projects"
                        >
                            My Projects
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                        <div className="text-sm text-white/70">Core Stack</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {coreStack.map((x, i) => (
                                <motion.span
                                    key={x}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={tagVariants}
                                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70"
                                >
                                    {x}
                                </motion.span>
                            ))}
                        </div>

                        <p className="mt-4 text-sm text-white/70 leading-6">
                            I care about performance, reliability, and UX polish. If it's not crisp, it's not done.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                        <div className="text-sm text-white/70">Now</div>
                        <h2 className="mt-2 text-2xl font-semibold">Building + Iterating</h2>
                        <p className="mt-3 text-sm text-white/70 leading-6">
                            Currently focused on shipping B2B tools, improving conversion, and scaling infra without any drawbacks.
                        </p>
                    </motion.div>
                </motion.div>

                <TimelineHeading />
                <div className="mt-4 grid grid-cols-1 gap-4">
                    <TimelineItem
                        time="2024 — 2026"
                        role="Full-Stack Engineer"
                        org="Kensulate Corporation"
                        desc="Built a bespoke bulk dropshipping platform, automating inventory sync, order routing, and fulfilment workflows. Personalised commissions, pricing structure, sales reporting, and more, generates £30,000+ in sales monthly."
                        index={0}
                    />
                    <TimelineItem
                        time="2023 — 2025"
                        role="Full-Stack Engineer"
                        org="Shopify Partners Program"
                        desc="Led development of a custom B2B SaaS platform enabling real-time dynamic pricing, automated consignor payouts, and sales reporting for two industry-leading retail stores, scaling annual revenue into the 8 figures."
                        index={1}
                    />
                    <TimelineItem
                        time="2020 — 2023"
                        role="Backend Engineer"
                        org="Self Employed Founder"
                        desc="Founded 11Notify, a platform that alerts customers the moment high-ticket products come back in stock. Scaled to 350+ customers and sold after 3 years of growth."
                        index={2}
                    />
                </div>
            </Container>
        </motion.div>
    );
}
