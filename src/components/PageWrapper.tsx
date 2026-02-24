import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

export default function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'tween', ease: [0, 0, 0.2, 1], duration: 0.35 }}
        >
            {children}
        </motion.div>
    );
}
