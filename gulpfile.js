const fsbx = require("fuse-box");
const gulp = require("gulp");
const runSequence = require('run-sequence');


// Create FuseBox Instance
let fuseBox = new fsbx.FuseBox({
    homeDir: "src/",
    sourceMap: {
        bundleReference: "sourcemaps.js.map",
        outFile: "./build/sourcemaps.js.map",
    },
    cache: false,
    outFile: "./build/out.js",

    plugins: [
        fsbx.SVGPlugin(),
        fsbx.CSSPlugin(),
        fsbx.BabelPlugin({
            config: {
                sourceMaps: true,
                presets: ["latest"],
                plugins: [
                    ["transform-react-jsx"]
                ]
            }
        })
    ]
});


gulp.task("build", () => {
    return fuseBox.bundle(">index.jsx +react-dom");
})
gulp.task('start', ['build'], function() {
    gulp.watch('src/**/*.**', () => {
        runSequence('build');
    });
});