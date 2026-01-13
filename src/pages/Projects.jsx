import { useMemo, useState } from "react";
import Container from "../components/Container.jsx";
import Pill from "../components/Pill.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Projects() {
    const allTags = useMemo(() => {
        const set = new Set();
        projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
        return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
    }, []);

    const [active, setActive] = useState("All");

    const filtered = useMemo(() => {
        if (active === "All") return projects;
        return projects.filter((p) => p.tags.includes(active));
    }, [active]);

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
                        My Projects
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight"
                    >
                        Solutions I've shipped
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="mt-4 text-white/70 leading-7"
                    >
                        A mix of client work and personal products—focused on scalability, performance, and real business outcomes.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 flex flex-wrap gap-2"
                >
                    {allTags.map((t, i) => (
                        <motion.div
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                        >
                            <Pill active={t === active} onClick={() => setActive(t)}>
                                {t}
                            </Pill>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {filtered.map((p, index) => (
                        <AnimatedProjectCard key={`${active}-${p.title}`} project={p} index={index} />
                    ))}
                </div>
            </Container>
        </motion.div>
    );
}

function AnimatedProjectCard({ project, index }) {
    // Since the parent key includes activeFilter, component remounts on filter change
    // This ensures initial state is applied and animation plays
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <ProjectCard project={project} />
        </motion.div>
    );
}
