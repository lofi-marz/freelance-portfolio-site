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
                'w-1/2 bg-theme-invert relative saturate-[.9]',
                frame && 'p-[5%]',

                className
            )}>
            <Image src={src} alt={alt} />
        </motion.div>
    );
}
