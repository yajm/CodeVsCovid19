class Player {
  constructor(cards) {
    this.cards = cards
    this.width=0.75
    this.height=0.65
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
    "assets/images/b6.jpg",
    "assets/images/b7.jpg",
    "assets/images/b8.jpg",
    "assets/images/b9.jpg",
    "assets/images/b0.jpg",
    "assets/images/b1.jpg",
    "assets/images/b2.jpg",
    "assets/images/b3.jpg",
    "assets/images/b4.jpg",
    "assets/images/e6.jpg",
    "assets/images/e7.jpg",
    "assets/images/e8.jpg",
    "assets/images/e9.jpg",
    "assets/images/e0.jpg",
    "assets/images/e1.jpg",
    "assets/images/e2.jpg",
    "assets/images/e3.jpg",
    "assets/images/e4.jpg",
    "assets/images/r6.jpg",
    "assets/images/r7.jpg",
    "assets/images/r8.jpg",
    "assets/images/r9.jpg",
    "assets/images/r0.jpg",
    "assets/images/r1.jpg",
    "assets/images/r2.jpg",
    "assets/images/r3.jpg",
    "assets/images/r4.jpg",
    "assets/images/s6.jpg",
    "assets/images/s7.jpg",
    "assets/images/s8.jpg",
    "assets/images/s9.jpg",
    "assets/images/s0.jpg",
    "assets/images/s1.jpg",
    "assets/images/s2.jpg",
    "assets/images/s3.jpg",
    "assets/images/s4.jpg"
  ]
  constructor(index){
    this.index = index
    this.x = 0
    this.y = 0
    this.borderColor='#000'
    this.fillColor='#fff'
    this.fontColor='#000'
    this.borderSize=1
    this.image = new Image();

    this.width = 200
    this.height = 400

    this.image.card = this
    this.image.src = this.cardFiles[index]
    this.image.onload = function() {this.card.draw(this.card.x, this.card.y)}
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
  new Card(0),
  new Card(2),
  new Card(8),
  new Card(10),
  new Card(12),
  new Card(14),
  new Card(30),
  new Card(31),
  new Card(35)
]


var player = new Player(cards)
var allLoaded = false
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
