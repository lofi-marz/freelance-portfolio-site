import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import {
    MDXRemote,
    MDXRemoteProps,
    MDXRemoteSerializeResult,
} from 'next-mdx-remote';
import readingTime from 'reading-time';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import { ReactElement, useEffect } from 'react';

import { NextSeo } from 'next-seo';
import { Post } from 'types';
import { STRAPI_TOKEN, getPost } from '@/utils/strapi';
import Image from 'next/image';
import { AuthorTag, BlogLayout } from '@/components/blog';
import Link from 'next/link';
const STRAPI_URL = process.env.STRAPI_URL ?? 'https://admin.myintimate.app';

const components: MDXRemoteProps['components'] = {
    a: ({ href, target }) => <Link href={href!} target={target} />,
};
hljs.registerLanguage('typescript', typescript);
export default function Post({ post }: { post: Post }) {
    const date = new Date(post.date);
    const readingMins = Math.round(post.readingTime.minutes);
    const suffix = readingMins === 1 ? 'mins' : 'min';
    useEffect(() => {
        hljs.highlightAll();
    }, []);
    return (
        <>
            <NextSeo
                titleTemplate="Intimate AI Girlfriend | %s"
                title={post.title}
                description={post.description ?? post.title}
            />
            <article className="prose dark:prose-invert lg:prose-lg prose-h1:mb-0 prose-a:transition-all prose-a:hover:underline prose-img:mx-auto prose-img:first-of-type:my-0 prose-headings:font-title max-w-screen-md py-8 font-body">
                <div className="flex w-full flex-col gap-2">
                    <h1>{post.title}</h1>
                    <AuthorTag />
                    <div>{post.description}</div>
                    <div className="flex flex-row text-sm">
                        {date.toDateString()} •{' '}
                        {Math.round(post.readingTime.minutes)} {suffix}
                    </div>
                </div>

                <div className="relative">
                    <MDXRemote {...post.content} components={components} />
                </div>
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
}> = async ({ params }) => {
    const slug = params?.slug as string;

    const post = await getPost(slug);

    if (!post) {
        console.log(`Post ${slug} not found.`);
        return { notFound: true };
    }
    const mdxSource = await serialize(post.attributes.content);

    console.log(post.attributes.content);

    const rt = readingTime(post.attributes.content);
    return {
        props: {
            post: {
                title: post.attributes.title,
                description: post.attributes.description,
                content: mdxSource,
                date: post.attributes.publishedAt,
                readingTime: rt,
            },
        },
    };
};

Post.getLayout = (page: ReactElement) => <BlogLayout>{page}</BlogLayout>;
