import axios from 'axios';
import path from 'path';
import qs from 'qs';
import { SpotifyToken } from './spotify';
import {
    PostBrief,
    StrapiPaginatedResponse,
    StrapiPostCategoryResponse,
    StrapiPostResponse,
    StrapiPostShortResponse,
} from 'types';

const BLOG_PATH = '/posts';
const CATEGORIES_PATH = '/post-categories';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337/api/';
export const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';
const STRAPI_SPOTIFY_TOKEN = process.env.STRAPI_SPOTIFY_TOKEN;

export class StrapiClient {
    private token: String;
    private getHeaders() {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
        };
    }

    private createPath(apiPath: string, params?: Record<string, unknown>) {
        return path.join(STRAPI_URL, apiPath) + qs.stringify(params);
    }
    async getContent<T>(apiPath: string, params?: Record<string, unknown>) {
        return axios
            .get<{ data: T }>(this.createPath(apiPath, params), {
                headers: this.getHeaders(),
            })
            .then(({ data }) => data.data)
            .catch((e) => {
                console.log(e);
            });
    }
    constructor(token = STRAPI_TOKEN) {
        this.token = token;
    }
}

export async function postStrapiContent<T>(
    apiPath: string,
    params: Record<string, unknown> = {},
    token = STRAPI_TOKEN
): Promise<T | undefined> {
    return axios
        .post<{ data: T }>(
            path.join(STRAPI_URL, apiPath) + qs.stringify(params),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(({ data }) => data.data)
        .catch((e) => {
            console.log(e);
            return undefined;
        });
}

export async function putStrapiContent<T>(
    apiPath: string,
    params: Record<string, unknown> = {},
    token = STRAPI_TOKEN
): Promise<T | undefined> {
    console.log(apiPath, 'Using token:', token);
    return axios
        .put<{ data: T }>(
            path.join(STRAPI_URL, apiPath),
            { data: params },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((res) => {
            //console.log('Put:', res);
            return res;
        })
        .then(({ data }) => data.data)
        .catch((e) => {
            console.log('Erorr performing put:', e);
            return undefined;
        });
}

export async function getSpotifyCode() {
    const client = new StrapiClient(STRAPI_SPOTIFY_TOKEN);
    const res = await client.getContent<{ attributes: { code: string } }>(
        'spotify-code',
        {}
    );
    console.log('Code:', res);
    return res!.attributes.code;
}

export async function getSpotifyToken() {
    const client = new StrapiClient(STRAPI_SPOTIFY_TOKEN);
    const res = await client.getContent<{
        attributes: { token: SpotifyToken };
    }>('spotify-token', {});
    return res?.attributes.token;
}

export async function postSpotifyCode(code: string) {
    const res = await postStrapiContent(
        'spotify-code',
        { code },
        STRAPI_SPOTIFY_TOKEN
    );
}

//Might just do this manually to be safe
export async function updateSpotifyToken(token: SpotifyToken) {
    const res = await putStrapiContent<{ attributes: { token: SpotifyToken } }>(
        'spotify-token',
        { token },
        STRAPI_SPOTIFY_TOKEN
    );
    return res;
}

export function toURLSearchParams(
    key: string,
    objOrArray: string[] | Record<string, any>
) {
    return (
        Array.isArray(objOrArray)
            ? objOrArray.map((value, i) => `${key}[${i}]=${value}`)
            : Object.entries(objOrArray).map(
                  ([key2, value], i) => `${key}[${key2}]=${value}`
              )
    ).join('&');
}
export async function getAllArticles(page = 1, pageSize = 10) {
    const fullPath =
        STRAPI_URL +
        BLOG_PATH +
        `?pagination[page]=${page}&pagination[pageSize]=${pageSize}&fields[0]=slug&fields[1]=title&fields[2]=createdAt&fields[3]=description&sort=publishedAt:desc`;

    const data = await axios
        .get<StrapiPaginatedResponse<StrapiPostShortResponse>>(fullPath, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
        })
        .then((res) => res.data);

    return data;
}

export async function getAllMatchingSlugs(slug: string) {
    const fullPath =
        STRAPI_URL +
        BLOG_PATH +
        '?fields[0]=slug&pagination[page]=0&pagination[pageSize]=10&&filters[slug][$startsWithi]=' +
        slug;

    const data = await axios
        .get<{ data: StrapiPostResponse[] }>(fullPath, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
        })
        .then((res) => res.data)
        .then((data) => data.data.map(({ attributes }) => attributes.slug));

    return data;
}

export async function getAllCategories() {
    const fullPath = STRAPI_URL + CATEGORIES_PATH + '?populate=*';

    const data = await axios
        .get<{ data: StrapiPostCategoryResponse[] }>(fullPath, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
        })
        .then((res) => res.data);

    return data;
}

export async function getCategory(slug: string) {
    const fullPath =
        STRAPI_URL +
        CATEGORIES_PATH +
        '?populate=*&pagination[page]=0&pagination[pageSize]=1&filters[slug][$eq]=' +
        slug;

    const data = await axios
        .get<{ data: StrapiPostCategoryResponse[] }>(fullPath, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
        })
        .then((res) => res.data);

    if (data.data.length === 0) return null;
    return data.data[0];
}
export async function getPost(slug: string) {
    const fullPath =
        STRAPI_URL +
        BLOG_PATH +
        '?populate=*&pagination[page]=0&pagination[pageSize]=1&filters[slug][$eq]=' +
        slug;

    const data = await axios
        .get<{ data: StrapiPostResponse[] }>(fullPath, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
        })
        .then((res) => res.data);

    if (data.data.length === 0) return null;
    return data.data[0];
}

function parseArticle(a: StrapiPostShortResponse): PostBrief {
    return {
        title: a.attributes.title,
        slug: a.attributes.slug,
        date: a.attributes.createdAt,
        description: a.attributes.description,
    };
}
export async function fetchArticleBriefs(page = 1) {
    return getAllArticles(page, 10).then((res) => ({
        pagination: res.meta.pagination,
        articles: res.data.map(parseArticle),
    }));
}

type StrapiContent<T> = {
    id: number;
    attributes: T & StrapiTimestamp;
};

export type GlobalContent = {
    about: AboutContent;
    projects: ProjectContent[];
};

type StrapiTimestamp = {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type AboutContent = StrapiContent<{
    aboutText: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}>;

export type ProjectContent = StrapiContent<{
    title: string;
    description: string;
    repoLink: string;
    liveLink: string;
    brief: string;
    desktopPreview: { data: StrapiImage };
    mobilePreview: { data: StrapiImage };
    fullDesktop?: { data: StrapiImage };
    mockup: { data?: StrapiImage };
}>;

export type StrapiImage = StrapiContent<{
    alternativeText: string;
    width: number;
    height: number;
    url: string;
}>;
