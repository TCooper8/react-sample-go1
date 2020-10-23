const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use('/graphql', proxy({
    target: "http://localhost:8080/graphql",
    changeOrigin: true,
  }));
  return app;
}