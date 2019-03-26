const express = require('express');
const router = express.Router();

router.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is knocking at the door?" })
});

module.exports = router;
