const path = require('path')

const express = require('express');

const app = express();

app.use(require('morgan')('dev'))

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const nav = (url)=> {
 return `
  <nav>
    <a href='/' class='${ url === '/' ? 'selected' : ''}'>Home</a>
    <a href='/users'  class='${url.startsWith('/users') ? 'selected' : ''}>Users</a>
  </nav>
 `;
};

app.get ('/', (req, res, next)=> {
  res.send(`
  <html>
    <head>
      <link rel='stylesheet' href='/assets/styles.css' />
    </head>
    <body>
    ${ nav(req.url) }
    <h1>Acme Company</h1>
    </body>
  </html>`
  );
});

app.get ('/users', (req, res, next)=> {
  res.send(`
  <html>
    <head>
      <link rel='stylesheet' href='/assets/styles.css' />
    </head>
    <body>
    ${ nav(req.url)}
    <h1>Acme Company</h1>
    <h2>Users</h2>
      <ul>
        <li><a href='/users/1'>Moe</a></li>
        <li><a href='/users/5'>Lucy</a></li>
        <li><a href='/users/7'>Ethyl</a></li>
      </ul>
    </body>
  </html>`
  );
});

app.get ('/users/:id', (req, res, next)=> {
  res.send(`
  <html>
    <head>
      <link rel='stylesheet' href='/assets/styles.css' />
    </head>
    <body>
    ${ nav(req.url)}
    <h1>Acme Company</h1>
    <h2><a href='/users'>Users</a></h2>
    To do: info about user with an id of ${req.params.id}
    </body>
  </html>`
  );
});

const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`listening on port ${port}`))
