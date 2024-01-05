import { AnimatePresence, Variants, motion } from 'framer-motion';
const dotVariants: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
};
export function Dot({ animate = false }: { animate?: boolean }) {
    if (!animate)
        return (
            <motion.span
                className="h-fit w-fit text-primary dark:mix-blend-difference"
                layout>
                .
            </motion.span>
        );
    return (
        <motion.span
            className="h-fit w-fit text-primary "
            layout
            variants={dotVariants}
            transition={{ ease: 'easeOut', duration: 1 }}>
            .
        </motion.span>
    );
}
