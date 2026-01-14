import Container from "../components/Container.jsx";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { projects } from "../data/projects.js";
import { useEffect, useState, useMemo } from "react";
import useTiltEffect from "../hooks/useTiltEffect.js";

function FeatureCard({ children, initial, animate, transition }) {
    const { ref, tiltStyles, handlers } = useTiltEffect({ scale: 1.02, maxTilt: 6 });

    return (
        <motion.div
            ref={ref}
            {...handlers}
            initial={initial}
            animate={animate}
            transition={transition}
            style={{ ...tiltStyles, willChange: 'opacity, transform' }}
            className="rounded-2xl border border-subtle bg-surface p-6"
        >
            {children}
        </motion.div>
    );
}

function Stat({ value, label, delay = 0 }) {
    const [displayValue, setDisplayValue] = useState(0);
    const { ref, tiltStyles, handlers } = useTiltEffect({ scale: 1.02, maxTilt: 6 });

    // Extract numeric value from string (handles "£10,000,000+", "4", "3+", etc.)
    const getNumericValue = (val) => {
        const cleaned = val.replace(/[£,+\s]/g, '');
        return parseFloat(cleaned) || 0;
    };

    // Format the value back to original format
    const formatValue = (num, original) => {
        const flooredNum = Math.floor(num);
        if (original.includes('£')) {
            return `£${flooredNum.toLocaleString()}+`;
        }
        if (original.includes('+')) {
            return `${flooredNum}+`;
        }
        return flooredNum.toString();
    };

    const numericValue = getNumericValue(value);
    const duration = 2; // seconds

    useEffect(() => {
        const startTime = performance.now() + delay * 1000;
        let animationFrameId;

        const animate = (currentTime) => {
            const elapsed = (currentTime - startTime) / 1000;
            if (elapsed < 0) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const progress = Math.min(elapsed / duration, 1);
            // Easing function for smooth animation
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericValue * eased;

            setDisplayValue(current);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setDisplayValue(numericValue);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [numericValue, delay, duration]);

    return (
        <motion.div
            ref={ref}
            {...handlers}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...tiltStyles, willChange: 'opacity, transform' }}
            className="rounded-2xl border border-subtle bg-surface p-5"
        >
            <div className="text-2xl font-semibold">{formatValue(displayValue, value)}</div>
            <div className="mt-1 text-sm text-muted">{label}</div>
        </motion.div>
    );
}

export default function Home() {
    // Translations of "I'm Krish" in different languages
    const translations = useMemo(() => [
        { text: "I'm Krish", language: "English" },
        { text: "Soy Krish", language: "Spanish" },
        { text: "Je suis Krish", language: "French" },
        { text: "Ich bin Krish", language: "German" },
        { text: "Sono Krish", language: "Italian" },
        { text: "Eu sou Krish", language: "Portuguese" },
        { text: "私はクリシュです", language: "Japanese" },
        { text: "我是克里什", language: "Chinese" },
        { text: "मैं कृष हूँ", language: "Hindi" },
        { text: "أنا كريش", language: "Arabic" },
        { text: "Я Криш", language: "Russian" },
        { text: "나는 크리쉬입니다", language: "Korean" },
        { text: "Jag är Krish", language: "Swedish" },
        { text: "Ik ben Krish", language: "Dutch" },
    ], []);

    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentTranslation = translations[currentIndex].text;
        const typingSpeed = isDeleting ? 50 : 100;
        let frameId;
        let lastTime = performance.now();
        let waitTimeout;
        
        const animate = (currentTime) => {
            const delta = currentTime - lastTime;
            
            if (delta >= typingSpeed) {
                lastTime = currentTime;
                
                if (!isDeleting) {
                    // Typing forward
                    if (charIndex < currentTranslation.length) {
                        setDisplayedText(currentTranslation.slice(0, charIndex + 1));
                        setCharIndex(charIndex + 1);
                        frameId = requestAnimationFrame(animate);
                    } else {
                        // Finished typing, wait 2 seconds before deleting
                        waitTimeout = setTimeout(() => {
                            setIsDeleting(true);
                        }, 2000);
                    }
                } else {
                    // Deleting/backspacing
                    if (charIndex > 0) {
                        setDisplayedText(currentTranslation.slice(0, charIndex - 1));
                        setCharIndex(charIndex - 1);
                        frameId = requestAnimationFrame(animate);
                    } else {
                        // Finished deleting, move to next translation and reset
                        setIsDeleting(false);
                        setCharIndex(0);
                        setCurrentIndex((prev) => (prev + 1) % translations.length);
                    }
                }
            } else {
                frameId = requestAnimationFrame(animate);
            }
        };
        
        frameId = requestAnimationFrame(animate);
        
        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId);
            }
            if (waitTimeout) {
                clearTimeout(waitTimeout);
            }
        };
    }, [charIndex, currentIndex, isDeleting, translations]);

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
    
    const motionProps = {
        style: { willChange: 'opacity, transform' }
    };

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
            },
        }),
    };

    const uniqueTags = [...new Set(projects.flatMap(project => project.tags))].sort();

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
                    className="w-full"
                >
                    <motion.div variants={itemVariants} {...motionProps} className="text-sm text-muted">
                        Welcome to My Portfolio
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        {...motionProps}
                        className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight"
                    >
                        <span className="text-muted">
                            {displayedText}
                        </span>
                        <span className="text-primary animate-pulse">|</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        {...motionProps}
                        className="mt-5 text-base sm:text-lg text-muted leading-7 w-full"
                    >
                        A passionate full-stack developer with a founders mindset. I craft solutions to build
                        revenue-impacting and scalable products for startups and businesses.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        {...motionProps}
                        className="mt-7 flex flex-wrap gap-3"
                    >
                        <Link
                            to="/projects"
                            className="rounded-2xl border border-soft bg-surface-strong px-5 py-2.5 text-sm text-primary hover:bg-surface-hover transition"
                        >
                            My Projects
                        </Link>
                        <Link
                            to="/about"
                            className="rounded-2xl border border-subtle bg-surface px-5 py-2.5 text-sm text-muted-strong hover:text-primary hover:border-strong transition"
                        >
                            About Me
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ willChange: 'opacity, transform' }}
                    className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                    <Stat value="£10,622,113+" label="Revenue Generated from my projects" delay={0.5} />
                    <Stat value="4" label="Businesses Scaled and Managed" delay={0.5} />
                    <Stat value="3+" label="Years Crafting Solutions" delay={0.5} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ willChange: 'opacity, transform' }}
                    className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
                >
                    <FeatureCard
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="text-sm text-muted">Focusing on the best</div>
                        <h2 className="mt-2 text-2xl font-semibold">Multiple Tech Stack</h2>
                        <p className="mt-3 text-sm text-muted leading-6">
                            I work across modern frameworks, backend systems, and cloud tooling to ship scalable, stable products.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {uniqueTags.map((t, i) => (
                                <motion.span
                                    key={t}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    variants={tagVariants}
                                    style={{ willChange: 'opacity, transform' }}
                                    className="rounded-full border border-subtle bg-chip px-3 py-1 text-xs text-muted"
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-2xl font-semibold">Open to collaborations</h2>
                        <p className="mt-3 text-sm text-muted leading-6">
                            Whether it's a small feature or your next big SaaS, I'm happy to jump in and help you ship.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/contact"
                                className="rounded-2xl border border-soft bg-surface-strong px-5 py-2.5 text-sm text-primary hover:bg-surface-hover transition"
                            >
                                Contact me
                            </Link>
                            <a
                                href="https://cal.com/krish-p-hwfjhs"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl border border-subtle bg-surface px-5 py-2.5 text-sm text-muted-strong hover:text-primary hover:border-strong transition"
                            >
                                Book a meeting
                            </a>
                        </div>
                    </FeatureCard>
                </motion.div>
            </Container>
        </motion.div>
    );
}
