module.exports = function(grunt) {
    grunt.initConfig({
        // running `grunt less` will compile once
        less: {
            development: {
                options: {
                    paths: ["./htdocs/css"],
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    "./htdocs/css/resume.css": "./htdocs/css/resume.less"
                }
            }
        },

        //karma: {
        //    unit: {
        //        configFile: 'test/js/config/karma.unit.js',
        //        singleRun: false
        //    }
        //},

        // running `grunt watch` will watch for changes
        watch: {
            files: "./htdocs/css/*.less",
            tasks: ["less"],
            //run unit tests with karma (server needs to be already running)
            karma: {
                files: ['app/js/**/*.js', 'test/browser/**/*.js'],
                tasks: ['karma:unit:run'] //NOTE the :run flag
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "htdocs/js",
                    mainConfigFile: "htdocs/js/main.js",
                    out: "htdocs/js/scripts.js",
                    include: ["main"],
                    // we have external resources so we can't use almond
                    name: "lib/require/almond", // assumes a production build using almond
//                    name: "lib/require/require",
//                    optimize: "none" // "none", default "uglify"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-karma');
};
