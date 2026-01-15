import Container from "../components/Container.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useTiltEffect from "../hooks/useTiltEffect.js";
import {
    containerVariants,
    itemVariants,
    motionProps,
    EASE_CURVE
} from "../constants/animations.js";

function ContactCard({ children, initial, animate, transition, href, target, rel }) {
    const { ref, tiltStyles, handlers } = useTiltEffect({ scale: 1.02, maxTilt: 6 });

    return (
        <motion.a
            ref={ref}
            {...handlers}
            initial={initial}
            animate={animate}
            transition={transition}
            style={{ ...tiltStyles, willChange: 'opacity, transform' }}
            className="block rounded-2xl border border-subtle bg-surface p-6 hover:border-strong transition"
            href={href}
            target={target}
            rel={rel}
        >
            {children}
        </motion.a>
    );
}

export default function Contact() {
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
                    className="max-w-3xl"
                >
                    <motion.div variants={itemVariants} {...motionProps} className="text-sm text-muted">
                        Contact
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        {...motionProps}
                        className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight"
                    >
                        Looking for a Solution?
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        {...motionProps}
                        className="mt-4 text-muted leading-7"
                    >
                        Best way to reach me is by email. If you've got a clear brief + timeline, even better.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: EASE_CURVE }}
                    style={{ willChange: 'opacity, transform' }}
                    className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                    <ContactCard
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5, ease: EASE_CURVE }}
                        href="mailto:krishkp2502@gmail.com"
                    >
                        <div className="text-sm text-muted">Email</div>
                        <div className="mt-2 text-lg font-semibold">krishkp2502@gmail.com</div>
                    </ContactCard>

                    <ContactCard
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6, ease: EASE_CURVE }}
                        href="https://cal.com/krish-p-hwfjhs"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="text-sm text-muted">Book a Meeting</div>
                        <div className="mt-2 text-lg font-semibold">Calendar Link</div>
                    </ContactCard>
                </motion.div>
            </Container>
        </motion.div>
    );
}
