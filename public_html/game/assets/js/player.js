$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
});


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

cardImages = []

cardWidth = 175
cardHeight=250

for(var i = 0; i < cardFiles.length; i++){
  var image = new Image()
  image.src = cardFiles[i]
  cardImages.push(image)
}


class Player {
  constructor(game) {
    this.game = game
    this.id = null
    this.cards = null
    this.width=0.8
    this.relYPos=0.7
  }

  displayCards() {
    document.getElementById('cardHolder').innerHTML = this.toString()
  }

  draw() {
    var c = document.getElementById("gameField");
    var context = c.getContext('2d')

    var width = this.width * c.width
    var posy = c.height * this.relYPos
    var spacing = width/this.cards.length

    var left = (c.width - width) / 2

    if(this.cards.length > 0){
      context.clearRect(left,posy,(this.cards.length)*spacing+this.cards[0].width,this.cards[0].height)
    }
    else{
      context.clearRect(left,posy,cardWidth,cardHeight)
    }

    for (var i = 0; i < this.cards.length; i++){
      var card = this.cards[i]
      var posx = left + i*spacing
      card.draw(posx,posy,1)
    }
  }

  clicked(x,y) {
    for (var i = 0; i < this.cards.length; i++){
      var card = this.cards[i]
      if(this.cards[i].isClicked(x,y)){
        return i
        }
      }
    return null
  }

}

class Table {
  constructor(startPlayer){
    this.relXPos = 0.8
    this.relYPos = 0.2
    this.relSize = 0.09

    this.currentPlayer = startPlayer
    this.cards = [null, null, null, null]
    this.names = ["", "", "", ""]
    this.turn=0
    this.protagonist=0
    this.full=false
  }

  claim(playerIndex){
    this.cards = [null, null, null, null]
    this.full=false
    this.currentPlayer=playerIndex
  }

  isClicked(x,y) {
    var c = document.getElementById("gameField");
    var context = c.getContext('2d')
    var centerX = c.width*this.relXPos
    var centerY = c.height*this.relYPos
    var offset = c.width*this.relSize
    return centerX-offset <= x && centerX+offset >= x &&  centerY-offset <= y && centerY+offset >= y
  }

  addCard(playerIndex, card){
    if(this.full){
      alert("Klicke auf die gespielten Karten um sie einzusammeln.")
      return false
    }
    else if(playerIndex == this.currentPlayer){
      this.cards[playerIndex] = card
      this.draw()
      this.currentPlayer = (this.currentPlayer+1)%4

      if(this.cards[0] != null && this.cards[1] != null &&
        this.cards[2] != null && this.cards[3] != null){
          this.full=true
        }
      return true
    }
    else{
      alert("Du bist nicht am Zug!")
      return false
    }
  }

  draw(){
    var c = document.getElementById("gameField");
    var context = c.getContext('2d')

    var centerX = c.width*this.relXPos
    var centerY = c.height*this.relYPos
    var offset = c.width*this.relSize
    var outlineWidth=4

    var textOffset=10
    var offsets = [
      [0,offset],
      [-offset,0],
      [0,-offset],
      [offset,0]
    ]

    context.clearRect(centerX-offset-outlineWidth, centerY-offset-outlineWidth,
                      2*offset+cardWidth+2*outlineWidth, 2*offset+cardHeight+2*outlineWidth)

    for(var i = 0; i < 4; i++){
      if(this.turn == i){
        if(this.protagonist == i){
          context.fillStyle = "#FF000040";
        }
        else{
          context.fillStyle = "#FF000020";
        }
      }
      else{
        if(this.protagonist == i){
          context.fillStyle = "#00000040";
        }
        else{
          context.fillStyle = "#00000020";
        }
      }
      // Fill card holder
      context.fillRect(centerX-outlineWidth+offsets[i][0],
                       centerY-outlineWidth+offsets[i][1],
                       cardWidth,cardHeight)
     // Draw Name
     console.log(this.protagonist, this.protagonist==i)
     if(this.protagonist == i){
       context.fillStyle = "#80000080";
       context.font = "33px Sans Bold";
     }
     else{
       context.fillStyle = "#00000080";
       context.font = "30px Sans";
     }
     context.textBaseline = 'middle';
     context.textAlign = 'center';
     context.fillText(this.names[i],centerX+cardWidth/2+offsets[i][0],centerY+cardHeight/2+offsets[i][1])

     // Draw Card
     if(this.cards[i] != null){
       this.cards[i].draw(centerX+offsets[i][0], centerY+offsets[i][1])
     }
    }
  }
}

class Card{

  constructor(index){
    this.index = index
    this.x = 0
    this.y = 0
    this.borderSize=1

    this.width = cardWidth
    this.height = cardHeight

    this.image = cardImages[index]
    this.loaded = false

  }


  draw(x,y){
    this.x=x
    this.y=y
    var c = document.getElementById("gameField");
    var ctx = c.getContext("2d");
    ctx.drawImage(this.image,x,y,this.width, this.height)
  }

  isClicked(x,y) {
    return this.x <= x && this.x + this.width >= x &&  this.y <= y && this.y + this.height >= y
  }

}

class Game{
  constructor(){
    this.table = new Table(0)
    this.player = new Player(this,0)
    this.room_name=null
    this.id=null
    this.player_ids=null
    this.turn=3
  }

  updatePlayerCards(cards){
    cards.sort()
    this.player.cards = []
    for(var i = 0; i < cards.length; i++){
      this.player.cards.push(new Card(cards[i]-1))
    }
    this.player.draw()
  }

  clicked(x,y) {
    console.log(this.player_ids, this.turn, this.player.id, this.player.cards)
    var cardIndex = this.player.clicked(x,y)
    if(cardIndex != null){
      $.getJSON("https://studentethz.ch/api/?action=play_card&card_num="+(this.player.cards[cardIndex].index+1),
        function (data) {
          console.log("Play",data)
        }
      )
      this.table.cards[this.turn] = this.player.cards[cardIndex]
      this.player.cards.splice(cardIndex,1)
      this.player.draw()
    }

    console.log("claimning")

    if(this.table.isClicked(x,y)){
      $.getJSON("https://studentethz.ch/api/?action=claim",
        function (data) {
          console.log("Claimed",data)
        }
      )
    }
  }
}

function doPolling(game){
  $.getJSON("https://studentethz.ch/api/?action=game_state",
      function(data) {
        console.log(data)
        if(data.error==-1){
          for(var i = 0; i < 4; i++){
            if(data.players[i].last_card!= null){
              game.table.cards[i] = new Card(Number(data.players[i].last_card-1))
            }
            else{
              game.table.cards[i] = null
            }
          }
          //console.log("Game Table",game.table)
          game.table.draw()

          game.table.turn = data.game.turn
          game.room_name = data.game.room_name
          game.id=data.game.id

          game.player_ids = [
            data.players[0].id,
            data.players[1].id,
            data.players[2].id,
            data.players[3].id
          ]

          game.table.names = [
            data.players[0].name,
            data.players[1].name,
            data.players[2].name,
            data.players[3].name
          ]

          game.player.id = Number(data.protagonist)
          game.table.protagonist = game.player_ids.indexOf(game.player.id)

          game.updatePlayerCards(data.players[game.player_ids.indexOf(game.player.id)].cards)
        }
        setTimeout(function(){doPolling(game)},500);
   });
}


function main(){

    var game = new Game()
    doPolling(game)

    var elem = document.getElementById('gameField'),
        elemLeft = elem.offsetLeft,
        elemTop = elem.offsetTop,
        context = elem.getContext('2d'),
        elements = [];

    // Add event listener for `click` events.
    elem.addEventListener('click', function(event) {
        var c = document.getElementById("gameField");
        var rect = c.getBoundingClientRect();
        var ctx = c.getContext("2d");

        var x =(event.clientX-rect.left)*c.width/rect.width,
            y = (event.clientY-rect.top)*c.height/rect.height;
        game.clicked(x,y)
    }, false);

}

main()
