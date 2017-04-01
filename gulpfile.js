let gulp = require("gulp"),
    less = require("gulp-less"),
    CleanCSSPlugin = require("less-plugin-clean-css"),
    babel = require("gulp-babel"),
    replace = require("gulp-replace"),
    del = require("del");

let taskRegistry = {
    dependencies() {
        let deps = [
            "node_modules/systemjs/dist/system.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/chart.js/dist/Chart.min.js",
            "node_modules/babel-polyfill/dist/polyfill.min.js"
        ];
        return gulp.src(deps).pipe(gulp.dest("vendor"));
    },

    clean() {
        return del(["build/**", "!build", "!build/README.md"]);
    },

    html(outDir, isLegacy = false) {
        let stream = gulp.src("src/**/index.html");
        if (isLegacy) {
            stream = stream.pipe(replace(/<script/,
                "<script src=\"../../vendor/polyfill.min.js\"></script>\n$&"));
        }
        return stream.pipe(gulp.dest(outDir));
    },

    styles(outDir, isLegacy = false) {
        let cleanCSSPlugin = new CleanCSSPlugin({
            advanced: true,
            compatibility: isLegacy ? "ie8" : "*"
        });
        return gulp.src("src/**/main.less")
            .pipe(less({
                plugins: [cleanCSSPlugin]
            }))
            .pipe(gulp.dest(outDir));
    },

    scripts(outDir, isLegacy = false) {
        let config = {
            // Using presets babili & es2015 together results in broken code
            // (see https://github.com/babel/babili/issues/485)
            // TODO: uncomment "babili" once the issue is fixed
            presets: isLegacy ? ["es2015" /*, "babili"*/] : ["babili"]
        };
        return gulp.src("src/**/*.js")
            .pipe(babel(config))
            .pipe(gulp.dest(outDir));
    }
};

// region Dev tasks

gulp.task("dependencies", taskRegistry.dependencies);

gulp.task("styles-dev", () => taskRegistry.styles("src"));

gulp.task("prepare", ["dependencies", "styles-dev"]);

// endregion

// region Prod tasks

// The "clean" task will not be run multiple times, even though it is a dependency
// of all the other prod tasks:
// see https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md
gulp.task("clean", taskRegistry.clean);

gulp.task("html-prod", ["clean"], () => taskRegistry.html("build"));
gulp.task("html-prod-legacy", ["clean"], () => taskRegistry.html("build", true));

gulp.task("styles-prod", ["clean"], () => taskRegistry.styles("build"));
gulp.task("styles-prod-legacy", ["clean"], () => taskRegistry.styles("build", true));

gulp.task("scripts-prod", ["clean"], () => taskRegistry.scripts("build"));
gulp.task("scripts-prod-legacy", ["clean"], () => taskRegistry.scripts("build", true));

gulp.task("build", ["html-prod", "styles-prod", "scripts-prod"]);
gulp.task("build-legacy", ["html-prod-legacy", "styles-prod-legacy", "scripts-prod-legacy"]);

// endregion