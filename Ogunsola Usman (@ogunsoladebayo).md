#### My commits are as follows:

- Added about page rendering.
  screenshot- https://ibb.co/YTK4v1q

```
    app.get('/about', (req, res) => {
      res.render('about', { variable: 'This is the about page' });

```

- created about page main skeleton and imported partials.
  screenshot- https://ibb.co/zsrLcZt

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <%- include('template/head') %>
    </head>
    <body>
        <header>
            <%- include('template/header') %>
        </header>

        <h1>About us</h1>
        <h2> <%= variable %> </h2>

        <footer>
            <%- include('template/footer') %>
        </footer>
    </body>
```

- created head partial file
  screenshot- https://ibb.co/56XHmgX

```
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

```

- created header partial file.
  screenshot- https://ibb.co/56XHmgX

```

    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">

            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>
                    Team Incredible Example Navbar
                </a>

                <ul class="nav navbar-nav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>

        </div>

```
