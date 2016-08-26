var gulp     = require('gulp'),
    inject   = require('gulp-inject'),
    favicons = require('gulp-favicons'),
    del      = require('del');

/**
 * Remove the generated favicon.html file.
 */
gulp.task('clean-favicon', ['inject-favicon'], function() {
  return del(['favicon.html']);
});

/**
 * Generates favicon files used by various browsers and OS's.
 * For creating a Material Design icon, I recommend using
 * https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
 */
gulp.task('favicon-generate', function() {
  return gulp.src('src/favicon/favicon.png').pipe(favicons({
    appName: config.appName,
    appDescription: config.appDescription,
    developerName: config.developerName,
    developerURL: config.developerURL,
    background: config.background,
    url: config.url,
    version: config.version,
    path: '/assets/favicon',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '/?homescreen=1',
    logging: false,
    online: false,
    html: '../../favicon.html',
    pipeHTML: true,
    replace: true
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest('assets/favicon'));
});

/**
 * Inject the generated `favicon.html` into `default.hbs`.
 * Requires the favicon-generate task to run first.
 */
gulp.task('inject-favicon', ['favicon-generate'], function() {
  gulp.src('./default.hbs')
  .pipe(inject(gulp.src(['./favicon.html']), {
    starttag: '<!-- inject:head:{{ext}} -->',
    transform: function (filePath, file) {
      return file.contents.toString('utf8'); // return file contents as string
    }
  }))
  .pipe(gulp.dest('./'));
});

/**
 * The favicon task is outside the normal build process, because ideally it
 * would only be run once, when the initial favicon graphic is done.
 * The task will generate all favicon files, including graphics and configs.
 * It will also built the asset link and meta tags in `favicon.html`, inject
 * them into `default.hbs`, and remove that generated file.
 */
gulp.task('default', ['clean-favicon']);
