const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const friends = [
  { "name": "Mikhail", lastName: "Cherneev" },
  { "name": "Evgeny", lastName: "Repekto" },
  { "name": "Alexey", lastName: "Mantulenko" }
];

app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const name = req.cookies.username;
  if ( name ) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

app.get('/cards', (req, res) => {
  res.render('card', {  prompt: "Who is knocking in the door?", hint: "Look at the picture", friends });
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if ( name ) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username)
  res.redirect('/');
});

app.listen(3000);
