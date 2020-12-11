const tt = require("./index.js");

const app = tt({
  port: 8080,
  routes: {
    get: {
      '/': function(){
        return "Home";
      },
      '/api': function(){
        return "API";
      }
    }
  }
})
