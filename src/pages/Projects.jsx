import { useMemo, useState } from "react";
import Container from "../components/Container.jsx";
import Pill from "../components/Pill.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";

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

    return (
        <Container className="pt-14 pb-16 sm:pt-20">
            <div className="max-w-3xl">
                <div className="text-sm text-white/70">My Projects</div>
                <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">Solutions I’ve shipped</h1>
                <p className="mt-4 text-white/70 leading-7">
                    A mix of client work and personal products—focused on scalability, performance, and real business outcomes.
                </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
                {allTags.map((t) => (
                    <Pill key={t} active={t === active} onClick={() => setActive(t)}>
                        {t}
                    </Pill>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filtered.map((p) => (
                    <ProjectCard key={p.title} project={p} />
                ))}
            </div>
        </Container>
    );
}
