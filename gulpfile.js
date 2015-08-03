var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var replace = require('gulp-replace');
var browserify = require('browserify');
var html = require('html-browserify');
var hogan = require('hoganify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

config = {
	templates: {
		hogan: ['source/templates/**/*.hogan'],
		dest: 'source/js/templates'
	},
	styles: {
		src: [ 'source/scss/base.scss' ],
		dest: 'public/css/'
	},
	scripts: {
		src: [ 'source/js/**/*.js' ],
		dest: 'public/js',
    all: 'all.js'
	},
  vendor: {
		jsSrc: [ 'source/bower_components/jquery/dist/jquery.min.js',
						 'source/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
	 				 ]
	},
  staticFiles: {
		html: {
			src: 'source/*.html',
			dest: 'public/'
		},
    images: {
			src: [ 'source/img/**/*.*' ],
			dest: 'public/img'
		},
		fonts: {
			src: [ 'source/bower_components/bootstrap-sass/assets/fonts/**/*',
						 'source/bower_components/font-awesome/fonts/*.*'
					 ],
			dest: 'public/fonts'
		},
	  clean: [ 'public' ]
	}
};

gulp.task( 'clean', function () {
	return gulp
		.src( config.staticFiles.clean, { read: false, force: true } )
		.pipe( clean() );
});

gulp.task('move-html', function() {
	return gulp
		.src( config.staticFiles.html.src, { base: '' } )
		.pipe( gulp.dest( config.staticFiles.html.dest ) )
});

gulp.task( 'move-images', function() {
	return gulp
		.src( config.staticFiles.images.src, { base: '' } )
		.pipe( gulp.dest( config.staticFiles.images.dest ) )
});

gulp.task('move-fonts', function() {
	return gulp
		.src( config.staticFiles.fonts.src, { base: '' } )
		.pipe( gulp.dest( config.staticFiles.fonts.dest ) )
});

gulp.task( 'styles', function() {
	return gulp
		.src( config.styles.src )
		.pipe( compass({
			sass: 'source/scss',
			image: 'source/img',
			css: 'public/css'
		 })).
		pipe(autoprefixer({
			compatibility: ['last 6 versions', 'ie 8',  'ie 9'],
			cascade: false
		}))
		.pipe( minifyCSS({compatibility: 'ie8'}) )
		.pipe( gulp.dest( config.styles.dest ) )
});

gulp.task( 'js-hint', function() {
	return gulp.src(config.scripts.src)
		.pipe(jshint());
});

gulp.task( 'templates', function() {
	return gulp
		.src(config.templates.hogan)
		.pipe(compiler('templates.js', {
			wrapper: 'commonjs'
		}))
		//.pipe(replace('var Hogan = require(\'hogan\');', ''))
		.pipe(gulp.dest(config.templates.dest));
});

gulp.task( 'scripts', function() {
	return browserify('./source/js/init.js', {debug: true, transform: [html, hogan] }).
		bundle().
		pipe(source(config.scripts.all)).
		pipe(buffer()).
		pipe(sourcemaps.init()).
		pipe(uglify()).
		pipe(sourcemaps.write('../maps')).
		pipe(gulp.dest('./public/js'));
});

gulp.task( 'vendor', function() {
	return gulp
		.src(config.vendor.jsSrc)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });

  gulp.watch(['public/*.html', 'public/css/**/*.css', 'public/js/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task( 'default', function(callback) {
  runSequence(
		'clean',
		['styles'],
		['js-hint'],
		['scripts', 'vendor', 'move-html', 'move-images', 'move-fonts'],
		callback);
});

gulp.task ( 'dev', function(callback) {
  runSequence(
		'clean',
		['styles'],
		['js-hint'],
		['scripts', 'vendor', 'move-html', 'move-images', 'move-fonts'], 'serve',
		callback);
});
