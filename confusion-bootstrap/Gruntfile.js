'use strict';

module.exports = function(grunt){
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Define the configuration for all the tasks
    const sass = require('node-sass');
    grunt.initConfig({
        
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        copy :{
            html: {
                files: [
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [
                    {
                        //for font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }
                ]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand:true,
                    cwd: './',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        watch: {
            files: "css/*.scss",
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html','contactus.html','aboutus.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block) {
                            var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },

        //Concat
        concat: {
            options: {
                separator: ';'
            },

            //dist configuration is provided by useminPrepare
            dist: {}
        },

        //Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
        usemin: {
            html: ['dist/index.html','dist/contactus.html','dist/aboutus.html'],
            options: {
                assetsDirs: ['dist', 'dist/css', 'dist/js']
            }
        }
    });

    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync', 'watch']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);
};