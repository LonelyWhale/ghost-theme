const gulp = require('gulp')

const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')

const eslint = require('gulp-eslint')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

const imagemin = require('gulp-imagemin')

const sourcemaps = require('gulp-sourcemaps')
// var cssnano = require('cssnano')

gulp.task('css', () => {
  const processors = [
    cssnext({browsers: ['last 1 version']}),
  // cssnano()
  ]
  return gulp.src('./src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('lint', () => {
  return gulp.src(['./src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('babel', () => {
  return gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/js'))
})

gulp.task('imagemin', () => {
  return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/images'))
})

gulp.watch('./src/js/*.js', ['babel'])
gulp.watch('./src/css/*.css', ['css'])
gulp.watch('./src/images/*', ['imagemin'])

gulp.task('default', ['css', 'babel', 'imagemin'], () => {
})
