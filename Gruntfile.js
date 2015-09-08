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
				src: ['*.min.js*'],
				dest: 'dist/js/'
			},
			angularRoutejs: {
				expand: true,
				cwd: 'bower_components/angular-route/',
				src: ['*.min.js*'],
				dest: 'dist/js/'
			},
			jqueryjs: {
				expand: true,
				cwd: 'bower_components/jquery/dist/',
				src: ['*.min.js', '*.min.map'],
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
			nw: ['nw'],
			compress: ['*.zip','*.tar.gz']
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
			win32: {
				options: {
					archive:'redboneWin32.zip'
				},
				files:[
				{expand:true,cwd:'nw/nwjs-v0.12.0-win-ia32',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['dateformat/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['csv-parse/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['pdfkit/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['open/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['userdir/**'],dest:'node_modules/'},
				{expand:true,cwd:'.',src:['data/**'],dest:'.'}
				]
			},
			linux32: {
				options: {
					archive:'redboneLinux32.tar.gz'
				},
				files:[
				{expand:true,cwd:'nw/nwjs-v0.12.0-linux-ia32',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['dateformat/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['csv-parse/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['pdfkit/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['open/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['userdir/**'],dest:'node_modules/'},
				{expand:true,cwd:'.',src:['data/**'],dest:'.'}
				]
			},
			osx32: {
				options: {
					archive:'redboneOsx32.zip'
				},
				files:[
				{expand:true,cwd:'nw/nwjs-v0.12.0-osx-ia32',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['dateformat/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['csv-parse/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['pdfkit/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['open/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['userdir/**'],dest:'node_modules/'},
				{expand:true,cwd:'.',src:['data/**'],dest:'.'}
				]
			},
			win64: {
				options: {
					archive:'redboneWin64.zip'
				},
				files:[
				{expand:true,cwd:'nw/nwjs-v0.12.0-win-x64',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['dateformat/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['csv-parse/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['pdfkit/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['open/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['userdir/**'],dest:'node_modules/'},
				{expand:true,cwd:'.',src:['data/**'],dest:'.'}
				]
			},
			linux64: {
				options: {
					archive:'redboneLinux64.tar.gz'
				},
				files:[
				{expand:true,cwd:'nw/nwjs-v0.12.0-linux-x64',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['dateformat/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['csv-parse/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['pdfkit/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['open/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['userdir/**'],dest:'node_modules/'},
				{expand:true,cwd:'.',src:['data/**'],dest:'.'}
				]
			},
			osx64: {
				options: {
					archive:'redboneOsx64.zip'
				},
				files:[
				{expand:true,cwd:'nw/nwjs-v0.12.0-osx-x64',src:['**'],dest:'.'},
				{expand:true,cwd:'dist/',src:['**'],dest:'dist/'},
				{expand:true,cwd:'.',src:['package.json','dog.png','LICENSE'],dest:'.'},
				{expand:true,cwd:'node_modules/',src:['dateformat/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['csv-parse/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['pdfkit/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['open/**'],dest:'node_modules/'},
				{expand:true,cwd:'node_modules/',src:['userdir/**'],dest:'node_modules/'},
				{expand:true,cwd:'.',src:['data/**'],dest:'.'}
				]
			}
		},
		wget: {
			win32:{
				files:{
					'nw/win32.zip': 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-win-ia32.zip'
				}
			},
			linux32:{
				files:{
					'nw/linux32.tar.gz': 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-linux-ia32.tar.gz'
				}
			},
			osx32:{
				files:{
					'nw/osx32.zip': 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-osx-ia32.zip'
				}
			},
			win64:{
				files:{
					'nw/win64.zip': 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-win-x64.zip'
				}
			},
			linux64:{
				files:{
					'nw/linux64.tar.gz': 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-linux-x64.tar.gz'
				}
			},
			osx64:{
				files:{
					'nw/osx64.zip': 'http://dl.nwjs.io/v0.12.0/nwjs-v0.12.0-osx-x64.zip'
				}
			}
		},
		untar:{
			linux32:{
				files:{
					'nw/': 'nw/linux32.tar.gz'
				}
			},
			linux64:{
				files:{
					'nw/': 'nw/linux64.tar.gz'
				}
			}
		},
		unzip:{
			win32:{
				files:{
					'nw/': 'nw/win32.zip'
				}
			},
			win64:{
				files:{
					'nw/': 'nw/win64.zip'
				}
			},
			osx32:{
				files:{
					'nw/': 'nw/osx32.zip'
				}
			},
			osx64:{
				files:{
					'nw/': 'nw/osx64.zip'
				}
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
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-wget');
	grunt.loadNpmTasks('grunt-untar');
	grunt.loadNpmTasks('grunt-zip');

	if(process.env.DEV == 'true'){
		grunt.registerTask('js', ['copy:angularjs', 'copy:angularRoutejs', 'copy:html5shiv', 'copy:bootstrapjs', 'copy:jqueryjs', 'jshint:src', 'concat:src', 'jshint:concat']);
	}else{
		grunt.registerTask('js', ['copy:angularjs', 'copy:angularRoutejs', 'copy:html5shiv', 'copy:bootstrapjs', 'copy:jqueryjs', 'jshint:src', 'concat:src', 'jshint:concat', 'uglify']);
	}
	
	grunt.registerTask('css', ['copy:bootstrapcss', 'copy:bootstrapfonts', 'csslint', 'cssmin']);
	grunt.registerTask('html', ['htmlmin']);
	grunt.registerTask('win32', ['default', 'wget:win32', 'unzip:win32', 'compress:win32', 'clean:dist']);
	grunt.registerTask('linux32', ['default', 'wget:linux32', 'untar:linux32', 'compress:linux32', 'clean:dist']);
	grunt.registerTask('osx32', ['default', 'wget:osx32', 'unzip:osx32', 'compress:osx32', 'clean:dist']);
	grunt.registerTask('win64', ['default', 'wget:win64', 'unzip:win64', 'compress:win64', 'clean:dist']);
	grunt.registerTask('linux64', ['default', 'wget:linux64', 'untar:linux64', 'compress:linux64', 'clean:dist']);
	grunt.registerTask('osx64', ['default', 'wget:osx64', 'unzip:osx64', 'compress:osx64', 'clean:dist']);
	grunt.registerTask('dist', ['default', 'wget', 'unzip', 'untar', 'compress', 'clean:dist']);
	grunt.registerTask('default', ['css', 'js', 'html']);
};