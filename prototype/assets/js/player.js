class Player {
  constructor(cards) {
    this.cards = cards
    this.width=0.75
    this.height=0.75
  }

  displayCards() {
    document.getElementById('cardHolder').innerHTML = this.toString()
  }

  draw() {
    var c = document.getElementById("gameField");
    var context = c.getContext('2d')
    context.clearRect(0,0,c.width,c.height)
    var width = this.width * c.width
    var posy = c.height * this.height
    var spacing = width/cards.length

    var left = (c.width - width) / 2
    for (var i = 0; i < cards.length; i++){
      var card = cards[i]
      var posx = left + i*spacing
      card.draw(posx,posy,1)
    }
  }

  clicked(x,y) {
    console.log(x,y)
    for (var i = 0; i < this.cards.length; i++){
      var card = this.cards[i]
      if(this.cards[i].isClicked(x,y)){
        this.cards.splice(i,1)
        break
      }
    }
    this.draw()
  }

}

class Card{
  constructor(suit, value){
    this.suit = suit
    this.value = value
    this.x = 0
    this.y = 0
    this.width = 100
    this.height = 200
    this.borderColor='#000'
    this.fillColor='#fff'
    this.fontColor='#000'
    this.borderSize=1
  }

  draw(x,y){
    this.x=x
    this.y=y
    var c = document.getElementById("gameField");
    var ctx = c.getContext("2d");
    ctx.fillStyle=this.borderColor;
    ctx.fillRect(x,y,this.width, this.height);
    ctx.fillStyle=this.fillColor;
    ctx.fillRect(x+this.borderSize,y+this.borderSize,this.width-2*this.borderSize, this.height-2*this.borderSize);
    ctx.fillStyle=this.fontColor;
    ctx.font = this.height/4+"px Arial";
    ctx.fillText(this.toString(), x, y+this.height/2);
  }

  isClicked(x,y) {
    console.log(x,y,this.x, this.y, this.width,this.height)
    return this.x <= x && this.x + this.width >= x &&  this.y <= y && this.y + this.height >= y
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
player.draw()

var elem = document.getElementById('gameField'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d'),
    elements = [];

// Add event listener for `click` events.
elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    player.clicked(x,y)

}, false);
