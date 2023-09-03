const Card = require('../models/card');

exports.getCards = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn || false;
    const allCards = Card.fetchAll()
    // console.log(isLoggedIn);
    res.render('cards/dashboard', {
        cards: allCards,
        pageTitle: "Dashboard",
        path: '/',
        isAuthenticated: isLoggedIn
    });
};

exports.getCardDetails = (req, res, next) => {
    const cardId = req.params.cardId;
    const card = Card.findById(cardId);

    if (!card) {
        return res.redirect('/');
    }
    const isLoggedIn = req.session.isLoggedIn || false;
    res.render('cards/card-detail', {
        card: card,
        pageTitle: card.name,
        path: '/products',
        isAuthenticated: isLoggedIn
      });
}