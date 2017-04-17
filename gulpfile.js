let gulp = require("gulp"),
    less = require("gulp-less"),
    CleanCSSPlugin = require("less-plugin-clean-css"),
    babel = require("gulp-babel"),
    replace = require("gulp-replace"),
    del = require("del"),
    pkgJSON = require("./package.json");

let taskRegistry = {
    clean() {
        return del(["build/**", "!build", "!build/README.md"]);
    },

    dependencies(outDir, isLegacy = false) {
        let deps = [
            "node_modules/systemjs/dist/system.js",
            "node_modules/chart.js/dist/Chart.min.js"
        ];
        if (isLegacy) {
            deps.push("node_modules/systemjs/dist/system-polyfills.js",
                "node_modules/babel-polyfill/dist/polyfill.min.js");
        }
        return gulp.src(deps).pipe(gulp.dest(`${outDir}/vendor`));
    },

    html(outDir, isLegacy = false) {
        let stream = gulp.src("src/**/index.html");
        if (isLegacy) {
            stream = stream.pipe(replace(/<script/,
                "<script src=\"../vendor/polyfill.min.js\"></script>\n$&"));
        }
        let version = pkgJSON.version;
        return stream
            .pipe(replace(/([?&])version=dev/g, `$1version=${version}`)) // avoid browser caching issues
            .pipe(gulp.dest(outDir));
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
        // Mangle top level identifiers as all files are modules
        let babiliPreset = ["babili", {mangle: {topLevel: true}}];
        let config = {
            // Using presets babili & es2015 together results in broken code
            // (see https://github.com/babel/babili/issues/485)
            // TODO: uncomment “babiliPreset” once the issue is fixed
            presets: isLegacy ? ["es2015" /*, babiliPreset*/] : [babiliPreset]
        };
        return gulp.src(["src/**/*.js", "!src/vendor/*"])
            .pipe(babel(config))
            .pipe(gulp.dest(outDir));
    }
};

// region Dev tasks

gulp.task("dependencies-dev", () => taskRegistry.dependencies("src"));

gulp.task("styles-dev", () => taskRegistry.styles("src"));

gulp.task("prepare", ["dependencies-dev", "styles-dev"]);

// endregion

// region Prod tasks

// The "clean" task will not be run multiple times, even though it is a dependency
// of all the other prod tasks:
// see https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md
gulp.task("clean", taskRegistry.clean);

gulp.task("dependencies-prod", ["clean"], () => taskRegistry.dependencies("build"));
gulp.task("dependencies-prod-legacy", ["clean"], () => taskRegistry.dependencies("build", true));

gulp.task("html-prod", ["clean"], () => taskRegistry.html("build"));
gulp.task("html-prod-legacy", ["clean"], () => taskRegistry.html("build", true));

gulp.task("styles-prod", ["clean"], () => taskRegistry.styles("build"));
gulp.task("styles-prod-legacy", ["clean"], () => taskRegistry.styles("build", true));

gulp.task("scripts-prod", ["clean"], () => taskRegistry.scripts("build"));
gulp.task("scripts-prod-legacy", ["clean"], () => taskRegistry.scripts("build", true));

gulp.task("build", ["dependencies-prod", "html-prod", "styles-prod", "scripts-prod"]);
gulp.task("build-legacy", ["dependencies-prod-legacy", "html-prod-legacy", "styles-prod-legacy", "scripts-prod-legacy"]);

// endregion