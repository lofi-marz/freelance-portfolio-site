import { motion, Variants } from 'framer-motion';
import clsx from 'clsx';
import { title } from '../../../fonts';
const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
};
//TODO: Make this interactive
export function CallToAction() {
    return (
        <motion.a
            className={clsx(
                'themed-bg-invert themed-text-invert mx-auto rounded px-10 py-3 text-center font-bold text-dark-50 md:mx-0',
                title.className
            )}
            href="https://www.linkedin.com/in/omari-thompson-edwards-b7307b195"
            target="_blank"
            variants={fadeVariants}>
            Get in touch.
        </motion.a>
    );
}