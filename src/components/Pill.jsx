export default function Pill({ children, active = false, onClick }) {
    return (
        <button
            onClick={onClick}
            className={[
                "rounded-full border px-3 py-1 text-xs sm:text-sm transition",
                active
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20",
            ].join(" ")}
        >
            {children}
        </button>
    );
}
