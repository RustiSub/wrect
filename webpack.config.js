module.exports = {
    entry: "./app/main.js",
    output: {
        path: '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
