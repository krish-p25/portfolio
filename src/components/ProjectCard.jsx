import { ExternalLink } from "lucide-react";
import useTiltEffect from "../hooks/useTiltEffect.js";

export default function ProjectCard({ project }) {
    const { ref, tiltStyles, handlers } = useTiltEffect({ scale: 1.02 });

    return (
        <div
            ref={ref}
            {...handlers}
            className="group relative h-full overflow-hidden rounded-2xl border border-subtle bg-surface"
            style={tiltStyles}
        >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_55%)]" />
            <div className="relative flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold">{project.title}</h3>
                        <p className="mt-2 text-sm text-muted leading-6">{project.description}</p>
                    </div>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 rounded-xl border border-subtle bg-surface p-2 text-muted hover:text-primary hover:border-strong transition"
                            aria-label={`Visit ${project.title}`}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
                    {project.tags.map((t) => (
                        <span
                            key={t}
                            className="rounded-full border border-subtle bg-chip px-2.5 py-1 text-[11px] text-muted"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
