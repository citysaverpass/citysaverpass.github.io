module.exports = function(grunt) {
	grunt.initConfig({
	  appcache: {
	    options: {
	        // appcache is always for the distrib version not for development
	        basePath: 'app', 
	    },
	    // this target is only for components
	    mod: {
	        // it will go to bower_components from the point of view the web app
	        baseUrl: '/bower_components/<%= package.name %>',
	        // generate a partial appcache into the distrib folder
	        dest: './manifest.appcache',
	        cache: {
	            patterns: [
	                // add all css, js and assets of my components
	                'app/*',
	                // but not informational files
	                '!dist/bower.json',
	                '!dist/CHANGELOG.md',
	                '!dist/README.md'
	            ],
	        },
	        network: '*'
	        // here you can add also fallback directives specific to it
	    },
	    // this target is only for application
	    app: {
	        // we are now in the root of the web app
	        baseUrl: '/app',
	        // appcache is always for the distrib version not for development
	        dest: './manifest.appcache',
	        // parse all partials manifest files into bower_components
	        includes: 'app/bower_components/**/*.appcache',
	        cache: {
	            patterns: [
	                // add all css, js and assets of my application
	                'index.html',
	                'app/**/*',
	                // but not files from third party components
	                '!app/bower_components/**',
	                // and not informational files
	                '!./bower.json',
	                '!./CHANGELOG.md',
	                '!./README.md'
	            ],
	            // don't forget to cache the root
	            literals: '/',
	            // and finish to add components which haven't a partial appcache
	            pageslinks: './index.html'
	        },
	        network: '*',
	        fallback: './offline.html'
	    }
	  }
	})

  grunt.loadNpmTasks('grunt-appcache');

};