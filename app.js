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
app.use('/static', express.static('public'));

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
  if(err.status) {
    res.status(err.status);
    console.log('Error status code is: ', err.status);
  } else {
    res.status(404);
    console.log('Error status: ', err.status, ' Setting response status to 404.');
  }
  res.render('error');
});

app.listen(3000);
