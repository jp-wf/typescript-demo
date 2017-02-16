SystemJS.config({
    packages: {
        '/': {
            defaultExtension: 'js'
        }
    },
    paths: {
        'jasmine': 'lib/jasmine-2.4.1/jasmine.js'
    }
});

(function () {
    Promise.all([
        SystemJS.import('../core/page-viewer.spec')
    ])
        .then(window.onload)
        .catch(console.error.bind(console));
})();