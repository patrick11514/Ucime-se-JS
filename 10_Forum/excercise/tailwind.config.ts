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
            },
            fontFamily: {
                ubuntu: ['Ubuntu', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif']
            },
            gridTemplateColumns: {
                nav: '1fr auto 1fr'
            }
        }
    },

    plugins: [typography]
} satisfies Config;
