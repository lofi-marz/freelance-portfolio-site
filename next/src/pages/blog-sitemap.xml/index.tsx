import {
    ISitemapField,
    getServerSideSitemapIndexLegacy,
    getServerSideSitemapLegacy,
} from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getAllArticles } from '@/utils/strapi';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const entries: ISitemapField[] = (await getAllArticles(0, 10000)).data.map(
        (a) =>
            ({
                loc: 'https://omarileon.me/blog/' + a.attributes.slug,
                lastmod: a.attributes.createdAt,
            }) satisfies ISitemapField
    );

    return getServerSideSitemapLegacy(ctx, entries);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
