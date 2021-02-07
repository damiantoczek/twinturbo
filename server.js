const {app} = require("./index.js");

app({
  port: 8080,
  get: {
    '/': function(){
      return "Home";
    },
    '/about': function(){
      return "About";
    }
  },
  error: {
    404: function(){
      return "404 Page not found.";
    }
  }
});
