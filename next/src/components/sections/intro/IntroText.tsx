import { motion } from 'framer-motion';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { IntroTextVariants, subtitle } from './Intro';

function IntroText() {
    const sm = useMediaQuery('sm');

    return (
        <motion.div className="themed-bg-invert themed-text-invert relative flex h-full w-full flex-grow items-center justify-start overflow-clip py-12">
            <motion.div className="flex w-full flex-col items-start justify-center p-4 text-3xl font-bold sm:p-10 sm:text-4xl">
                <motion.div
                    style={{ writingMode: sm ? 'inherit' : 'vertical-rl' }}
                    variants={IntroTextVariants}>
                    hi, I&apos;m omari
                </motion.div>
                <motion.div
                    className="hide max-w-sm text-primary md:block"
                    variants={IntroTextVariants}>
                    {subtitle}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
