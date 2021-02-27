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
      res.end(route(req, res));
    }else{
      res.statusCode = 404;
      res.end(App.ERROR[404]());
    }
  };

  App.server = http.createServer(App.listener);

  App.server.listen(config.port);

  return App;
};

const render = function(){
  var Render = {};

  Render._html = {};
  Render._values = {};

  Render.setValue = function(key, value, force){
    if(this._values[key] === undefined || force === true){
      this._values[key] = value;
    }else{
      console.log(`${key} key already exists, to overwrite use 'true' as third argument.`);
    }
  };

  Render.getValue = function(key){
    return this._values[key];
  };

  Render.setHtml = function(key, html){
    this._html[key] = html.replaceAll(RegExp(/(?!>)[\s\n]+(?=<)/, "g"),'');
  };

  Render.getHtml = function(key){
    return this._html[key];
  };

  Render.setView = function(key, viewFunc){
    this[key] = viewFunc;
  };

  return Render;
};

module.exports = {
  app,
  render
};
