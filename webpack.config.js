let path = require("path");
let pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
let phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
  entry: "./src/game.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "korokke.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: "/node_modules/"
      },
      {
        test: /phaser\.js$/,
        loader: "expose-loader",
        options: {
          exposes: ["phaser"]
        }
      },
      {
        test: /\.(png|mp3)$/i,
        use: [{loader: 'url-loader'}]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    publicPath: "/dist/",
    host: "192.168.3.19",
    port: 9000,
    open: false
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      phaser: phaser
    }
  }
}
