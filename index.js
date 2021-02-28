const http = require('http');

const app = function(config){
  var App = {
    routesList: [],
    getRoutes: {},
    postRoutes: {},
    ERROR: {},
    GET: null,
    POST: null,
    listener: null,
    server: {}
  };

  // Cache all routes for faster checking.
  App.routesList = config.post ? [
    ...Object.keys(config.get),
    ...Object.keys(config.post)
  ] : Object.keys(config.get);

  // Stored routes are stored as key:func pairs.
  App.getRoutes = config.get;
  App.postRoutes = config.post;
  App.ERROR = config.error;

  // Handling GET/POST requests.
  App.GET = async function(req, res){
    var url = req.url;
    var html = await this.getRoutes[url]();
    res.end(html);
  };

  App.POST = async function(req, res){
    var rawBodyString = '';

    var postPromise = new Promise((success, reject) => {

      req.on('error', error => {
        console.log(error);
        reject(error);
      });

      req.on('data', chunk => {
        rawBodyString += chunk;
      });

      req.on('end', () => {
        var body = {};

        // Request body to body object.
        rawBodyString.split('&').forEach(str => {
          let pair = str.split('=');
          body[pair[0]] = pair[1];
        });

        console.log('SUCCESS', rawBodyString);
        success(body);
      });

    });

    var data = await postPromise;
    var html = await this.postRoutes[req.url](data);
    res.end(html);
  };

  // Server listener.
  App.listener = function(req,res){
    var {url, method} = req;

    if(App.routesList.indexOf(url) === -1){
      var errorHandler = App.ERROR[404]();
      res.statusCode = 404;
      res.end(errorHandler);
    }else{
      App[method](req, res);
    }
  };

  // Initiation.
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
      console.log(`${key} key already exists, to overwrite use 'true' as thrid argument.`);
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
