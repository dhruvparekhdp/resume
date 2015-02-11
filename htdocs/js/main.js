requirejs.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'lib/jquery-1.11.1.min',
        'jquery_hashchange': 'lib/jquery.ba-hashchange.min',
        'jquery_fancybox': 'lib/jquery.fancybox.min',
        'jquery_tinyscrollbar': 'lib/jquery.tinyscrollbar.min',
        'underscore': 'lib/underscore-min'
    },
    shim: {
        //'jquery': {
        //    exports: 'jQuery'
        //},
        'jquery_hashchange': {
            deps: ['jquery']
        },
        'jquery_fancybox': {
            deps: ['jquery']
        },
        'jquery_tinyscrollbar': {
            deps: ['jquery']
        },
        'underscore': {
            exports: '_'
        }
    }
});


require(['resume']);

