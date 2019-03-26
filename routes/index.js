const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const name = req.cookies.username;
  if ( name ) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

router.post('/goodbye', (req, res) => {
  res.clearCookie('username')
  res.redirect('/hello');
});

router.get('/cards', (req, res) => {
  res.render('card', {  prompt: "Who is knocking in the door?", hint: "Look at the picture", friends });
});

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if ( name ) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username)
  res.redirect('/');
});

module.exports = router;
