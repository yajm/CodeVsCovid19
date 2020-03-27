class Player {
  constructor(cards) {
    this.cards = cards
  }

  displayCards() {
    document.getElementById('cardHolder').innerHTML = this.toString()
  }

  draw(width,relHeight) {
    var c = document.getElementById("gameField");
    width *= c.width
    var posy = c.height * relHeight
    var spacing = width/cards.length

    var left = (c.width - width) / 2
    for (var i = 0; i < cards.length; i++){
      var card = cards[i]
      var posx = left + i*spacing
      card.draw(posx,posy,1)
    }
  }
}

class Card{
  constructor(suit, value){
    this.suit = suit
    this.value = value
    this.width = 300
    this.height = 600
    this.borderColor='#000'
    this.fillColor='#fff'
    this.fontColor='#000'
    this.borderSize=1
  }

  draw(x,y,size){
    var c = document.getElementById("gameField");
    var ctx = c.getContext("2d");
    ctx.fillStyle=this.borderColor;
    ctx.fillRect(x,y,this.width*size, this.height*size);
    ctx.fillStyle=this.fillColor;
    ctx.fillRect(x+this.borderSize,y+this.borderSize,this.width*size-2*this.borderSize, this.height*size-2*this.borderSize);
    ctx.fillStyle=this.fontColor;
    ctx.font = this.height*size/4+"px Arial";
    ctx.fillText(this.toString(), x, y+this.height*size/2);
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
  new Card("🌰","8"),
  new Card("🌰","9"),
  new Card("🌰","10"),
  new Card("🛡️","U"),
  new Card("💮","K"),
  new Card("🛡️","O"),
  new Card("💮","A")
]


var player = new Player(cards)
player.draw(0.75,0.75)
