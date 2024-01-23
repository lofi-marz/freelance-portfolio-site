import Image from 'next/image';
import me from 'assets/me-brighton.jpg';
import { Dot } from '../Dot';
export function ArticleEnding() {
    return (
        <div className="mt-24 flex flex-col  items-start justify-center gap-8 bg-theme-invert p-6 text-theme md:h-56 md:flex-row md:justify-center">
            <div className="relative aspect-square h-24 flex-shrink-0 overflow-clip rounded md:h-full">
                <Image
                    src={me}
                    alt="Me"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="grow">
                <div className="heading mb-0 text-xl">
                    👋 Hey, I&apos;m Omari
                    <Dot />
                </div>
                <p className="text-base">
                    Hey, I&apos;m Omari! I&apos;m a full-stack developer from
                    the UK. I&apos;m currently looking for graduate and
                    freelance software engineering roles, so if you liked this
                    article,{' '}
                    <a
                        className="text-primary hover:underline"
                        href="mailto:othompsonedwards@gmail.com">
                        feel free to reach out.
                    </a>
                </p>
            </div>
        </div>
    );
}
