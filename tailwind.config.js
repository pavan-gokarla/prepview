const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'green-blue-day-blue-600': 'var(--green-blue-day-blue-600)',
                'day-blue-blue-green-600': 'var(--day-blue-blue-green-600)',
                'green-blue-day-blue-500': 'var(--green-blue-day-blue-500)',
                'day-blue-blue-green-500': 'var(--day-blue-blue-green-500)',
                'green-blue-500': 'var(--green-blue-500)',
                'blue-green-500': 'var(--blue-green-500)',
                'glass-fill': 'var(--glass-fill)',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.bg-green-blue-day-blue-600': {
                    backgroundImage: 'var(--green-blue-day-blue-600)',
                },
                '.bg-day-blue-blue-green-600': {
                    backgroundImage: 'var(--day-blue-blue-green-600)',
                },
                '.bg-green-blue-day-blue-500': {
                    backgroundImage: 'var(--green-blue-day-blue-500)',
                },
                '.bg-day-blue-blue-green-500': {
                    backgroundImage: 'var(--day-blue-blue-green-500)',
                },
                '.bg-green-blue-500': {
                    backgroundImage: 'var(--green-blue-500)',
                },
                '.bg-blue-green-500': {
                    backgroundImage: 'var(--blue-green-500)',
                },
                '.bg-glass-fill': {
                    backgroundImage: 'var(--glass-fill)',
                },
            });
        }),
    ],
};