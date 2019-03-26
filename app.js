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


const generalRoutes = require('./routes')
app.use(generalRoutes);

const cardsRoutes = require('./routes/cards')
app.use('/cards', cardsRoutes);


app.use((req, res, next) => {
  console.log('Middle');
  next();
});


app.use((req, res, next) => {
  console.log('start of custom middleware');
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
