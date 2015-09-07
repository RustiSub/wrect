module.exports = {
  entry: "./build/build.js",
  output: {
    path: './build',
    filename: "bundle.js"
  },
  externals: {
    'minivents': 'minivents'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
