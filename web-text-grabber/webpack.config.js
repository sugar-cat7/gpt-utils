const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content.js',
    popup: './src/popup.js',
    background: './src/background.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/popup.html', to: 'popup.html' },
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/icon16.png', to: 'icon16.png' },
        { from: 'src/icon48.png', to: 'icon48.png' },
        { from: 'src/icon128.png', to: 'icon128.png' }
      ],
    }),
  ],
  resolve: {
    fallback: {
      "util": require.resolve("util/")
    }
  },
};
