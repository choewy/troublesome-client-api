const packageJSON = require('./package.json');
const path = require('path');
const fs = require('fs');

module.exports = {
  webpack: {
    configure: function (config) {
      const version = packageJSON.version;

      fs.writeFileSync('./public/version.json', JSON.stringify({ version }), 'utf-8');

      return config;
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
