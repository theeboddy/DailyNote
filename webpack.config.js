// webpack.config.js

const path = require('path');

module.exports = {
  // Другие настройки
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify")
    }
  },

};