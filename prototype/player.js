class Player {
  constructor(cards) {
    this.cards = cards
  }

  displayCards() {
    document.getElementById('cardHolder').innerHTML = this.toString()
  }
}

class Card{
  constructor(suit, value){
    this.suit = suit
    this.value = value
    this.width = 30
    this.height = 60
  }

}

Player.prototype.toString = function playerToString() {
  out = ""
  for (var i = 0; i < cards.length; i++){
    out += this.cards[i].toString() + ", "
  }
  return out
}


Card.prototype.toString = function cardToString() {
  return this.suit + this.value
}

cards = [
  new Card("🔔","6"),
  new Card("🔔","7"),
  new Card("🌰","9"),
  new Card("🌰","8"),
  new Card("🌰","10"),
  new Card("🛡️","U"),
  new Card("💮","K"),
  new Card("🛡️","O"),
  new Card("💮","A")
]


player = new Player(cards)
player.displayCards()
