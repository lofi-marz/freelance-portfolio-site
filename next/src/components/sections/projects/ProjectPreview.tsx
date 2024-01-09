import { ProjectContent } from '../../../utils/strapi';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export function ProjectPreview({ project }: { project: ProjectContent }) {
    return (
        <AnimatePresence mode="sync">
            <div className="h-16 w-full bg-theme md:hidden"></div>
            <motion.div
                className="absolute right-0 my-16 flex aspect-square w-full items-start justify-center md:my-auto md:w-[175%] md:items-center md:brightness-75"
                key={'project-' + project.id}
                initial="hide"
                animate="show"
                exit="hide">
                <motion.div className="absolute mt-10 h-full w-full" />
                <motion.div
                    className="relative aspect-[16/9] w-full"
                    variants={{
                        hide: {
                            opacity: 0,
                            transition: {
                                duration: 0.5,
                            },
                        },
                        show: {
                            opacity: 1,
                            transition: {
                                duration: 0.25,
                            },
                        },
                    }}>
                    <Image
                        src={
                            'https://marileon.me/cms' +
                            project.attributes.desktopPreview.data.attributes
                                .url
                        }
                        alt=""
                        fill
                        className="card z-10 bg-theme object-cover object-top"
                    />
                    <motion.div className="card absolute mt-8 h-full w-full bg-primary brightness-75 md:ml-8" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
