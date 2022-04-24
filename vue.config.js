const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  css: {
    sourceMap: true
  },
  outputDir: "./build",
  devServer: {
    open: true
  }
});
