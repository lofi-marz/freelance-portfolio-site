import { ReactElement } from 'react';
import { BlogLayout, PaginationBar } from '@/components/blog';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { fetchArticleBriefs } from '@/utils/strapi';
import { FaArrowRight } from 'react-icons/fa6';
import { NextSeo } from 'next-seo';
import { PostBrief } from 'types';
import Link from 'next/link';
import { Dot } from '@/components/Dot';
function PostLink({
    article: { title, date, slug, description },
}: {
    article: PostBrief;
}) {
    const formattedDate = new Date(date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return (
        <li className="flex flex-col gap-3">
            <h2 className="font-title text-2xl font-semibold leading-tight sm:text-3xl">
                {title}
            </h2>
            <p className="text-xs opacity-[.9]">{formattedDate}</p>
            <p className="font-body text-base">{description}</p>
            <Link
                className="flex w-fit flex-row items-center justify-center gap-1 text-xs font-semibold text-primary transition-all hover:underline"
                href={`/blog/${slug}`}>
                Read More <FaArrowRight className="-mb-[0.11lh] " />
            </Link>
        </li>
    );
}

export default function BlogPage({
    articleData: { articles, pagination },
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <NextSeo
                title={`Page ${pagination.page}`}
                description={`Blog posts page ${pagination.page}`}
            />
            <div className="flex h-full w-full max-w-screen-md grow flex-col gap-20 px-5 pb-24 font-title">
                <h1 className="heading text-5xl font-bold">
                    blog
                    <Dot />
                </h1>
                <ul className="flex flex-col gap-10">
                    {articles.map((a) => (
                        <PostLink key={a.slug} article={a} />
                    ))}
                </ul>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps<{
    articleData: Awaited<ReturnType<typeof fetchArticleBriefs>>;
}> = async () => {
    const pageNumber = 1;

    const articleData = await fetchArticleBriefs(pageNumber, 20);

    return {
        props: { articleData },
        revalidate: 3600,
    };
};

BlogPage.getLayout = (page: ReactElement) => <BlogLayout>{page}</BlogLayout>;
