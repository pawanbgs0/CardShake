const Card = require('../models/card');
let id = 620;

exports.getCards = (req, res, next) => {
    const allCards = Card.fetchAll()
    res.render('cards/dashboard', {
        cards: allCards,
        pageTitle: "Dashboard",
        path: '/'
    });
};

exports.getAddCard = (req, res, next) => {
    res.render('cards/add-card', {
        pageTitle: 'Add Card',
        path: '/cards/add-card',
        editing: false
    });
}

exports.postAddCard = (req, res, next) => {
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const phone = req.body.phone;
    const address = req.body.address;
    const card = new Card(id++, name, imageUrl, phone, address);
    card.save();
    // console.log(card);
    res.redirect('/');
}

exports.getEditCard = (req, res, next) => {
    const editMode = req.query.edit;
    const cardId = req.params.cardId;
    const card = Card.findById(cardId);

    // console.log(editMode);

    if (!editMode || !card){
        return res.redirect('/');
    }

    res.render('cards/add-card', {
        pageTitle: 'Edit Card',
        path: '/cards/edit-card',
        editing: editMode,
        card: card
    });
}

exports.postEditCard = (req, res, next) => {
    const cardId = req.params.cardId;
    const card = Card.findById(cardId);

    // console.log(editMode);

    if (!card){
        return res.redirect('/');
    }

    card.name = req.body.name;
    card.imageUrl = req.body.imageUrl;
    card.phone = req.body.phone;
    card.address = req.body.address;

    card.save();
    res.render('cards/card-detail', {
        card: card,
        pageTitle: card.name,
        path: '/products'
      });
}

exports.getCardDetails = (req, res, next) => {
    const cardId = req.params.cardId;
    const card = Card.findById(cardId);

    if (!card) {
        return res.redirect('/');
    }

    res.render('cards/card-detail', {
        card: card,
        pageTitle: card.name,
        path: '/products'
      });
}