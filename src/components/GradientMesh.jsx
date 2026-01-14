export default function GradientMesh() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 overflow-hidden"
            style={{ zIndex: 0 }}
        >
            {/* Blob 1 - Top left */}
            <div
                className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-60"
                style={{
                    background: "radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
                    animation: "meshBlob1 25s ease-in-out infinite",
                }}
            />

            {/* Blob 2 - Bottom right */}
            <div
                className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full opacity-50"
                style={{
                    background: "radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 70%)",
                    animation: "meshBlob2 30s ease-in-out infinite",
                }}
            />

            {/* Blob 3 - Center */}
            <div
                className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-40"
                style={{
                    background: "radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)",
                    animation: "meshBlob3 28s ease-in-out infinite",
                }}
            />
        </div>
    );
}
