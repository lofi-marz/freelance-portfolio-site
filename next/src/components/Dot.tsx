import { AnimatePresence, Variants, motion } from 'framer-motion';
const dotVariants: Variants = {
    hide: { scale: 0 },
    show: { scale: 1 },
};
export function Dot() {
    return (
        <motion.span className="w-fit text-primary mix-blend-difference" layout>
            .
        </motion.span>
    );
}
