module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
		'* <%= pkg.homepage %>/\n' +
		'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= pkg.license %> */',
		copy: {
			bootstrapcss: {
				expand: true,
				cwd: 'bower_components/bootstrap/dist/css/',
				src: '*.min.css',
				dest: 'dist/css/'
			},
			bootstrapjs: {
				expand: true,
				cwd: 'bower_components/bootstrap/dist/js/',
				src: '*.min.js',
				dest: 'dist/js/'
			},
			angularjs: {
				expand: true,
				cwd: 'bower_components/angular/',
				src: '*.min.js',
				dest: 'dist/js/'
			},
			jquery: {
				expand: true,
				cwd: 'bower_components/jquery/dist/',
				src: '*.min.js',
				dest: 'dist/js/'
			},
			html5shiv: {
				expand: true,
				cwd: 'bower_components/html5shiv/',
				src: '*.min.js',
				dest: 'dist/js/'
			},
			images: {
				expand:true,
				cwd: 'src/img/',
				src: ['*.svg'],
				dest: 'dist/img/'
			}
		},
		ejs: {
			all: {
				expand: true,
				cwd: 'src/',
				src: ['*.ejs'],
				dest: 'dist/',
				ext: '.html'
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'dist/index.html'
				}
			}
		},
		clean:{
			dist: ['dist'],
			css: ['dist/css/*.css', '!dist/css/*.min.css']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ejs');

	grunt.registerTask('css', ['copy:bootstrapcss']);
	grunt.registerTask('js', ['copy:bootstrapjs', 'copy:angularjs', 'copy:jquery', 'copy:html5shiv']);
	grunt.registerTask('html', ['ejs', 'htmlmin']);
	grunt.registerTask('default', ['copy:images', 'css', 'js', 'html']);
};