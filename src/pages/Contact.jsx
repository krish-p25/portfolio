import Container from "../components/Container.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Contact() {
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
                    <motion.div variants={itemVariants} {...motionProps} className="text-sm text-white/70">
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
                        className="mt-4 text-white/70 leading-7"
                    >
                        Best way to reach me is by email. If you've got a clear brief + timeline, even better.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ willChange: 'opacity, transform' }}
                    className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                    <motion.a
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ willChange: 'opacity, transform' }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition"
                        href="mailto:krishkp2502@gmail.com"
                    >
                        <div className="text-sm text-white/70">Email</div>
                        <div className="mt-2 text-lg font-semibold">krishkp2502@gmail.com</div>
                    </motion.a>

                    <motion.a
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ willChange: 'opacity, transform' }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition"
                        href="https://cal.com/krish-p-hwfjhs"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="text-sm text-white/70">Book a Meeting</div>
                        <div className="mt-2 text-lg font-semibold">Calendar Link</div>
                    </motion.a>
                </motion.div>
            </Container>
        </motion.div>
    );
}
