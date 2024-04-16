import { motion, Variants } from 'framer-motion';
import clsx from 'clsx';
import { title } from '../../../styles/fonts';
const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
};
//TODO: Make this interactive
export function CallToAction() {
    return (
        <motion.a
            className={clsx(
                'card w-fill mx-auto bg-primary px-10 py-3 text-center font-bold text-light transition-all active:brightness-75 hover:brightness-110 md:mx-0 lg:w-fit',
                title.className
            )}
            href="mailto:othompsonedwards@gmail.com?subject=Help%2C%20I%20need%20a%20website!"
            target="_blank"
            variants={fadeVariants}>
            Get in touch.
        </motion.a>
    );
}
