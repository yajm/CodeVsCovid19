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
  cardFiles = [
   "../images/b6","../images/b7","../images/b8","../images/b9","../images/b0",
   "../images/b1","../images/b2","../images/b3","../images/b4",
   "../images/e6","../images/e7","../images/e8","../images/e9","../images/e0",
   "../images/e1","../images/e2","../images/e3","../images/e4",
   "../images/r6","../images/r7","../images/r8","../images/r9","../images/r0",
   "../images/r1","../images/r2","../images/r3","../images/r4",
   "../images/s6","../images/s7","../images/s8","../images/s9","../images/s0",
   "../images/s1","../images/s2","../images/s3","../images/s4"
  ]
  constructor(index){
    this.index = index
    this.x = 0
    this.y = 0
    this.width = 100
    this.height = 200
    this.borderColor='#000'
    this.fillColor='#fff'
    this.fontColor='#000'
    this.borderSize=1
    this.image = new Image();
    this.image.src = cardFiles[index];
  }

  draw(x,y){
    this.x=x
    this.y=y
    var c = document.getElementById("gameField");
    var ctx = c.getContext("2d");
    ctx.drawImage(this.image,x,y)
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
