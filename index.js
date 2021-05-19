const express = require("express");
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfProtection = csrf({cookie: true});

const app = express();

app.use(express.urlencoded({extended: false}))
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
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  const errors= [];
  if (!firstName){
    errors.push("Please provide a first name.")
  }
  if (!lastName){
    errors.push("Please provide a last name.")
  }
  if (!email){
    errors.push("Please provide an email.")
  }
  if (!password){
    errors.push("Please provide a password.")
  } else if(password !== confirmedPassword) {
    errors.push("The provided values for the password and password confirmation fields did not match.")
  }
  if (errors.length > 0){
    res.render("create", {errors, firstName, lastName, email})
  } else{
  const user = {
    id: users.length + 1,
    firstName: firstName,
    lastName: lastName,
    email: email
  }
  users.push(user);
  res.redirect('/');
  }
})

app.get('/create-interesting', csrfProtection, (req, res) => {
  res.render('create-interesting', {csrfToken: req.csrfToken()})
})

app.post('/create-interesting', csrfProtection, (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword, age, favoriteBeatle, iceCream } = req.body;
  const errors= [];
  if (!firstName){
    errors.push("Please provide a first name.")
  }
  if (!lastName){
    errors.push("Please provide a last name.")
  }
  if (!email){
    errors.push("Please provide an email.")
  }
  if (!password){
    errors.push("Please provide a password.")
  } else if(password !== confirmedPassword) {
    errors.push("The provided values for the password and password confirmation fields did not match.")
  }
  if(!age){
    errors.push('age is required');
  } else {
    if(typeof age !== number){
      errors.push('age must be a valid age');
    }
  }
  if (errors.length > 0){
    res.render("create-interesting", {errors, firstName, lastName, email})
  } else{
  const user = {
    id: users.length + 1,
    firstName: firstName,
    lastName: lastName,
    email: email
  }
  users.push(user);
  res.redirect('/');
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
