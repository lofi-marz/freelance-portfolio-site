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
                grey: colors.stone,
                light: colors.stone[50],
                dark: colors.stone[950],
                theme: 'var(--theme)',
                'theme-invert': 'var(--theme-invert)',
            },
        },
    },
    plugins: [],
} satisfies Config;

export default theme;
