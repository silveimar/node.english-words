const gulp = require('gulp');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const plumber = require('gulp-plumber');

const srcrDir = './src';
const testDir = './test';

const paths = {
    SRC: ['server.js', 'gulpfile.js', `${srcrDir}/**/*.js`, `${srcrDir}/**/**/*.js`],
    SRC_COVERAGE: [`${srcrDir}/controllers/*.js`, `${srcrDir}/services/*.js`],
    TEST: `${testDir}/mocha/**/**/*.js`,
};

gulp.task('lint-src', () =>
    (gulp.src(paths.SRC)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    ));

gulp.task('lint-test', () =>
    (gulp.src(paths.TEST)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    ));

gulp.task('mocha', () => {
    return gulp.src(paths.TEST, { read: false })
        .pipe(plumber())
        .pipe(mocha({
            reporter: 'mocha-jenkins-reporter',
            reporterOptions: {
                junit_report_name: 'Random english word Tests',
                junit_report_path: 'tests/report/report.xml',
                junit_report_stack: '1',
            },
            timeout: 7000,
        }))
        .once('error', (err) => {
            console.log('ERROR!!!!');
            gutil.log(err.toString());
            process.exit(1);
        })
        .once('end', () => {
            console.log('TERMINANDO!!!!');
            process.exit(0);
        });
});

gulp.task('watch-test', () => {
  gulp.watch(path.TEST, ['mocha']);
});

gulp.task('watch', () => {
    gulp.watch([paths.SRC], ['lint']);
});

gulp.task('nodemon', () => {
    nodemon({
        script: 'server.js',
        tasks: ['lint-src'],
    })
        .on('restart', () => {
            gutil.log('Nodemon restarted!');
        });
});

gulp.task('lint', ['lint-src', 'lint-test']);
gulp.task('start', ['lint', 'watch', 'nodemon']);
gulp.task('default', ['start']);
