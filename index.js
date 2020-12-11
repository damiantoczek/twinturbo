const http = require('http');

const app = exports = module.exports = {};

app.handler = function handler(req, res){
  let url = req.url;
  let data = {url};
  res.end(JSON.stringify(data));
};

app.listen = function listen(){
  let server = http.createServer(this.handler);
  return server.listen.apply(server, arguments);
};
