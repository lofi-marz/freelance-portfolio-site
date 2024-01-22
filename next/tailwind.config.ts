import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';
import reactAria from 'tailwindcss-react-aria-components';
import plugin from 'tailwindcss/plugin';
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
    plugins: [
        typography,
        reactAria,
        plugin(function ({ addUtilities, theme }) {
            addUtilities({
                '.light': {
                    '--theme': theme('colors.light'),
                    '--theme-invert': theme('colors.dark'),
                },
                '.dark': {
                    '--theme': theme('colors.dark'),
                    '--theme-invert': theme('colors.light'),
                },
            });
        }),
        plugin(function ({ addUtilities, matchUtilities, theme }) {
            addUtilities({
                '.card-outline': {
                    'border-radius': '9999px',
                    borderColor: theme('colors.light'),
                    borderWidth: theme('borderWidth.DEFAULT'),
                    backgroundColor: 'transparent',
                },
            });
            matchUtilities(
                {
                    'card-solid': (value) => ({
                        'border-radius': '9999px',
                        backgroundColor: value,
                        textColor: theme('colors.light'),
                    }),
                    'card-theme-solid': (value) => ({
                        'border-radius': '9999px',
                        backgroundColor: value,
                        textColor: theme('colors.theme'),
                    }),
                    'card-theme-invert-solid': (value) => ({
                        'border-radius': '9999px',
                        backgroundColor: value,
                        textColor: theme('colors.theme-invert'),
                    }),
                },
                { values: theme('colors') }
            );
        }),
    ],
} satisfies Config;

export default theme;
