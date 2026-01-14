import { useState, useCallback, useRef } from "react";

export default function useTiltEffect(options = {}) {
    const {
        maxTilt = 8,
        scale = 1.03,
        glowColor = "rgba(34, 197, 94, 0.2)",
        glowBorderColor = "rgba(34, 197, 94, 0.3)",
    } = options;

    const [isHovered, setIsHovered] = useState(false);
    const tiltRef = useRef({ x: 0, y: 0 });
    const elementRef = useRef(null);

    const handleMouseMove = useCallback(
        (e) => {
            if (!elementRef.current) return;

            const rect = elementRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
            const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

            tiltRef.current = { x: rotateX, y: rotateY };

            if (elementRef.current) {
                elementRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
            }
        },
        [maxTilt, scale]
    );

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        tiltRef.current = { x: 0, y: 0 };

        if (elementRef.current) {
            elementRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        }
    }, []);

    const tiltStyles = {
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow: isHovered
            ? `0 0 25px ${glowColor}, 0 25px 50px rgba(0, 0, 0, 0.4)`
            : "none",
        borderColor: isHovered ? glowBorderColor : undefined,
    };

    return {
        ref: elementRef,
        isHovered,
        tiltStyles,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        },
    };
}
