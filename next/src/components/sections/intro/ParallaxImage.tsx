import { MotionValue, motion, useTransform } from 'framer-motion';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { useRef } from 'react';
import { WithClassNameProps } from 'types';
import { cn } from 'utils';
type ParallaxImageProps = {
    src: StaticImageData;
    alt: string;

    frame?: boolean;
} & WithClassNameProps;

export function ParallaxImage({
    src,
    alt,
    className,

    frame = false,
}: ParallaxImageProps) {
    return (
        <motion.div
            className={cn(
                'w-1/2 bg-red-400 relative saturate-[.9] overflow-clip pointer-events-auto',
                frame && 'p-[5%]',

                className
            )}>
            <Image
                src={src}
                alt={alt}
                priority
                className="hover:scale-110 transition-all ease-out duration-1000"
            />
        </motion.div>
    );
}
