import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            colors: {
                text: '#071b1d',
                background: '#f3fbfc',
                primary: '#41c9d2',
                secondary: '#87e9ee',
                accent: '#5de8ef'
            }
        }
    },

    plugins: [typography]
} satisfies Config;
