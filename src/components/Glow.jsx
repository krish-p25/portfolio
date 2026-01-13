export default function Glow() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute top-56 left-12 h-[420px] w-[420px] rounded-full bg-green-500/5 blur-3xl" />
            <div className="absolute top-72 right-6 h-[520px] w-[520px] rounded-full bg-green-500/5 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.45),rgba(0,0,0,0.85))]" />
        </div>
    );
}