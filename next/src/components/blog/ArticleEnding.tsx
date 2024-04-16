import Image from 'next/image';
import me from 'assets/me-brighton.jpg';
import { Dot } from '../Dot';
export function ArticleEnding() {
    return (
        <div className="my-24 flex flex-col items-start justify-center  gap-8 rounded-3xl bg-theme-invert p-6 py-8 text-theme md:h-48 md:flex-row md:justify-center lg:my-12">
            <div className="relative aspect-square h-24 flex-shrink-0 overflow-clip rounded md:h-full">
                <Image
                    src={me}
                    alt="Me"
                    className="h-full w-full object-cover"
                    style={{ maxWidth: 'none' }}
                />
            </div>
            <div className="grow">
                <div className="heading mb-0 text-xl lowercase">
                    Hey, I&apos;m Omari 👋
                </div>
                <p className="text-base">
                    I&apos;m a full-stack developer from the UK. I&apos;m
                    currently looking for graduate and freelance software
                    engineering roles, so if you liked this article,{' '}
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
