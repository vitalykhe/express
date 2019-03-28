const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const friends = [
  { "name": "Mikhail", lastName: "Cherneev" },
  { "name": "Evgeny", lastName: "Repekto" },
  { "name": "Alexey", lastName: "Mantulenko" }
];

const generalRoutes = require('./routes/index');
const cardsRoutes = require('./routes/cards');

app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());

app.set('view engine', 'pug');

app.use(generalRoutes);
app.use('/cards', cardsRoutes);

app.use((req, res, next) => {
  console.log('no route found. Showing the 404 error');
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000);
