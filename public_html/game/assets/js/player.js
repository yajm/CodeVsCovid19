$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
});


cardFiles = [
  "b6",  "b7",  "b8",  "b9",  "b0",  "b1",  "b2",  "b3", "b4",
  "e6",  "e7",  "e8",  "e9",  "e0",  "e1",  "e2",  "e3", "e4",
  "r6",  "r7",  "r8",  "r9",  "r0",  "r1",  "r2",  "r3",  "r4",
  "s6",  "s7",  "s8",  "s9",  "s0",  "s1",  "s2",  "s3",  "s4"
]

cardImages = [];

cardWidth = 175;
cardHeight = 250;

for(var i = 0; i < cardFiles.length; i++){
  var image = new Image();
  image.src = "assets/images/"+cardFiles[i]+".jpg";
  cardImages.push(image);
}


class Player {
  constructor(game) {
    this.game = game;
    this.id = null;
    this.cards = null;
    this.width=0.7;
    this.relYPos=0.7;
    this.claimed_cards = [];
  }

  displayCards() {
    document.getElementById('cardHolder').innerHTML = this.toString();
  }

  draw() {
    var c = document.getElementById("gameField");
    var context = c.getContext('2d');

    var width = this.width * c.width;
    var posy = c.height * this.relYPos;
    var spacing = width/this.cards.length;

    var left = (c.width - width) / 2;

    if(this.cards.length > 0){
      context.clearRect(left,posy,(this.cards.length)*spacing+this.cards[0].width,this.cards[0].height);
    }
    else{
      context.clearRect(left,posy,cardWidth,cardHeight);
    }

    console.log(this.cards)
    for (var i = 0; i < this.cards.length; i++){
      var card = this.cards[i];
      var posx = left + i*spacing;
      card.draw(posx,posy,1);
    }
  }

  clicked(x,y) {
    for (var i = 0; i < this.cards.length; i++){
      var card = this.cards[i];
      if(this.cards[i].isClicked(x,y)){
        return i;
        }
      }
    return null;
  }

}

class Table {
  constructor(startPlayer){
    this.relXPos = 0.8;
    this.relYPos = 0.2;
    this.relSize = 0.07;

    this.currentPlayer = startPlayer;
    this.cards = [null, null, null, null];
    this.names = ["", "", "", ""];
    this.positions = [0,1,2,3];
    this.turn=0;
    this.protagonist=0;
    this.full=false;
  }

  claim(playerIndex){
    this.cards = [null, null, null, null];
    this.full=false;
    this.currentPlayer=playerIndex;
  }

  isFull(){
    for(var i = 0; i < this.cards.length; i++){
      if(this.cards[i] == null){
        return false;
      }
    }
    return true;
  }

  isEmpty(){
    for(var i = 0; i < this.cards.length; i++){
      if(this.cards[i] != null){
        return false;
      }
    }
    return true;
  }

  isClicked(x,y) {
    var c = document.getElementById("gameField");
    var context = c.getContext('2d');
    var centerX = c.width*this.relXPos;
    var centerY = c.height*this.relYPos;
    var offset = c.width*this.relSize;
    return centerX-offset <= x && centerX+offset >= x &&  centerY-offset <= y && centerY+offset >= y;
  }

  clear(){
    var c = document.getElementById("gameField");
    var context = c.getContext('2d');

    var centerX = c.width*this.relXPos;
    var centerY = c.height*this.relYPos;
    var offset = c.width*this.relSize;
    var outlineWidth=4;

    var textOffset=10;
    var offsets = [
      [0,-offset],
      [-offset,0],
      [0,offset],
      [offset,0]
    ];

    context.clearRect(centerX-offset-outlineWidth-2, centerY-offset-outlineWidth-2,
                      2*offset+cardWidth+2*outlineWidth, 2*offset+cardHeight+2*outlineWidth+80);

  }

  draw(){
    var c = document.getElementById("gameField");
    var context = c.getContext('2d');

    var centerX = c.width*this.relXPos;
    var centerY = c.height*this.relYPos;
    var offset = c.width*this.relSize;
    var outlineWidth=4;

    var textOffset=10;
    var offsets = [
      [0,-offset],
      [-offset,0],
      [0,offset],
      [offset,0]
    ];

    this.clear();

    for(var i = 0; i < 4; i++){
      var fillColor;
      var strokeColor;

      if(this.turn == i){
        if(this.positions.indexOf(this.protagonist) == i){
          fillColor = "#F4CD3E40";
          strokeColor = "#FFFFFF40";
        }
        else{
          fillColor = "#F4CD3E20";
          strokeColor = "#FFFFFF";
        }
      }
      else{
        if(this.positions.indexOf(this.protagonist) == i){
          fillColor = "#00000040";
          strokeColor = "#FFFFFF40";
        }
        else{
          fillColor = "#00000020";
          strokeColor = "#FFFFFF20";
        }
      }

      // https://stackoverflow.com/questions/58220590/how-to-blur-a-specific-region-of-a-html5-video-tag;
      // Fill card holder;
      context.fillStyle = fillColor;
      context.strokeStyle = strokeColor;
      this.roundRect(context, centerX-outlineWidth+offsets[i][0],
                       centerY-outlineWidth+offsets[i][1],
                       cardWidth,cardHeight, 16, true, true);
     // Draw Name;
     if(this.positions.indexOf(this.protagonist) == i){
        context.fillStyle = "#FFFFFFE0"
        context.strokeStyle = "#00FF0040"
        context.font = "35px Sans Bold";
     }
     else{
        context.fillStyle = "#FFFFFFE0"
        context.strokeStyle = "#00000040"
        context.font = "30px Sans";
     }

     var name = this.names[this.positions[i]]
     if(name.length > 10){
        name = name.substring(0,8)+"..."
     }
     context.textBaseline = 'middle';
     context.textAlign = 'center';
     context.fillText(name,centerX+cardWidth/2+offsets[i][0],centerY+cardHeight/2+offsets[i][1]);
     context.strokeText(name,centerX+cardWidth/2+offsets[i][0],centerY+cardHeight/2+offsets[i][1]);

     // Draw Card;
     if(this.cards[this.positions[i]] != null){
       this.cards[this.positions[i]].draw(centerX+offsets[i][0], centerY+offsets[i][1]);
     }
    }
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === 'undefined') {
        stroke = true;
      }
      if (typeof radius === 'undefined') {
        radius = 10;
      }
      if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
      } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
        }
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();
      if (fill) {
        ctx.fill();
      }
      if (stroke) {
        ctx.stroke();
      }
    }
}

class NewGame {
  constructor(){
    this.relXPos = 0.8;
    this.relYPos = 0.2;
    this.relSize = 0.07;

    this.protagonist = null;
    this.names = [null, null, null, null];
  }

  clear(){
    var c = document.getElementById("gameField");
    var context = c.getContext('2d');

    var centerX = c.width*this.relXPos;
    var centerY = c.height*this.relYPos;
    var offset = c.width*this.relSize;
    var outlineWidth=4;

    context.clearRect(centerX-offset-outlineWidth-40, centerY-offset-outlineWidth-40,
                      2*offset+cardWidth+2*outlineWidth+40, 2*offset+cardHeight+2*outlineWidth+80);

  }

  draw(){
    var c = document.getElementById("gameField");
    var context = c.getContext('2d');

    var centerX = c.width*this.relXPos;
    var centerY = c.height*this.relYPos;
    var offset = c.width*this.relSize;

    var offsets = [
      [0,-offset],
      [-offset,0],
      [0,offset],
      [offset,0]
    ];

    this.clear();

    context.fillStyle = "#00000080";
    context.font = "30px Sans";
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText("Wo möchtest du sitzen?",centerX + offset/2,centerY+offset+cardHeight+30);

    for(var i = 0; i < 4; i++){
      var color;

      if(this.protagonist == null){
          if(this.names[i] == null){
            color = "#B1D18280"
          }
          else{
            color = "#F4CD3E80"
          }
      }
      else{
        if(this.protagonist == i){
          color = "#B1D18220"
        }
        else{
          color = "#00000020"
        }
      }
      // Fill card holder;
      // https://stackoverflow.com/questions/58220590/how-to-blur-a-specific-region-of-a-html5-video-tag;
      context.fillStyle = color;
      this.roundRect(context, centerX+offsets[i][0],
                       centerY+offsets[i][1],
                       cardWidth,cardHeight, 16, color, false);
     // Draw Name;
     if(this.protagonist == i){
       context.fillStyle = "#688F4E80";
       context.font = "28px Sans Bold";
     }
     else{
       context.fillStyle = "#00000080";
       context.font = "24px Sans";
     }
     var name = "Freier Platz"
     if(this.names[i]!=null){
       name = this.names[i];
     }
     context.textBaseline = 'middle';
     context.textAlign = 'center';
     context.fillText(name,centerX+cardWidth/2+offsets[i][0],centerY+cardHeight/2+offsets[i][1]);
     if(i==0){
       context.fillText("Start Spieler",centerX+cardWidth/2+offsets[i][0],centerY+cardHeight/2+30+offsets[i][1]);
     }
    }
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === 'undefined') {
        stroke = true;
      }
      if (typeof radius === 'undefined') {
        radius = 10;
      }
      if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
      } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
        }
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();
      if (fill) {
        ctx.fill();
      }
      if (stroke) {
        ctx.stroke();
      }

    }

  isClicked(x,y) {
    var c = document.getElementById("gameField");
    var context = c.getContext('2d');

    var centerX = c.width*this.relXPos;
    var centerY = c.height*this.relYPos;
    var offset = c.width*this.relSize;
    var outlineWidth=4;

    var textOffset=10;
    var offsets = [
      [0,-offset],
      [-offset,0],
      [0,offset],
      [offset,0]
    ];

    for(var i = 0; i < 4; i++){
      if(centerX+offsets[i][0] <= x && centerX+offsets[i][0]+cardWidth >= x &&
        centerY+offsets[i][1] <= y && centerY+offsets[i][1]+cardHeight >= y){
          return i;
        }
    }
    return null;
  }

}


class Card{
  constructor(index){
    this.index = index;
    this.x = 0;
    this.y = 0;
    this.borderSize=1;

    this.width = cardWidth;
    this.height = cardHeight;

    this.image = cardImages[index];
    this.loaded = false;
  }


  draw(x,y){
    this.x=x;
    this.y=y;
    var c = document.getElementById("gameField");
    var ctx = c.getContext("2d");
    ctx.save();
    this.roundedImage(ctx, x,y,this.width, this.height, 16);
    ctx.clip();
    ctx.drawImage(this.image,x,y,this.width, this.height);
    ctx.restore();
  }

  roundedImage(ctx, x,y,width,height,radius){
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

  isClicked(x,y) {
    return this.x <= x && this.x + this.width >= x &&  this.y <= y && this.y + this.height >= y;
  }

}

function sortNumber(a, b) {
  return a - b;
}


class Game{
  constructor(){
    this.table = new Table(0);
    this.player = new Player(this,0);
    this.newGame = new NewGame();
    this.room_name=null;
    this.id=null;
    this.player_ids=null;
    this.turn=3;
    this.finished=false;
  }

  updatePlayerCards(cards){
    cards.sort(sortNumber);
    this.player.cards = [];
    for(var i = 0; i < cards.length; i++){
      this.player.cards.push(new Card(cards[i]-1));
    }
    this.player.draw();
  }

  clicked(x,y) {
    if(!this.finished){
      var cardIndex = this.player.clicked(x,y);
      if(cardIndex != null){
        $.getJSON("../api/?action=play_card&card_num="+(this.player.cards[cardIndex].index+1),
          function (data) {}
        );
        this.table.cards[this.turn] = this.player.cards[cardIndex];
        this.player.cards.splice(cardIndex,1);
        this.player.draw();
      }

      if(this.table.isFull() && this.table.isClicked(x,y)){
        for(var i = 0; i < 4; i++){
          this.player.claimed_cards.push(this.table.cards[i].index);
          this.table.cards[i] == null;
        }
        $.getJSON("../api/?action=claim",
          function (data) {}
        );
      }
    }
    else{
      var loc = this.newGame.isClicked(x,y);
      if(loc != null){
        $.getJSON("../api/?action=sit&position="+loc,
          function (data) {}
        );
      }
    }
  }
}

function doPolling(game){
  try{
    $.getJSON("../api/?action=game_state",
        function(data) {
          console.log(data);
          if(data.error==-1){
            game.table.turn = data.game.turn;
            game.room_name = data.game.room_name;
            game.id=data.game.id;
            game.finished=data.game.finished;

            game.player_ids = [];
            game.table.names = [];
            game.table.positions = [0,0,0,0];
            for(var i = 0; i < 4; i++){
                if(data.players[i] != null){
                  game.player_ids.push(data.players[i].id);
                  game.table.names.push(data.players[i].name);
                  game.table.positions[data.players[i].position]=i;
                }
            }

            if(!game.finished){
              for(var i = 0; i < 4; i++){
                if(data.players[i].last_card!= null){
                  game.table.cards[i] = new Card(Number(data.players[i].last_card-1));
                }
                else{
                  game.table.cards[i] = null;
                }
              }
              game.table.draw();

              game.player.id = Number(data.protagonist);
              game.table.protagonist = game.player_ids.indexOf(game.player.id);
              var index = game.player_ids.indexOf(game.player.id);
              if(index != -1){
                game.updatePlayerCards(data.players[index].cards);
              }
              else{
                game.updatePlayerCards([]);
              }

            }
            else{
              game.player.id = Number(data.protagonist);
              var index = game.player_ids.indexOf(game.player.id);
              if(index != -1){
                game.updatePlayerCards(data.players[index].claimed);
              }
              else{
                game.updatePlayerCards([]);
              }
              game.newGame.names = [null, null, null];

              for(var i = 0; i < 4; i++){
                if(data.players[i]!=null && data.players[i].ready){
                  game.newGame.names[data.players[i].position] = data.players[i].name;
                  if(i==index){
                    game.newGame.protagonist = data.players[i].position;
                  }
                }
              }
              game.newGame.draw();
            }
          }
     });
   }
   catch (e){
     console.log(e);
   }
   setTimeout(function(){doPolling(game)},500);
}

// const supports_backdrop_filter = (function() {
//   const style = document.createElement('_').style;
//   style.cssText = 'backdrop-filter: blur(2px);-webkit-backdrop-filter: blur(2px);';
//   return style.length !== 0 &&
//     (document.documentMode === undefined || document.documentMode > 9);
// })();

// // unsupporting browsers;
// if( !supports_backdrop_filter ) {
//   ctx.filter = 'blur(' + spread + 'px)';

//   vid.onplaying = startDrawing;
//   vid.onpause = stopDrawing;
// }

// function draw() {
//   const vid_rect = vid.getBoundingClientRect();
//   const can_rect = canvas.getBoundingClientRect();
//   const s_x = (can_rect.left - vid_rect.left) + border_width;
//   const s_y = (can_rect.top - vid_rect.top) + border_width;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   const offset = spread * 2;
//   const output_w = canvas.width + (offset * 2);
//   const output_h = canvas.height + (offset * 2);
//   const ratio_x = vid_rect.width / vid.videoWidth;
//   const ratio_y = vid_rect.height / vid.videoHeight;

//   ctx.drawImage(
//     vid,
//     (s_x - offset) / ratio_x, (s_y - offset) / ratio_y, output_w  / ratio_x, output_h / ratio_y,
//     -offset, -offset, output_w, output_h;
//   );
// }


function main(){

    var game = new Game();
    doPolling(game);

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
        game.clicked(x,y);
    }, false);

}

main()
