# twinturbo

```
const {app} = require('twinturbo')

app({
    port: 8080,
    get: {
        '/': function(){
            return "<h1>Home</h1>";
        },
        '/cpu-list': function(){
            return "<h1>CPU List</h1>";
        }
    },
    error: {
        404: function(){
            return "<h1>404 Page not found.</h1>";
        }
    }
})
```
