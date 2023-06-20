import axios from 'axios';
import path from 'path';
import qs from 'qs';
import { SpotifyToken } from './spotify';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337/api/';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';
const STRAPI_SPOTIFY_TOKEN = process.env.STRAPI_SPOTIFY_TOKEN;

export async function getStrapiContent<T>(
    apiPath: string,
    params: Record<string, unknown> = {},
    token = STRAPI_TOKEN
): Promise<T | undefined> {
    return axios
        .get<{ data: T }>(
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
            return undefined; //TODO: Do I need to do this
        });
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
    const res = await getStrapiContent<{ attributes: { code: string } }>(
        'spotify-code',
        {},
        STRAPI_SPOTIFY_TOKEN
    );
    console.log('Code:', res);
    return res!.attributes.code;
}

export async function getSpotifyToken() {
    const res = await getStrapiContent<{ attributes: { token: SpotifyToken } }>(
        'spotify-token',
        {},
        STRAPI_SPOTIFY_TOKEN
    );
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
}>;

export type StrapiImage = StrapiContent<{
    alternativeText: string;
    width: number;
    height: number;
    url: string;
}>;
