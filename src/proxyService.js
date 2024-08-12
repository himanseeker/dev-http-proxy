const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const app = express();

function loadConfig(env) {
  const configPath = path.resolve(__dirname, `../config/${env}.json`);
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file for ${env} environment not found.`);
  }
  return require(configPath);
}

function setupProxies(config, excludePort) {
  Object.keys(config).forEach(port => {
    if (port === excludePort) {
      console.log(`Skipping proxy setup for port ${port}`);
      return;
    }

    const targetUrl = config[port];
    const proxyApp = express();
    
    proxyApp.use(
      '/',
      createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        logger: console,
        pathRewrite: {
          '^/': '/', // This ensures the path is not altered
        },
        logLevel: 'debug', // Useful for debugging
      })
    );

    // Start a separate server for each port
    http.createServer(proxyApp).listen(port, () => {
      console.log(`Proxy server running on port ${port}, forwarding to ${targetUrl}`);
    });
  });
}

module.exports = {
  startServer: (env, excludePort) => {
    const config = loadConfig(env);
    setupProxies(config, excludePort);
  },
};
