import { BlogTitle, SponsoredBox } from '@/components/blog';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import { BlogLayout } from '@/components/blog';
import { ReactElement } from 'react';
import { Article } from '@/types';
import { getArticle } from '@/strapi';

const STRAPI_URL = process.env.STRAPI_URL ?? 'https://admin.myintimate.app';

export default function Post({ article }: { article: Article }) {
    console.log(article.description);
    const date = new Date(article.date);
    const readingMins = Math.round(article.readingTime.minutes);
    const suffix = readingMins === 1 ? 'mins' : 'min';

    return (
        <main className="flex h-full min-h-screen w-full flex-col items-center justify-start bg-violet-950 px-4 py-28 transition-all">
            <SponsoredBox />
            <div className="prose prose-invert py-8 text-gray-300 lg:prose-lg prose-h1:mb-0 prose-a:transition-all prose-a:hover:text-purple-300 prose-img:mx-auto">
                <div className="flex w-full flex-col gap-2">
                    <BlogTitle>{article.title}</BlogTitle>
                    <div>{article.description}</div>
                    <div className="flex flex-row text-sm">
                        {date.toDateString()} •{' '}
                        {Math.round(article.readingTime.minutes)} {suffix}
                    </div>
                </div>
                <hr className="border-white/10" />
                <div className="">
                    <MDXRemote {...article.content} />
                </div>
            </div>
            <SponsoredBox />
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const BLOG_PATH = '/api/articles';
    const fullPath =
        STRAPI_URL + BLOG_PATH + '?fields[0]=slug&pagination[pageSize]=1000';
    const slugs = await axios
        .get<{ data: { attributes: { slug: string } }[] }>(fullPath)
        .then((res) =>
            res.data.data
                .map(({ attributes: { slug } }) => slug)
                .filter((s) => s !== '')
        );
    console.log(slugs);
    return {
        paths: slugs.map((slug) => ({
            params: { slug },
        })),
        fallback: 'blocking',
    };
};
export const getStaticProps: GetStaticProps<{
    article: Article;
}> = async ({ params }) => {
    const slug = params?.slug as string;

    const article = await getArticle(slug);

    if (!article) {
        console.log(`Article ${slug} not found.`);
        return { notFound: true };
    }

    console.log(article.attributes.title, article);
    const mdxSource = await serialize(
        article.attributes.content.replace('http://localhost:1337', STRAPI_URL)
    );
    const rt = readingTime(article.attributes.content);
    return {
        props: {
            article: {
                title: article.attributes.title,
                description: article.attributes.description,
                content: mdxSource,
                date: article.attributes.publishedAt,
                readingTime: rt,
            },
        },
    };
};

Post.getLayout = (page: ReactElement) => <BlogLayout>{page}</BlogLayout>;
