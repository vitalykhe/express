const express = require('express');
const router = express.Router();
const { data } = require('../data/flashCardsData.json');
const { cards } =  data ;

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const name = req.cookies.username;
  const templateData = { text, name };


  if(side === "question") {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if (side === "answer"){
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  } else if (id) {
      return res.redirect(`/cards/${id}?side=question`);
  }
  res.render('card', templateData);
});

router.get('/', (req, res) => {
  const numberOfCards = cards.length;
  let randomCardId = Math.floor(Math.random()*numberOfCards);
  res.redirect(`/cards/${randomCardId}`);
});

module.exports = router;
