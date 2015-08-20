module.exports = function (grunt) {

    // 配置Grunt各种模块的参数
    grunt.initConfig({
        /*
        jshint: {},
        concat: {},
        uglify: {},
        watch:  {}
        */
        watch: {
            scripts: {
                files: [
                    'src/script/**/*.js',
                    'src/script/**/*.jsx',
                    'src/script/*.js',
                    'src/script/*.jsx'                    
                ],
                tasks: ['babel', 'browserify'],
                options: {
                    livereload: false,
                },
            },
            css: {
                files: [
                    'src/style/**/*.sass',
                    'src/style/*.sass',                    
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
                    'cwd': 'src/script/',
                    'src': ['**/*.js', '**/*.jsx'],
                    'dest': 'build/',
                    'ext': '.js'
                }]
            }
        },
        browserify: {
            build: {
                src: 'build/main.js',
                dest: 'public/script/main.js'
            }
        },
        uglify: {
            com: {
                src: 'public/script/main.js',
                dest: 'public/script/main.min.js'
            }
        },
        sass: {
            options: {
                sourceMap: false,
            },

            dist: {
                files: [{
                    'expand': true,
                    'cwd': 'src/style/',
                    'src': ['main.sass'],
                    'dest': 'public/style/',
                    'ext': '.css'
                }]
            }
        }
    });

    // 从node_modules目录加载模块文件
    /*
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');

    // 每行registerTask定义一个任务
    // grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    // grunt.registerTask('check', ['jshint']);
    grunt.registerTask('c', ['babel', 'browserify', 'sass']);
    grunt.registerTask('p', ['uglify']);
    grunt.registerTask('cp', ['babel', 'browserify', 'sass', 'uglify']);
    
    grunt.registerTask('w', ['watch']);

};
