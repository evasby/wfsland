var gulp = require('gulp'), 
    notify = require('gulp-notify'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    sass= require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    //sftp = require('gulp-sftp'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    plumberNotifier = require('gulp-plumber-notifier'),
    plumber = require('gulp-plumber'),
    wait = require('gulp-wait'),
    imagemin = require('gulp-imagemin');

// server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// html
gulp.task('html', function() {
  gulp.src('app/index.html')
  .pipe(connect.reload())
  .pipe(notify('HTML - Done!'));
})

  
function errorAlert(error){
  notify.onError({title: "SCSS Error", message: error.toString(), sound: "Sosumi"})(error); //Error Notification
  console.log(error.toString());//Prints Error to Console
  this.emit("end"); //End function
};


// css
gulp.task('css', function () {
  return gulp.src('sass/all*.scss')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(wait(500))
    .pipe(sass({ includePaths : ['_/sass/'] })) 
    .pipe(autoprefixer({
      browsers: ['last 10 versions', '> 1%', 'IE 7', 'IE 8', 'IE 9'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(notify('CSS - Done!'));
});

// SFTP
//gulp.task('sftp', function () {
//    return gulp.src('dist/**/*')
//      .pipe(sftp({
//        host: 'wfs.by',
//        auth: 'key',
//        remotePath: '/home/evasby/www/project/'
//      }));
//});

// Clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

// imageMin
gulp.task('imageMin', function () {
    return gulp.src('app/images/**/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'));
});


// Fonts
gulp.task('fonts', function() {
    return gulp.src(['app/fonts/**/*.*'])
      .pipe(gulp.dest('dist/fonts'));
});

// Build
gulp.task('build', ['clean', 'imageMin', 'fonts'], function () {
    var assets = useref.assets();
    return gulp.src('app/*.html')
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('dist'));
});

// Bower
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['css']);
  gulp.watch('bower.json', ['bower']);
  gulp.watch('app/index.html', ['html']);
});

// default
gulp.task('default', ['connect', 'html', 'css', 'watch']);