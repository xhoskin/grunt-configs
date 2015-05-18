module.exports = function(grunt) {
 
    grunt.registerTask('default', [ 'watch' ]);

    grunt.initConfig({
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'server.ru',
                    authKey: 'key1'
                },
                src: 'src/',
                dest: 'public_html/wp-content/themes/kaster/',
                exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
            }
        },
        less: {
            style: {
                options: {
                    sourceMap:false,
                    compress: true,
                    cleancss: false
                },
                files: {
                    "src/style.css": "src/style.less"
                }
            }
        },
        watch: {
            css: {
                files: ['src/*.less'],
                tasks: ['less:style']
            },
            deploy: {
                files: ['src/*.css', 'src/*.less', 'src/js/*' ],
                tasks: ['ftp-deploy']
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-ftp-deploy');
};
