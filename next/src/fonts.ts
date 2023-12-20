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
//['400', '500', '600', '700']
export const title = Work_Sans({
    subsets: ['latin'],
    weight: 'variable',
    variable: '--font-title',
});
export const body = Vollkorn({
    subsets: ['latin'],
    variable: '--font-body',
});
