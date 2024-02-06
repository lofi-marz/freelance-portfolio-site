/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: NextRequest) {
    // Make sure the font exists in the specified path:

    try {
        /*const interRegularData = await fetch(
            new URL('../../assets/Inter-Regular.ttf', import.meta.url)
        ).then((res) => res.arrayBuffer());*/
        const interBoldData = await fetch(
            new URL('../../assets/Inter-Bold.ttf', import.meta.url)
        ).then((res) => res.arrayBuffer());

        const imageData = await fetch(
            new URL('./../../assets/og-bg.webp', import.meta.url)
        ).then((res) => res.arrayBuffer());
        //console.log('Url:', request.url);
        console.log('Request:', request);
        const { searchParams } = new URL(request.url);
        // ?title=<title>

        const title =
            searchParams.get('title') ??
            'Demystifying TypeScript: The Difference Between == and === Explained';

        let categories = searchParams.getAll('categories') ?? ([] as string[]);
        console.log(categories);
        if (!Array.isArray(categories)) categories = [categories];
        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        height: '100%',
                        width: '100%',
                        fontSize: 20,
                        fontFamily: '"Inter Bold"',
                        paddingTop: '100px',
                        paddingLeft: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        padding: '5%',
                    }}>
                    <img
                        width="1200"
                        height="630"
                        tw="absolute bottom-0 left-0"
                        alt=""
                        src={imageData as unknown as string}
                    />
                    <h2
                        tw="absolute top-[5%] right-[5%]"
                        style={{ fontFamily: '"Inter Bold"' }}>
                        omarileon.me
                    </h2>
                    <h1 tw="text-start" style={{ fontFamily: '"Inter Bold"' }}>
                        {title}
                    </h1>
                    <ul tw="flex flex-row space-y-2">
                        {categories.map((c) => (
                            <li
                                key={c}
                                tw="rounded bg-red-400 px-2 mx-1 py-1 capitalize">
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Inter Bold',
                        data: interBoldData,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response('Failed to generate the image', {
            status: 500,
        });
    }
}
