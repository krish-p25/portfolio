import { useRef, useEffect } from "react";

export default function Glow() {
    const glowRef = useRef(null);

    useEffect(() => {
        let animationFrameId;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e) => {
            // Use clientX/clientY since glow is fixed to viewport
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const animate = () => {
            // Smooth interpolation for less jitter
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;

            if (glowRef.current) {
                // Use transform instead of left/top for GPU acceleration
                glowRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
            {/* Static glows */}
            <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute top-56 left-12 h-[420px] w-[420px] rounded-full bg-purple-500/5 blur-3xl" />
            <div className="absolute top-72 right-6 h-[520px] w-[520px] rounded-full bg-purple-500/5 blur-3xl" />
            
            {/* Cursor-following glow */}
            <div
                ref={glowRef}
                className="absolute h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-3xl will-change-transform"
                style={{
                    left: 0,
                    top: 0,
                    transform: "translate(-50%, -50%)",
                }}
            />
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.08),transparent_55%)]" />
            <div className="shade-overlay absolute inset-0" />
        </div>
    );
}
