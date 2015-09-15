var path = require('./node_modules/path/path');

module.exports = {
    entry: "./app/main.js",
    output: {
        path: 'build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    resolve: {
      root: path.resolve('./js'),
      extensions: ['', '.js']
    }
};
