module.exports = function(grunt) {
 
    require('time-grunt')(grunt);

    grunt.registerTask('default', [ 'jade:all', 'webfont', 'less', 'watch' ]);
    grunt.registerTask('server', [ 'connect', 'less', 'watch' ]);
    grunt.registerTask('jade', [ 'watch:jade' ]);
    grunt.registerTask('webfont', ['webfont']);
    grunt.registerTask('lesslint', ['lesslint']);
    //grunt.registerTask('lite', [ 'watch:js', 'watch:images', 'watch:css', 'watch:jade' ]);
    //grunt.registerTask('clean', [ 'clean' ]);
    //grunt.registerTask('push', ['concat:js', 'sprite:all', 'less:style', 'jade:compile', 'jade:all', 'sync:img', 'sync:js', 'prettify:all']);
    //grunt.registerTask('comb', ['csscomb:less']);

    grunt.initConfig({
        dirs: {
            base: {
                src: 'source/',
                out: 'web/'
            },
            css: {
                src: '<%= dirs.base.src %>less/',
                out: '<%= dirs.base.out %>css/',
                webPath: '/css/'
            },
            js: {
                src: '<%= dirs.base.src %>js/',
                out: '<%= dirs.base.out %>js/'
            },
            images: {
                src: '<%= dirs.base.src %>images/',
                out: '<%= dirs.base.out %>images/'
            },
            jade: {
                src: '<%= dirs.base.src %>jade/',
                out: '<%= dirs.base.out %>'
            },
            /*
            // in development
            html: {
                base: {
                    src: 'source/',
                    out: 'web/'
                },
                css: {
                    src: '<%= dirs.html.base.src %>less/',
                    out: '<%= dirs.html.base.out %>css/',
                    webPath: '/css/'
                },
                js: {
                    src: '<%= dirs.html.base.src %>js/',
                    out: '<%= dirs.html.base.out %>js/'
                },
                images: {
                    src: '<%= dirs.html.base.src %>images/',
                    out: '<%= dirs.html.base.out %>images/'
                },
                jade: {
                    src: '<%= dirs.html.base.src %>jade/',
                    out: '<%= dirs.html.base.out %>'
                },
            },
            symfony2: {
                base: {
                    src: '../../src/Artsofte/MainBundle/Resources/public/',
                    out: '../../src/Artsofte/MainBundle/Resources/public/'
                },
                css: {
                    src: '<%= dirs.symfony2.base.src %>less/',
                    out: '<%= dirs.symfony2.base.out %>css/'
                }
            },
            */
        },
        sprite: {
            normal: {
                src: ['<%= dirs.images.src %>/sprites/*.png'],
                dest: '<%= dirs.images.out %>sprite.png',
                destCss: '<%= dirs.css.src %>_sprites.less',
                algorithm: 'binary-tree',
                padding: 2,
                cssFormat: 'less'
            },
            retina: {
                src: ['<%= dirs.images.src %>/sprites@2x/*.png'],
                dest: '<%= dirs.images.out %>sprite_2x.png',
                destCss: '<%= dirs.css.src %>_sprites_2x.less',
                algorithm: 'binary-tree',
                padding: 4,
                cssFormat: 'less'
            }
        },
        less: {
            options: {
                compress: true,
                cleancss: false,
                sourceMap: true,
                sourceMapBasepath: '<%= dirs.css.webPath %>',       
                //sourceMapURL:      '<%= dirs.css.webPath %>style.css.map', // the complete url and filename put in the compiled css file
                //sourceMapRootpath: '../source/less',                        // adds this path onto the sourcemap filename and less file paths
            },
            main: {
                options: {
                    sourceMapFilename: '<%= dirs.css.webPath %>style.css.map', 
                },
                files: {
                    "<%= dirs.css.out %>style.css":     "<%= dirs.css.src %>style.less",
                }
            },
            bootstrap: {
                options: {
                    sourceMapFilename: '<%= dirs.css.webPath %>bootstrap.css.map', 
                },
                files: {
                    "<%= dirs.css.out %>bootstrap.css":     "<%= dirs.css.src %>bootstrap.less",
                }
            },
            other: {
                options: {
                    sourceMap: false,
                },
                files: {
                    "<%= dirs.css.out %>libs.css":      "<%= dirs.css.src %>libs.less",
                    "<%= dirs.css.out %>ie.css":        "<%= dirs.css.src %>ie.less",
                    "<%= dirs.css.out %>ie9.css":       "<%= dirs.css.src %>ie9.less",
                    "<%= dirs.css.out %>ckeditor.css":  "<%= dirs.css.src %>ckeditor.less",
                    "<%= dirs.css.out %>cms-forms.css": "<%= dirs.css.src %>cms-forms.less"
                }
            }
        },
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true,
                    data: function(dest, src) {
                        return { "img": "images/", "js": "js/", "css": "css/" }
                    }
                },
                files: [ {
                    expand: true,
                    flatten: true,
                    src: "<%= dirs.jade.src %>*.jade",
                    dest: "<%= dirs.jade.out %>",
                    ext: ".html"
                } ]
            },
        },
        webfont: {
            icons: {
                src: '<%= dirs.images.src %>font-icons/*.svg',
                dest: '<%= dirs.base.out %>fonts/',
                destCss: '<%= dirs.css.src %>',
                options: {
                    stylesheet: 'less',
                    font: 'font-icons',
                    relativeFontPath: '../fonts',
                    htmlDemo: false,
                    templateOptions: {
                        baseClass: 'font-icon',
                        classPrefix: '',
                        mixinPrefix: ''
                    }
                }
            }
        },
        /*
        // in development
        grunticon: {
            make: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.images.src %>svg/',
                    src: ['*.svg'],
                    dest: '<%= dirs.images.out %>png/',
                }],
                options: {
                    pngpath: '<%= dirs.images.out %>png/',
                }
            }
        },
        csscomb: {
            options: {
                config: '.csscomb'
            },
            less: {
                expand: true,
                cwd: '.',
                src: ['*.css', '!*.min.css'],
                dest: '.'
            }
        },
        lesslint: {
            src: ['../../src/Artsofte/MainBundle/Resources/public/less/style.less']
        },
        */
	connect: {
            livereload: {
                options: {
                    port: 9001,
                    base: 'web',
                    directory: 'web',
                }
            }
	},
        watch: {
            options: {
                livereload: 35728,
            },
            jade: {
                files: ['<%= dirs.jade.src %>*.jade'],
                tasks: ['newer:jade:compile'],
            },
            jade_includes: {
                files: ['<%= dirs.jade.src %>includes/*.jade'],
                tasks: ['jade:compile'],
            },
            less: {
                options: {
                    livereload: false,
                },
                files: ['<%= dirs.css.src %>**/*.less'],
                tasks: ['less'],
            },
            css: {
                files: ['<%= dirs.css.style %>style.css'],
                tasks: [],
            },
            font: {
                files: ['<%= dirs.images.src %>font-assets/*.svg'],
                tasks: ['webfont'],
            },
         // twig: {
         //     files: ['../../src/Artsofte/MainBundle/Resources/views/**/*.twig'],
         //     tasks: [],
         // }
         // images: {
         //     files: ['source/images/sprites/*.png'],
         //     tasks: ['sprite:all']
         // }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-newer'); 
    grunt.loadNpmTasks('grunt-webfont');
    
    // in-development tasks
    //grunt.loadNpmTasks('grunt-csscomb');
    //grunt.loadNpmTasks('grunt-lesslint');
    //grunt.loadNpmTasks('grunt-grunticon');
    
    // deprecated tasks
    //grunt.loadNpmTasks('grunt-sync');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-prettify');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    //grunt.loadNpmTasks('grunt-contrib-clean');

};

// TODO 
//
// grunt-csscomb
// grunt-lesslint
// grunt-grunticon
// path for different development platforms
