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
                'card mx-auto w-fill lg:w-fit bg-primary px-10 py-3 text-center font-bold text-light transition-all hover:brightness-110 active:brightness-75 md:mx-0',
                title.className
            )}
            href="mailto:othompsonedwards@gmail.com?subject=Help%2C%20I%20need%20a%20website!"
            target="_blank"
            variants={fadeVariants}>
            Get in touch.
        </motion.a>
    );
}
