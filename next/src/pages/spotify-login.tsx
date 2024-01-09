import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import axios from 'axios';
import qs from 'qs';
import crypto from 'crypto';
import {
    GetAuthorizeResponse,
    getSpotifyAuthLink,
    getSpotifyTokenFromLogin,
    PostTokenResponse,
    SpotifyToken,
    verifier,
} from '../utils/spotify';
export default function SpotifyLogin({
    authLink,
    token,
}: {
    authLink: string;
    token?: SpotifyToken;
}) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-dark">
            <div className="prose prose-invert flex flex-col items-center justify-center bg-dark">
                <p>
                    I&apos;m just using this page to get my spotify token. If
                    you&apos;re here, hi!
                </p>
                <a href={authLink}>Link</a>
                {token && <p>Token: {JSON.stringify(token)}</p>}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    //TODO: Make this store in/pull the token from strapi
    const spotifyId = process.env.SPOTIFY_CLIENT_ID;

    const { code, error, state } = query as GetAuthorizeResponse;
    //TODO: Verify state
    if (error) console.log(error);
    if (!error && code && verifier) {
        console.log('Using verifier:', verifier);
        const token = await getSpotifyTokenFromLogin(
            code,
            verifier,
            state
        ).catch((e) => console.log(e));
        console.log('Token:', token);
        const authLink = await getSpotifyAuthLink().catch((e) =>
            console.log(e)
        );

        console.log('Code:', code);

        return { props: { authLink, token } };
    }
    const authLink = await getSpotifyAuthLink();

    return { props: { authLink } };
};
