/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.omarileon.me',
    generateRobotsTxt: true,
    exclude: [
        '/blog-sitemap.xml',
        '/blog/*',
        '/category/*',
        '/ruby',
        '/spotify-login',
    ],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://www.omarileon.me/blog-sitemap.xml', // <==== Add here
        ],
    },
};
