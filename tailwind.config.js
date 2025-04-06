module.exports = {
    extend: {
        // in plugins
        plugins: [
            function ({ addUtilities }) {
                addUtilities({
                    '.pointer-events-visible': {
                        'pointer-events': 'visiblePainted',
                    },
                })
            },
        ],
    },
}
