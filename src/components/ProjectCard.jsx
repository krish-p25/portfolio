import { ExternalLink } from "lucide-react";
import useTiltEffect from "../hooks/useTiltEffect.js";

export default function ProjectCard({ project }) {
    const { ref, tiltStyles, handlers } = useTiltEffect({ scale: 1.02 });

    return (
        <div
            ref={ref}
            {...handlers}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            style={tiltStyles}
        >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
            <div className="relative p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold">{project.title}</h3>
                        <p className="mt-2 text-sm text-white/70 leading-6">{project.description}</p>
                    </div>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white hover:border-white/20 transition"
                            aria-label={`Visit ${project.title}`}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                        <span
                            key={t}
                            className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/70"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
