/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://omarileon.me',
    generateRobotsTxt: true,
    exclude: ['/blog-sitemap.xml', '/blog/*', '/category/*'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://omarileon.me/blog-sitemap.xml', // <==== Add here
        ],
    },
};
