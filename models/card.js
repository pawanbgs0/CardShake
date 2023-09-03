const allCards = [];

module.exports = class Card{
    constructor(id, name, imageUrl, phone, address) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    static findCardIndex(id){
        for (let i = 0; i < allCards.length; i++) {
            if (allCards[i].id == id) {
                return i;
            }
        }
        return -1;
    }

    save() {
        const index = this.constructor.findCardIndex(this.id);

        if (index === -1) {
            allCards.push(this);
        } 
        else {
            allCards[index] = this; 
        }
    }

    static fetchAll() {
        return allCards;
    }

    static findById(id){
        for (let i = 0; i < allCards.length; i++) {
            if (allCards[i].id == id) {
                return allCards[i];
            }
        }
    }

    static findIndex(cardId) {
        // Convert cardId to a number (if it's a string)
        cardId = Number(cardId);
      
        for (let i = 0; i < allCards.length; i++) {
          if (allCards[i].id === cardId) {
            return i;
          }
        }
        return -1;
      }
      

    static deleteByIndex(index) {
        if (index !== -1) {
            allCards.splice(index, 1)
        }
    }
};