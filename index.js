const express = require("express");
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfProtection = csrf({cookie: true});

const app = express();

app.use(cookieParser());

const port = process.env.PORT || 3000;

app.set("view engine", "pug");

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get("/", (req, res) => {
  //res.send("Hello World!");
  res.render('index', {users})
});

app.get('/create', csrfProtection, (req, res) => {
  res.render('create', {csrfToken: req.csrfToken()})
})

app.post('/create', (req, res) => {
  res.redirect('/');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
