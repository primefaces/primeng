/** @type {import('tailwindcss').Config} */
const primeui = require('tailwindcss-primeui');
module.exports = {
    corePlugins: {
        preflight: false
    },
    darkMode: ['selector', '[class="p-dark"]'],
    content: ['./components/**/*.{html,ts,scss,css}', './doc/**/*.{html,ts,scss,css}', './pages/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [primeui],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};
