const {
  override,
  addLessLoader,
  addWebpackPlugin,
  addBabelPlugins,
  removeModuleScopePlugin
} = require("customize-cra");
const paths = require("react-scripts/config/paths");
const path = require('path');

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

paths.appBuild = path.resolve(__dirname, "dist");

module.exports = {
  webpack: override(
    addLessLoader(),
    addWebpackPlugin(new BundleAnalyzerPlugin()),
    addBabelPlugins([
      "import",
      { libraryName: "rhino-rc", libraryDirectory: "dist" },
    ]),
    removeModuleScopePlugin()
  ),
};
