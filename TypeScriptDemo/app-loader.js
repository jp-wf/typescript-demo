// set our baseURL reference path
SystemJS.config({
    packages: {
        '/': {
            main: 'app.js',
            defaultExtension: 'js'
        }
    }
});

SystemJS.import('/');