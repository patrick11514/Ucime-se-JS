import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            colors: {
                text: '#0e1119',
                background: '#f2f4f9',
                primary: '#5e77ba',
                secondary: '#9aacda',
                accent: '#728cd2'
            }
        }
    },

    plugins: []
} satisfies Config;
