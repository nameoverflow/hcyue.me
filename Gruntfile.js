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
                files: 'src/script/*.js',
                tasks: ['babel'],
                options: {
                    livereload: false,
                },
            },
            css: {
                files: '**/*.sass',
                tasks: ['sass'],
                options: {
                    livereload: false,
                },
            },
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/script/*.js': 'src/script/*.js'
                    'public/script/*.jsx': 'src/script/*.js'

                }
            }
        }
    });

    // 从node_modules目录加载模块文件
    /*
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    */
    grunt.loadNpmTasks('grunt-babel');

    // 每行registerTask定义一个任务
    // grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    // grunt.registerTask('check', ['jshint']);
    grunt.registerTask('c', ['babel']);


};
