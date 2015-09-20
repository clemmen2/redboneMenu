module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            src: {
                files: {
                    src: ['js/**']
                }
            }
        },
        copy: {
            html: {
                files: [
                    { expand: true, src: 'index.html', dest: 'dist/' }
                ]
            },
            tmpl: {
                files: [
                    { expand: true, src: 'tmpl/*.html', dest: 'dist/' }
                ]
            },
            data: {
                files: [
                    { expand: true, src: 'data/*.txt', dest: 'dist/' }
                ]
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: 'dist/index.html'
        },
        clean: {
            dist: ['dist/'],
            zip: ['*.zip']
        },
        unzip: {
            win32: {
                files: {
                    'nw/': 'nw/win32.zip'
                }
            }
        },
        compress: {
            win32: {
                options: {
                    archive: 'redboneWin32.zip'
                },
                files: [
				{ expand: true, cwd: 'nw/nwjs-v0.12.3-win-ia32', src: ['**'], dest: '.' },
				{ expand: true, cwd: 'dist/', src: ['**'], dest: '.' },
				{ expand: true, cwd: '.', src: ['package.json', 'dog.png', 'dog.ico', '../LICENSE'], dest: '.' },
				{ expand: true, cwd: 'node_modules/', src: ['dateformat/**'], dest: 'node_modules/' },
				{ expand: true, cwd: 'node_modules/', src: ['csv-parse/**'], dest: 'node_modules/' },
				{ expand: true, cwd: 'node_modules/', src: ['pdfkit/**'], dest: 'node_modules/' },
				{ expand: true, cwd: 'node_modules/', src: ['open/**'], dest: 'node_modules/' },
				{ expand: true, cwd: 'node_modules/', src: ['userdir/**'], dest: 'node_modules/' },
                { expand: true, cwd: 'bower_components/bootstrap/dist/', src: ['fonts/**'], dest: '.' }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-wget');
    grunt.registerTask('default', ['jshint:src']);
    grunt.registerTask('build', ['copy', 'jshint:src', 'useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 'usemin', 'compress']);
};