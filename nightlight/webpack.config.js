const path = require("path");

// const babelLoader = {
//   loader: "babel-loader",
//   options: {
//     cacheDirectory: true,
//     presets: [
//       ["env", {
//         useBuiltIns: "entry",
//       }]
//     ]
//   }
// };

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          // babelLoader,
          {
            loader: "ts-loader",
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
