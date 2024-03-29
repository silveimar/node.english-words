const gulp = require('gulp');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const plumber = require('gulp-plumber');
const env = require('gulp-env');
const runSequence = require('run-sequence').use(gulp);

const { execFileSync } = require('child_process');

const srcrDir = './src';
const testDir = './test';

const paths = {
    SRC: ['server.js', 'gulpfile.js', `${srcrDir}/**/*.js`, `${srcrDir}/**/**/*.js`],
    SRC_COVERAGE: [`${srcrDir}/controllers/*.js`, `${srcrDir}/services/*.js`],
    TEST: [`${testDir}/mocha/*.test.js`],
};

const esLintOptions = {
    useEslintrc: true,
    fix: true,
};

gulp.task('lint-src', () =>

    (gulp.src(paths.SRC)
        .pipe(eslint(esLintOptions))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .once('error', (err) => {
            gutil.log(err.toString());
            process.exit(1);
        })
    ));

gulp.task('lint-test', () =>
    (gulp.src(paths.TEST)
        .pipe(eslint(esLintOptions))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .once('error', (err) => {
            gutil.log(err.toString());
            process.exit(2);
        })
    ));

gulp.task('mocha', () => {
    return gulp.src(paths.TEST, { read: false })
        .pipe(plumber())
        .pipe(mocha({
            reporter: 'mocha-jenkins-reporter',
            reporterOptions: {
                junit_report_name: 'Random english word Tests',
                junit_report_path: 'test/report/report.xml',
                junit_report_stack: '1',
            },
            timeout: 2000,
        }))
        .on('error', gutil.log);
});

gulp.task('pre-integration', () => {
    console.log('==========================================> RUNNING PRE_INTEGRATION TASKS');
    const child = execFileSync('./test/docker/pre-integration.sh', [], { stdio: 'inherit' }, (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
    });
});

gulp.task('post-integration', () => {
    console.log('==========================================> RUNNING POST_INTEGRATION TASKS');
    const child = execFileSync('./test/docker/post-integration.sh', [], { stdio: 'inherit' }, (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
    });
});

gulp.task('docker-test', (callback) => {
  runSequence('pre-integration',
              'mocha',
              'post-integration',
              'end-it');
});

gulp.task('end-it', () => {
    process.exit(0);
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
