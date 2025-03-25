import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class="p-dark"]'],
    content: ['./components/**/*.{html,ts,scss,css}', './doc/**/*.{html,ts,scss,css}', './pages/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [PrimeUI],
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
