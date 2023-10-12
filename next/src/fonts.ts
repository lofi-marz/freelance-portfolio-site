import {
    DM_Sans,
    IBM_Plex_Sans,
    Inter,
    Poppins,
    PT_Sans,
    Rubik,
    Vollkorn,
    Lexend,
} from 'next/font/google';

export const title = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-title',
});
export const body = Inter({
    subsets: ['latin'],
    variable: '--font-body',
});
