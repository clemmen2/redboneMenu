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
			bootstrapfonts: {
				expand: true,
				cwd: 'bower_components/bootstrap/dist/fonts/',
				src: '*',
				dest: 'dist/fonts'
			},
			angularjs: {
				expand: true,
				cwd: 'bower_components/angular/',
				src: ['*.min.js'],
				dest: 'dist/js/'
			},
			angularRoutejs: {
				expand: true,
				cwd: 'bower_components/angular-route/',
				src: ['*.min.js'],
				dest: 'dist/js/'
			},
			srcjs: {
				expand: true,
				cwd: 'src/js',
				src: ['*.js'],
				dest: 'dist/js/'
			},
			html5shiv: {
				expand: true,
				cwd: 'bower_components/html5shiv/',
				src: '*.min.js',
				dest: 'dist/js/'
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
				files: [
					{
						expand: true,     // Enable dynamic expansion.
						cwd: 'src/',      // Src matches are relative to this path.
						src: ['**/*.html'], // Actual pattern(s) to match.
						dest: 'dist/',   // Destination path prefix.
						ext: '.html'   // Dest filepaths will have this extension.
					}
				]
			}
		},
		clean:{
			dist: ['dist'],
			css: ['dist/css/*.css', '!dist/css/*.min.css']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	//grunt.loadNpmTasks('grunt-contrib-compress');
	//grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-less');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('css', ['copy:bootstrapcss', 'copy:bootstrapfonts']);
	grunt.registerTask('js', ['copy:angularjs', 'copy:angularRoutejs', 'copy:html5shiv', 'copy:srcjs']);
	grunt.registerTask('html', ['htmlmin']);
	grunt.registerTask('default', ['css', 'js', 'html']);
};