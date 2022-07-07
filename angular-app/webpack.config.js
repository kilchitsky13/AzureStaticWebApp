const webpack = require("webpack");
const ModuleFederationPlugin =require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "https://witty-meadow-0a888a10f.1.azurestaticapps.net/",
    uniqueName: "products",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "products",
      library: { type: "var", name: "products" },
      filename: "remoteEntry.js",
      exposes: {
        ProductsModule: './src/app/products/products.module.ts'
      },
      shared: {
        "@angular/core": { singleton: true, requiredVersion:'auto'},
        "@angular/common": { singleton: true, requiredVersion:'auto'},
        "@angular/common/http": { singleton: true, requiredVersion:'auto'},
        "@angular/router": { singleton: true, requiredVersion:'auto' },
        "@angular/forms": { singleton: true, requiredVersion:'auto'},
      },
    }),
  ],
};