import axios from 'axios';
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetServerSidePropsType,
    InferGetStaticPropsType,
} from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import {
    MDXRemote,
    MDXRemoteProps,
    MDXRemoteSerializeResult,
} from 'next-mdx-remote';
import readingTime from 'reading-time';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import { ReactElement, useEffect, useState } from 'react';

import { ArticleJsonLd, NextSeo } from 'next-seo';
import { Post, PostBrief, WithChildrenProps } from 'types';
import { STRAPI_TOKEN, fetchArticleBriefs, getPost } from '@/utils/strapi';
import Image from 'next/image';
import { ArticleEnding, AuthorTag, BlogLayout } from '@/components/blog';
import Link from 'next/link';
import { Dot } from '@/components/Dot';
import { cn } from '@/utils/index';
const STRAPI_URL = process.env.STRAPI_URL ?? 'https://cms.marileon.me';
function FormattedHeading({ children }: WithChildrenProps) {
    if (typeof children !== 'string') return children;
    if (children.endsWith('?') || children.endsWith('.')) {
        const start = children.slice(0, children.length - 1);
        const end = children.at(-1);
        return (
            <>
                {start}
                <span className="text-primary">{end}</span>
            </>
        );
    }
    return (
        <>
            {children}
            <Dot />
        </>
    );
}
const components: MDXRemoteProps['components'] = {
    a: ({ href, target, children }) => (
        <Link href={href!} target={target}>
            {children}
        </Link>
    ),
    h2: ({ className, children, ...props }) => (
        <h2 {...props} className={cn(className, 'lowercase')}>
            <FormattedHeading>{children}</FormattedHeading>
        </h2>
    ),
};
hljs.registerLanguage('typescript', typescript);
export default function Post({
    post,
    relatedPosts,
    og,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const date = new Date(post.date);
    const readingMins = Math.round(post.readingTime.minutes);
    const suffix = readingMins === 1 ? 'mins' : 'min';
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <>
            <NextSeo
                titleTemplate="mari. | %s"
                title={post.title}
                description={post.description ?? post.title}
                openGraph={{
                    title: post.title,
                    images: [
                        {
                            url: og,
                            width: 1200,
                            height: 630,
                            alt: `Opengraph image for ${post.title}`,
                        },
                    ],
                    type: 'article',
                    article: {
                        publishedTime: post.date,
                        authors: ['https://www.omarileon.me'],
                        tags: [
                            'TypeScript',
                            'JavaScript',
                            'Web Development',
                            'webdev',
                        ],
                    },
                }}
            />
            <ArticleJsonLd
                useAppDir={false}
                url={`https://www.omarileon.me/blog/${post.slug}`}
                title={post.title}
                images={[og]}
                datePublished={post.date}
                authorName={{
                    name: 'Omari Thompson-Edwards',
                    url: 'https://www.omarileon.me',
                }}
                publisherName="Omari Thompson-Edwards"
                description={post.description}
                isAccessibleForFree={true}
            />

            <article className="prose prose-sm prose-stone w-full px-5 pb-8 font-body dark:prose-invert md:prose-base lg:prose-lg marker:text-primary prose-headings:font-title prose-h1:mb-0 prose-a:transition-all prose-img:mx-auto prose-img:max-w-[60%] prose-img:first-of-type:my-0 prose-a:hover:underline md:max-w-screen-md">
                <ul className="flex w-full items-center justify-center gap-8">
                    {post.categories.map(({ name, slug }) => (
                        <span className="font-bold text-primary" key={slug}>
                            {name}
                        </span>
                    ))}
                </ul>
                <div className="flex w-full flex-col gap-2">
                    <h1>{post.title}</h1>
                    <AuthorTag />
                    <div className="flex flex-row text-sm">
                        {date.toDateString()} •{' '}
                        {Math.round(post.readingTime.minutes)} {suffix}
                    </div>
                </div>

                <div className="relative">
                    <MDXRemote {...post.content} components={components} />
                </div>
                <div>
                    <h2>
                        read more
                        <Dot />
                    </h2>
                    <ul>
                        {relatedPosts.map(({ title, slug }) => (
                            <li key={slug}>
                                <Link href={`/blog/${slug}`} className="">
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <ArticleEnding />
            </article>
        </>
    );
}
export const getStaticPaths: GetStaticPaths = async () => {
    const BLOG_PATH = '/posts';
    const fullPath =
        STRAPI_URL + BLOG_PATH + '?fields[0]=slug&pagination[pageSize]=1000';

    const slugs = await axios
        .get<{ data: { attributes: { slug: string } }[] }>(fullPath, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
        })
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
    post: Post;
    relatedPosts: PostBrief[];
    og: string;
}> = async ({ params }) => {
    const slug = params?.slug as string;

    const post = await getPost(slug);
    const { articles: relatedPosts } = await fetchArticleBriefs(0, 6);

    if (!post) {
        console.log(`Post ${slug} not found.`);
        return { notFound: true };
    }
    console.log(post.attributes.content);
    const mdxSource = await serialize(post.attributes.content);

    //console.log(post.attributes);

    const rt = readingTime(post.attributes.content);

    const ogLink = new URL('http://www.omarileon.me/api/og');

    ogLink.searchParams.append('title', post.attributes.title);
    post.attributes.postCategories.data.forEach((c, i) =>
        ogLink.searchParams.append('categories', c.attributes.name)
    );

    return {
        props: {
            post: {
                title: post.attributes.title,
                description: post.attributes.description,
                content: mdxSource,
                date: post.attributes.publishedAt,
                slug: post.attributes.slug,
                categories: post.attributes.postCategories.data.map((v) => ({
                    name: v.attributes.name,
                    slug: v.attributes.slug,
                })),
                readingTime: rt,
            },
            relatedPosts: relatedPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 5),
            og: ogLink.toString(),
            revalidate: 3600,
        },
    };
};

Post.getLayout = (page: ReactElement) => <BlogLayout>{page}</BlogLayout>;
