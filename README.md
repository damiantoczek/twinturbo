# twinturbo
An attempt to make a fast framework for basic functionality and no bloat.

```javascript
const {app} = require('twinturbo')

app({
    port: 8080,
    get: {
        '/': function(){
            return "<h1>Home</h1>";
        }
    },
    error: {
        404: function(){
            return "<h1>404 Page not found.</h1>";
        }
    }
})
```

## app({port, get, error})
Required keys: `{port, get, error}`.

**port**  
Must be an integer.
```javascript
app({
    port: 8080,
    ...
});
```

**get**  
Each key inside the `get` object becomes a route.
The route must start with a `/` and have a function as a value.
```javascript
app({
    get: {
        '/': () => "Hello World",
        '/foo': (req,res) => res.end( `You are in ${req.url}` )
    },
    ...
});
```

**error**  
Error `404` must be defined, to handle not existing paths. *(Currently only error 404 is working)*  
Key:integer must have a function as a value.
```javascript
app({
    error: {
        404: () => `Error 404 Page not found`
    }
});
```

## Render()

**setValue(key, value, ?force)**  
Key: Can be of type integer or string.  
Value: Any type.  
?force: Is an optional argument to overwrite the existing key.  
Example: Store your website name or a github link.
```javascript
render.setValue('github', "https://github.com/...");
```

**getValue(key)**  
Key: can be of type integer or string.  
Returns a set value by key.  
```javascript
render.getValue('github');
```

**setHtml(key, html)**  
Key: can be of type integer or string.  
Html: Must be of type string.  
The `.setHtml()` method removes whitespace from the HTML to reduce it's size.  
`.setValue()` doesn't remove whitespace, it adds raw values.  
```javascript
render.setHtml('nav',
    `<nav>
        <a href='/'>Home</a>
        <a href='/github'>Github</a>
    </nav>`
);
```

**getHtml(key)**  
Key: can be of type integer or string.  
Returns a set HTML code.  
```javascript
render.getHtml('nav');

// Returns
<nav><a href='/'>Home</a><a href='/github'>Github</a></nav>
```

**setView(key, function)**  
Key: can be of type integer or string.
Value: Must be a function that returns a string.
```javascript
render.setView('template',
    (body) => `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${ render.getValue('name') }</title>
        ${ render.getHtml('style') }
    </head>
    <body>
        <div class="container">
            ${ render.getHtml('nav') }
            <main>${ body }</main>
        </div>
    </body>
    </html>`
);
```

**To get the view**  
```javascript
render.template('<h1>Hello World</h1>');
// or
render.template( render.getHtml('home') );
```
