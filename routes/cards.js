const express = require('express');
const routerr = express.Router();
const { data } = require('../data/flashCardsData.json');
const { cards } =  data ;

routerr.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { text };

  if(side === "question") {
    templateData.hint = hint;
  }

  res.render('card', templateData);
});

module.exports = routerr;
