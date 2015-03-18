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
			jqueryjs: {
				expand: true,
				cwd: 'bower_components/jquery/dist/',
				src: ['*.min.js'],
				dest: 'dist/js/'
			},
			bootstrapjs: {
				expand: true,
				cwd: 'bower_components/bootstrap/dist/js/',
				src: ['*.min.js'],
				dest: 'dist/js/'
			},
			srcjs: {
				expand: true,
				cwd: 'src/js',
				src: ['*.js'],
				dest: 'dist/js/'
			},
			srccss: {
				expand: true,
				cwd: 'src/css',
				src: ['*.css'],
				dest: 'dist/css/'
			},
			html5shiv: {
				expand: true,
				cwd: 'bower_components/html5shiv/',
				src: '*.min.js',
				dest: 'dist/js/'
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
			js: ['dist/js/*.js', '!dist/js/*.min.js'],
			zip: ['*zip']
		},
		jshint:{
			src:{
				files: {
					src: ['src/js/*.js']
				} 
			},
			concat:{
				files: {
					src: ['dist/js/redbone.js']
				}
			}
		},
		concat: {
			src:{
				files:{
					'dist/js/redbone.js': ['src/js/*.js']
				}
			}
		},
		uglify:{
			options: {
				mangle:false
			},
			src: {
				files: {
					'dist/js/redbone.js': ['dist/js/redbone.js']
				}
			}
		},
		csslint:{
			src: {
				files: {
					src: ['src/css/style.css']
				}
			}
		},
		cssmin:{
			src: {
				files: {
					'dist/css/style.min.css': ['src/css/style.css']
				}
			}
		},
		compress:{
			distWin32: {
				options: {
					archive:'redboneWin32.zip'
				},
				files:[
				{expand:true,cwd:'nwWin32/',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['nedb/**'],dest:'node_modules/'}
				]
			},
			distLinux32: {
				options: {
					archive:'redboneLinux32.zip'
				},
				files:[
				{expand:true,cwd:'nwLinux32/',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['nedb/**'],dest:'node_modules/'}
				]
			},
			distOsx32: {
				options: {
					archive:'redboneOsx32.zip'
				},
				files:[
				{expand:true,cwd:'nwOsx32/',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['nedb/**'],dest:'node_modules/'}
				]
			}
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
	//grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-watch');

	if(process.env.DEV == 'true'){
		grunt.registerTask('js', ['copy:angularjs', 'copy:angularRoutejs', 'copy:html5shiv', 'copy:bootstrapjs', 'copy:jqueryjs', 'jshint:src', 'concat:src', 'jshint:concat']);
	}else{
		grunt.registerTask('js', ['copy:angularjs', 'copy:angularRoutejs', 'copy:html5shiv', 'copy:bootstrapjs', 'copy:jqueryjs', 'jshint:src', 'concat:src', 'jshint:concat', 'uglify']);
	}
	
	grunt.registerTask('css', ['copy:bootstrapcss', 'copy:bootstrapfonts', 'csslint', 'cssmin']);
	grunt.registerTask('html', ['htmlmin']);
	grunt.registerTask('dist', ['default', 'compress', 'clean:dist'])
	grunt.registerTask('default', ['css', 'js', 'html']);
};