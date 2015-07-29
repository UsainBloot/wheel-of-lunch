var gulp = require('gulp');
var clean = require('gulp-clean');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

config = {
	styles: {
		src: [ 'source/styles/base.scss' ],
		dest: 'public/styles/'
	},
	scripts: {
		src: [ 'source/scripts/**/*.js' ],
		dest: 'public/scripts',
    all: 'all.js'
	},
  vendor: {
		jsSrc: [ 'source/bower_components/jquery/dist/jquery.min.js' ]
	},
  staticFiles: {
		html: {
			src: 'source/*.html',
			dest: 'public/'
		},
    images: {
			src: [ 'source/img/**/*.*', '!source/img/icons*/*.*' ],
			dest: 'public/img'
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

gulp.task( 'styles', function() {
	return gulp
		.src( config.styles.src )
		.pipe( compass({
			sass: 'source/styles',
			image: 'source/img',
			css: 'public/styles'
		 })).
		pipe(autoprefixer({
			compatibility: ['last 6 versions', 'ie 8',  'ie 9'],
			cascade: false
		}))
		.pipe( minifyCSS({compatibility: 'ie8'}) )
		.pipe( gulp.dest( config.styles.dest ) )
});

gulp.task( 'scripts', function() {
	return browserify('./source/scripts/init.js', {debug: true}).
		bundle().
		pipe(source(config.scripts.all)).
		pipe(buffer()).
		pipe(sourcemaps.init()).
		pipe(uglify()).
		pipe(sourcemaps.write('../maps')).
		pipe(gulp.dest('./public/scripts'));
});

gulp.task( 'vendor', function() {
	return gulp
		.src(config.vendor.jsSrc)
		.pipe(concat('vendor.js'))
		.pipe(uglify())
    .pipe(gulp.dest('public/scripts/'));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });

  gulp.watch(['public/*.html', 'public/styles/**/*.css', 'public/scripts/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task( 'default', function(callback) {
  runSequence(
		'clean',
		['styles'],
		['scripts', 'vendor', 'move-html', 'move-images'],
		callback);
});

gulp.task ( 'dev', function(callback) {
  runSequence(
		'clean',
		['styles'],
		['scripts', 'vendor', 'move-html', 'move-images'], 'serve', 
		callback);
});
