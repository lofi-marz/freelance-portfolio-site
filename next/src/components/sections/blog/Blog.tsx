import { PostBrief } from 'types';
import { Dot } from '../..';
import Link from 'next/link';
import { HiMiniArrowUpRight } from 'react-icons/hi2';

export function Blog({ briefs }: { briefs: PostBrief[] }) {
    return (
        <section className="flex min-h-screen w-full flex-col gap-12 bg-theme-invert px-6 py-36 lg:px-48">
            <h2 className="heading text-5xl text-theme">
                and I write
                <Dot />
            </h2>
            <ul className="flex w-full flex-col gap-12 md:gap-20">
                {briefs.slice(0, 4).map((b) => (
                    <ArticleCard {...b} key={b.slug} />
                ))}
            </ul>
        </section>
    );
}

function ArticleCard({ title, description, date, slug }: PostBrief) {
    const formattedDate = new Date(date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return (
        <li className="flex flex-row text-primary">
            <div className="heading hidden w-72 lowercase md:block">
                {formattedDate}
            </div>
            <div className="flex w-full flex-col justify-between gap-3 text-xs text-theme md:gap-6 md:text-sm">
                <Link
                    href={`/blog/${slug}`}
                    className="heading text-2xl lowercase opacity-90 hover:underline md:text-4xl">
                    {title}
                    <Dot />
                </Link>

                <p className="text-base md:text-lg">{description}</p>
                <Link
                    href={`/blog/${slug}`}
                    className="heading flex w-fit flex-row items-center justify-center gap-1 rounded-full text-primary opacity-90 transition-all hover:underline">
                    read
                </Link>
            </div>
        </li>
    );
}
