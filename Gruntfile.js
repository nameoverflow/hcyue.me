module.exports = function (grunt) {

    grunt.initConfig({
        /*
        jshint: {},
        concat: {},
        uglify: {},
        watch:  {}
        */
        watch: {
            scripts: {
                files: ['script/**.js', 'script/**.jsx', 'script/**/*.js', 'script/**/*.jsx'],
                tasks: ['babel', 'browserify'],
                options: {
                    livereload: false,
                },
            },
            css: {
                files: [
                    'src/**/*.scss',
                    'src/**/*.sass'
                ],
                tasks: ['sass'],
                options: {
                    livereload: false,
                },
            },
        },
        babel: {
            options: {
                sourceMap: true,
                modules: 'common'
            },
            dist: {
                files: [{
                    'expand': true,
                    'cwd': 'src/',
                    'src': ['script/**.js', 'script/**.jsx', 'script/**/*.js', 'script/**/*.jsx'],
                    'dest': 'build/',
                    'ext': '.js'
                }]
            }
        },
        browserify: {
            build: {
                src: 'build/script/main.js',
                dest: 'public/script/main.js'
                // files: {
                //     'expand': true,
                //     'cwd': 'build/',
                //     'src': '**/script/main.js',
                //     'dest': 'public/',
                //     'ext': '.js'
                // }
            }
        },
        uglify: {
            com: {
                src: 'public/script/main.js',
                dest: 'public/release/script/main.min.js'
            }
        },
        sass: {
            options: {
                sourceMap: false,
            },

            dist: {
                files: [{
                    'expand': true,
                    'cwd': 'src/',
                    'src': 'style/style.sass',
                    'dest': 'public/',
                    'ext': '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('c', ['babel', 'browserify', 'sass']);
    grunt.registerTask('p', ['uglify']);
    grunt.registerTask('cp', ['babel', 'browserify', 'sass', 'uglify']);

    grunt.registerTask('w', ['watch']);

};
