const {render} = require('../index.js');

const view = render();

view.setValue('name', 'TwinTurbo');

view.setHtml('style', `
<style>
  nav a{
    padding: 1em .5em;
  }

  a{
    margin: .5em 0;
  }
</style>
`);

view.setHtml('nav', `
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
`);

view.setHtml('home', `
  <h1>Welcome to ${view.getValue('name')}</h1>
  <p>I hope you will like TwinTurbo, it's pretty raw but it will become better with time.</p>
  <p>You can leave your ideas and suggestions on github at <a href="https://github.com/damiantoczek/twinturbo/issues">Github/twinturbo</a>
`);

view.setHtml('about', `
  <h1>I like tea :)</h1>
`);

view.setView('template', body => {

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${view.getValue('name')}</title>
        ${view.getHtml('style')}
    </head>
    <body>
        <div class="container">
            ${view.getHtml('nav')}
            <main>${body}</main>
        </div>
    </body>
    </html>`;
});

module.exports = view;
