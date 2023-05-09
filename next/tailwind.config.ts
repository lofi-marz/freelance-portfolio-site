import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const theme = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                title: ['var(--font-title)', ...defaultTheme.fontFamily.sans],
                body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: colors.red[400],
                secondary: colors.orange[400],
                dark: colors.neutral,
                white: colors.neutral[50],
                black: colors.neutral[900]
            },
        },
    },
    plugins: [],
} satisfies Config;

export default theme;


