const proxy = require('http-proxy-middleware');

// This will setup the proxy to allow graphql endpoint to be called from localhost.
module.exports = app => {
  app.use('/graphql', proxy({
    target: "http://localhost:8080/graphql",
    changeOrigin: true,
  }));
  return app;
}