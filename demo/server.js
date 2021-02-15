const {app} = require("../index.js");
const view = require("./views.js");

app({
  port: 8080,
  get: {
    '/': () => view.template( view.getHtml('home') ),
    '/about': () => view.template( view.getHtml('about') ),
  },
  error: {
    404: function(){
      return "404 Page not found.";
    }
  }
});
