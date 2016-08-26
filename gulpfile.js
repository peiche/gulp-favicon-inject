var del       = require('del'),
    favicons  = require('gulp-favicons'),
    gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    inject    = require('gulp-inject');

var config = {
  appName: 'gulp-favicon-inject',
  appDescription: 'Sample Gulp project that generates a set of favicon files and injects them into the <head> of a page.',
  url: 'https://github.com/peiche/gulp-favicon-inject',
  version: 1.0,
  developerName: 'Paul Eiche',
  developerURL: 'http://eichefam.net',
  background: '#fff',
  path: 'dist'
};

/**
 * Remove the generated favicon files.
 */
gulp.task('clean', function() {
  return del([config.path]);
});

/**
 * Generates favicon files used by various browsers and OS's.
 * Requires the `clean` task to run first.
 * For creating a Material Design icon, I recommend using
 * https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
 */
gulp.task('favicon-generate', ['clean'], function() {
  return gulp.src('src/favicon.png').pipe(favicons({
    appName: config.appName,
    appDescription: config.appDescription,
    url: config.url,
    version: config.version,
    developerName: config.developerName,
    developerURL: config.developerURL,
    background: config.background,
    path: '/' + config.path,
    display: 'standalone',
    orientation: 'portrait',
    start_url: '/?homescreen=1',
    logging: false,
    online: false,
    html: '../favicon.html',
    pipeHTML: true,
    replace: true
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest(config.path));
});

/**
 * Inject the generated `favicon.html` into `index.html`.
 * Requires the `favicon-generate` task to run first.
 */
gulp.task('inject-favicon', ['favicon-generate'], function() {
  gulp.src('./index.html')
  .pipe(inject(gulp.src(['./favicon.html']), {
    starttag: '<!-- inject:head:{{ext}} -->',
    transform: function(filePath, file) {
      return file.contents.toString('utf8'); // return file contents as string
    }
  }))
  .pipe(gulp.dest('./'));
});

/**
 * Remove the generated favicon.html file.
 * Requires the `inject-favicon` task to run first.
 */
gulp.task('clean-favicon', ['inject-favicon'], function() {
  return del(['favicon.html']);
});

/**
 * The default task will generate all favicon files, including graphics and
 * configs. It will also build the asset link and meta tags in `favicon.html`,
 * inject them into `index.html`, and remove the generated file.
 */
gulp.task('default', ['clean-favicon']);
