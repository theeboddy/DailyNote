const path = require('path');

module.exports = function override(config, env) {
  // Внесите необходимые изменения в конфигурацию Webpack здесь

  // Добавление fallback для модулей
  config.resolve = {
    ...config.resolve,
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "process": require.resolve("process/browser")
    },

  };

  

  return config;
};