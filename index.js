const http = require('http');

module.exports = function(config){
  let app = {};

  app.GET = config.routes.get;
  app.POST = config.routes.post;

  app.listener = function(req,res){
    console.log(this);
    let {url, method} = req;

    let route = app[method][url];
    if(route){
      let result = route();
      res.end(result);
    }else{
      res.end('404 PaGe NoT FoUnD.');
    }
  }

  app.server = http.createServer(app.listener);

  app.server.listen(8080)

  return app;
};
