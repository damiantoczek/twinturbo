const http = require('http');

const app = function(config){
  var App = {};

  App.GET = config.get;
  App.POST = config.post;
  App.ERROR = config.error;

  App.listener = function(req,res){
    var {url, method} = req;

    var route = App[method][url];
    if(route){
      var result = route();
      res.end(result);
    }else{
      var errorHandler = App.ERROR[404]();
      res.statusCode = 404;
      res.end(errorHandler);
    }
  }

  App.server = http.createServer(App.listener);

  App.server.listen(8080)

  return app;
};

module.exports = {
  app
}
