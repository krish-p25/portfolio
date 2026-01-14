export default function Pill({ children, active = false, onClick }) {
    return (
        <button
            onClick={onClick}
            className={[
                "rounded-full border px-3 py-1 text-xs sm:text-sm transition cursor-pointer",
                active
                    ? "border-stronger bg-surface-strong text-primary"
                    : "border-subtle bg-surface text-muted hover:text-primary hover:border-strong",
            ].join(" ")}
        >
            {children}
        </button>
    );
}
