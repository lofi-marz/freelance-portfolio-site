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

export const title = Rubik({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-title',
});
export const body = Inter({
    subsets: ['latin'],
    variable: '--font-body',
});
