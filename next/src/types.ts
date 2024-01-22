import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';
import { ReadTimeResults } from 'reading-time';

export type WithChildrenProps = {
    children: React.ReactNode;
};

export type WithClassNameProps = {
    className?: string;
};
export type Theme = 'dark' | 'light';

export type Post = {
    title: string;
    description: string;
    content: MDXRemoteSerializeResult;
    date: string;
    readingTime: ReadTimeResults;
    categories: PostCategory[];
};

export type PostCategory = {
    name: string;
    slug: string;
};

export type PostBrief = {
    title: string;
    description: string;
    date: string;
    slug: string;
};

type StrapiPagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};
export type StrapiPostResponse = {
    id: number;
    attributes: {
        title: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        description: string;
        slug: string;
        content: string;
        postCategories: { data: StrapiPostCategoryResponse[] };
    };
};

export type StrapiPostCategoryResponse = {
    id: number;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        slug: string;
    };
};
export type StrapiPostShortResponse = {
    id: number;
    attributes: Pick<
        StrapiPostResponse['attributes'],
        'title' | 'slug' | 'createdAt' | 'description'
    >;
};

export type StrapiPaginatedResponse<T> = {
    data: T[];
    meta: { pagination: StrapiPagination };
};
