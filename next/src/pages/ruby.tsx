import ruby from '../ruby.jpg';
import Image from 'next/image';
import { motion, Variant } from 'framer-motion';
import { useRef } from 'react';
const spin: Variant = {
    rotate: [0, 60, 120, 180, 240, 300, 360],
    opacity: [0.9, 1, 0.9, 1, 0.9, 0.9],
    transition: {
        repeat: Infinity,
        ease: 'linear',
        duration: 5,
    },
};

export default function Ruby() {
    const constraints = useRef(null);
    return (
        <motion.div
            className="flex h-screen w-full items-center justify-center"
            ref={constraints}>
            <motion.div
                drag={true}
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                }}
                whileDrag="spin"
                whileTap={{ scale: 0.9 }}
                variants={{ spin }}
                dragConstraints={constraints}
                dragElastic={0.1}
                className="w-[35%] overflow-clip rounded-full sm:w-96">
                <Image src={ruby} alt="ruby" className="w-full rounded-full" />
            </motion.div>
        </motion.div>
    );
}
