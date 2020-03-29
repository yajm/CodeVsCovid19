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
    this.width=0.7
    this.relYPos=0.7
    this.claimed_cards = []
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
    this.positions = [0,1,2,3]
    this.turn=0
    this.protagonist=0
    this.full=false
  }

  claim(playerIndex){
    this.cards = [null, null, null, null]
    this.full=false
    this.currentPlayer=playerIndex
  }

  isFull(){
    for(var i = 0; i < this.cards.length; i++){
      if(this.cards[i] == null){
        return false
      }
    }
    return true
  }

  isEmpty(){
    for(var i = 0; i < this.cards.length; i++){
      if(this.cards[i] != null){
        return false
      }
    }
    return true
  }

  isClicked(x,y) {
    console.log("Ckicked on Me")
    var c = document.getElementById("gameField");
    var context = c.getContext('2d')
    var centerX = c.width*this.relXPos
    var centerY = c.height*this.relYPos
    var offset = c.width*this.relSize
    console.log(x,y,centerX-offset <= x && centerX+offset >= x &&  centerY-offset <= y && centerY+offset >= y)
    return centerX-offset <= x && centerX+offset >= x &&  centerY-offset <= y && centerY+offset >= y
  }

  clear(){
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
                      2*offset+cardWidth+2*outlineWidth, 2*offset+cardHeight+2*outlineWidth+80)

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

    this.clear()
    console.log("Positions",this.positions, this.protagonist,this.positions.indexOf(this.protagonist), this.names)

    for(var i = 0; i < 4; i++){
      if(this.turn == i){
        if(this.positions.indexOf(this.protagonist) == i){
          context.fillStyle = "#FF000040";
        }
        else{
          context.fillStyle = "#FF000020";
        }
      }
      else{
        if(this.positions.indexOf(this.protagonist) == i){
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
     if(this.positions.indexOf(this.protagonist) == i){
       context.fillStyle = "#80000080";
       context.font = "33px Sans Bold";
     }
     else{
       context.fillStyle = "#00000080";
       context.font = "30px Sans";
     }

     context.textBaseline = 'middle';
     context.textAlign = 'center';
     context.fillText(this.names[this.positions[i]],centerX+cardWidth/2+offsets[i][0],centerY+cardHeight/2+offsets[i][1])

     // Draw Card
     if(this.cards[this.positions[i]] != null){
       this.cards[this.positions[i]].draw(centerX+offsets[i][0], centerY+offsets[i][1])
     }
    }
  }
}

class NewGame {
  constructor(){
    this.relXPos = 0.8
    this.relYPos = 0.2
    this.relSize = 0.09

    this.protagonist = null
    this.names = [null, null, null, null]
  }

  clear(){
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

    context.clearRect(centerX-offset-outlineWidth-30, centerY-offset-outlineWidth-30,
                      2*offset+cardWidth+2*outlineWidth+30, 2*offset+cardHeight+2*outlineWidth+80)

  }

  draw(){
    var c = document.getElementById("gameField");
    var context = c.getContext('2d')

    var centerX = c.width*this.relXPos
    var centerY = c.height*this.relYPos
    var offset = c.width*this.relSize

    var offsets = [
      [0,offset],
      [-offset,0],
      [0,-offset],
      [offset,0]
    ]

    this.clear()

    context.fillStyle = "#00000080";
    context.font = "30px Sans";
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText("Wo möchtest du sitzen?",centerX + offset/2,centerY+offset+cardHeight+30)

    for(var i = 0; i < 4; i++){
      if(this.protagonist == null){
          if(this.names[i] == null){
            context.fillStyle = "#00FF0080"
          }
          else{
            context.fillStyle = "#FF000080"
          }
      }
      else{
        if(this.protagonist == i){
          context.fillStyle = "#00FF0020"
        }
        else{
          context.fillStyle = "#00000020"
        }
      }
      // Fill card holder
      context.fillRect(centerX+offsets[i][0],
                       centerY+offsets[i][1],
                       cardWidth,cardHeight)
     // Draw Name
     if(this.protagonist == i){
       context.fillStyle = "#80000080";
       context.font = "33px Sans Bold";
     }
     else{
       context.fillStyle = "#00000080";
       context.font = "30px Sans";
     }
     var name = "Freier Platz"
     if(this.names[i]!=null){
       name = this.names[i]
     }
     context.textBaseline = 'middle';
     context.textAlign = 'center';
     context.fillText(name,centerX+cardWidth/2+offsets[i][0],centerY+cardHeight/2+offsets[i][1])
    }
  }

  isClicked(x,y) {
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

    for(var i = 0; i < 4; i++){
      if(centerX+offsets[i][0] <= x && centerX+offsets[i][0]+cardWidth >= x &&
        centerY+offsets[i][1] <= y && centerY+offsets[i][1]+cardHeight >= y){
          return i;
        }
    }
    return null
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
    this.newGame = new NewGame()
    this.room_name=null
    this.id=null
    this.player_ids=null
    this.turn=3
    this.finished=false
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
    if(!this.finished){
      console.log("Not finished")
      var cardIndex = this.player.clicked(x,y)
      if(cardIndex != null){
        $.getJSON("../api/?action=play_card&card_num="+(this.player.cards[cardIndex].index+1),
          function (data) {
            console.log("Play",data)
          }
        )
        this.table.cards[this.turn] = this.player.cards[cardIndex]
        this.player.cards.splice(cardIndex,1)
        this.player.draw()
      }

      console.log("claiming")
      console.log(this.table.isFull(), this.table.isClicked(x,y))
      if(this.table.isFull() && this.table.isClicked(x,y)){
        for(var i = 0; i < 4; i++){
          console.log("Table Cards:", this.table.cards[i])
          this.player.claimed_cards.push(this.table.cards[i].index)
          this.table.cards[i] == null
        }
        $.getJSON("../api/?action=claim",
          function (data) {
            console.log("Claimed",data)
          }
        )
      }
    }
    else{
      var loc = this.newGame.isClicked(x,y)
      console.log("loc",loc)
      if(loc != null){
        console.log("api, sit")
        $.getJSON("../api/?action=sit&position="+loc,
          function (data) {
            console.log("Sit",data)
          }
        )
      }
    }
  }
}

function doPolling(game){
  $.getJSON("../api/?action=game_state",
      function(data) {
        console.log("GAME POLL:", data)
        if(data.error==-1){
          game.table.turn = data.game.turn
          game.room_name = data.game.room_name
          game.id=data.game.id
          game.finished=data.game.finished

          game.player_ids = []
          game.table.names = []
          game.table.positions = [0,0,0,0]
          for(var i = 0; i < 4; i++){
              if(data.players[i] != null){
                game.player_ids.push(data.players[i].id)
                game.table.names.push(data.players[i].name)
                game.table.positions[data.players[i].position]=i
              }
          }

          if(!game.finished){
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

            game.player.id = Number(data.protagonist)
            game.table.protagonist = game.player_ids.indexOf(game.player.id)
            var index = game.player_ids.indexOf(game.player.id)
            console.log(game.player_ids,game.player.id, index)
            if(index != -1){
              game.updatePlayerCards(data.players[index].cards)
            }
            else{
              game.updatePlayerCards([])
            }

          }
          else{
            game.player.id = Number(data.protagonist)
            var index = game.player_ids.indexOf(game.player.id)
            console.log(game.player_ids,game.player.id, index)
            if(index != -1){
              game.updatePlayerCards(data.players[index].claimed)
            }
            else{
              game.updatePlayerCards([])
            }
            game.newGame.names = [null, null, null]

            for(var i = 0; i < 4; i++){
              if(data.players[i]!=null && data.players[i].ready){
                game.newGame.names[data.players[i].position] = data.players[i].name
                if(i==index){
                  game.newGame.protagonist = data.players[i].position
                }
              }
            }
            game.newGame.draw()
          }
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
