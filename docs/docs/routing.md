# Add routing

When you want to add new routing, you can use generate command.

```
airlane generate route users
```

This command generates files under *routes/users* directory.

```
$ tree routes/users/
routes/users/
├── controller.js
├── index.js
├── public
│   ├── app.css
│   └── app.js
├── test
│   └── controller_test.js
└── views
    ├── edit.jade
    ├── index.jade
    ├── layout.jade
    └── new.jade
```

It's almost same routes directory. Each directory has controller/router/JavaScript and Stylesheet/View and Test. Looks like micro service.

After execute command, you have routing *http://localhost:8080/users/* with RESTful(GET/POST/PUT/DELETE).

## Access client side JavaScript and stylesheet from Web browser

If you want to access *routes/users/public/app.js* or *app.css* from web browser, you should write like below.

- /users/app.min.js
- /users/app.min.css

Of cause `routes/users/views/layout.jade` has those lines.

```
link(rel="stylesheet", type="text/css", href="/users/app.min.css")
script(src="/users/app.min.js")
```


