class Player {
  constructor(table, playerIndex) {

    var player = this
    this.cards = []

    $.getJSON("http://studentethz.ch/api/?action=my_cards",
       function(data) {
         if(data.error == -1){
           console.log(data.cards)
           for(var i = 0; i < data.cards.length; i++){
             player.cards.push(new Card(data.cards[i]))
           }
           player.draw()
         }
    });

    this.width=0.4
    this.relYPos=0.8
    this.table=table
    this.playerIndex = playerIndex

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
      context.clearRect(left,posy,500,500)
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
        if(this.table.addCard(this.playerIndex, this.cards[i])){
          this.table.card1 = this.cards[i]

          $.getJSON("http://studentethz.ch/api/?action=play_card&card_num="+this.cards[i],
             function(data) {
               console.log("Play Card:",data)
          });

          this.cards.splice(i,1)
          break
        }
      }
    }

    if(this.table.isClicked(x,y) && this.table.full){
      this.table.claim(this.playerIndex)
    }

    this.table.draw()
    this.draw()
  }

}

class Table {
  constructor(startPlayer){
    this.relXPos = 0.8
    this.relYPos = 0.2
    this.relSize = 0.06

    this.currentPlayer = startPlayer
    this.cards = [null, null, null, null]
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

    context.clearRect(centerX-offset, centerY-offset,
                      2*offset+300, 2*offset+300)

    if(this.cards[0] != null){
      this.cards[0].draw(centerX, centerY+offset)
    }
    if(this.cards[1] != null){
      this.cards[1].draw(centerX-offset, centerY)
    }
    if(this.cards[2] != null){
      this.cards[2].draw(centerX, centerY-offset)
    }
    if(this.cards[3] != null){
      this.cards[3].draw(centerX+offset, centerY)
    }
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
    this.borderSize=1
    this.image = new Image();

    this.width = 100
    this.height = 160

    this.loaded = false

    this.image.card = this
    this.image.src = this.cardFiles[index]
    this.image.onload = function() {
      this.card.draw(this.card.x, this.card.y)
      this.card.loaded=true
    }
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

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

class Game{
  constructor(){
    this.table = new Table(0)
    this.player = new Player(this.table,0)
    this.room_name=null
    this.id=null
    this.player1=null
    this.player2=null
    this.player3=null
    this.player4=null
    this.turn=0
  }

  update(){
    game = this
    $.getJSON("http://studentethz.ch/api/?action=game_state",
        function(data) {
          if(error==-1){
            for(var i = 0; i < 4; i++){
              if(game.table.cards[i].index != data.players[i].last_card){
                game.table.cards[i] = new Card(data.players[i].last_card)
              }
            }
            game.turn = data.turn
            game.room_name = data.room_name
            game.id=data.id
            game.player1=data.player1
            game.player2=data.player2
            game.player3=data.player3
            game.player4=data.player4
          }
     });
  }

}

function main(){
    var room_name = makeid(10)

    $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      }
    });

    $.get("http://studentethz.ch/api/?action=create_player&p_name=Peter")
    $.get("http://studentethz.ch/api/?action=join_game&room_name="+room_name)
    $.get("http://studentethz.ch/api/?action=create_player&p_name=Hans")
    $.get("http://studentethz.ch/api/?action=join_game&room_name="+room_name)
    $.get("http://studentethz.ch/api/?action=create_player&p_name=Frida")
    $.get("http://studentethz.ch/api/?action=join_game&room_name="+room_name)
    $.get("http://studentethz.ch/api/?action=create_player&p_name=Toni")
    $.get("http://studentethz.ch/api/?action=join_game&room_name="+room_name)

    $.getJSON("http://studentethz.ch/api/?action=game_state",
        function(data) {
          console.log("Game State",data)
     });

    var table = new Table(1)
    table.addCard(1,new Card(1))
    table.addCard(2,new Card(2))
    table.addCard(3,new Card(3))


    var player = new Player(table, 0)
    player.draw()

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
        player.clicked(x,y)
    }, false);

}

main()
