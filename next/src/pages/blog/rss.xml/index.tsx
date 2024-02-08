import RSS from 'rss';
import { GetServerSideProps } from 'next';
import { getAllArticles } from '@/utils/strapi';
import { StrapiPostShortResponse } from 'types';
export default function Rss() {}
function buildRssItems(entries: StrapiPostShortResponse[]) {
    return entries
        .map((item) => {
            return `
          <item>
            <title>${item.attributes.title}</title>
            <author>Omari</author>
            <link>https://www.omarileon.me/blog/${item.attributes.slug}</link>
            <guid>https://www.omarileon.me/blog/${item.attributes.slug}</guid>
            <pubDate>${item.attributes.createdAt}</pubDate>
          </item>
          `;
        })
        .join('');
}
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const entries = (await getAllArticles(0, 10000)).data;
    const SITE_URL = 'https://www.omarileon.me';
    const feedOptions: RSS.FeedOptions = {
        title: 'blog by mari.',
        description:
            'TypeScript, JavaScript, React and general web development tutorials, as well as anything I find interesting.',
        feed_url: `${SITE_URL}/blog/rss.xml`,
        site_url: SITE_URL,
    };
    const feed = new RSS(feedOptions);
    entries.map(({ attributes }) =>
        feed.item({
            title: attributes.title,
            description: attributes.description,
            url: `${SITE_URL}/blog/${attributes.slug}`,
            date: attributes.createdAt,
        })
    );
    /*const rssFeed = `<?xml version="1.0"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>mari.</title>
    <link>https://www.omarileon.me</link>
    <description>mari. is my personal blog covering TypeScript, JavaScript, React and general web development tutorials.</description>
    ${buildRssItems(entries)}
    
  
   </channel>
  </rss>`;*/
    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(feed.xml({ indent: true }));
    res.end();
    return { props: {} };
};
