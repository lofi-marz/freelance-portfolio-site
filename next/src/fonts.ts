import {
    DM_Sans,
    IBM_Plex_Sans,
    Inter,
    Poppins,
    PT_Sans,
    Rubik,
    Vollkorn,
    Lexend,
    Work_Sans,
} from 'next/font/google';

export const title = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-title',
});
export const body = Vollkorn({
    subsets: ['latin'],
    variable: '--font-body',
});
