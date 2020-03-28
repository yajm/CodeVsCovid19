<html>
<head>
  <meta charset="utf-8">
</head>
<body widht=100%>

  <style type="text/css">
    iframe {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }
    canvas {
      position: absolute;
      top: 10%;
      left: 5%;
      width: 90%;
      height: 80%;
      z-index: 2;
    }
  </style>
  <canvas id="gameField" width="2000" height="1000"></canvas>
  <iframe id="jitsi" allow="camera; microphone" src="<?php echo "https://meet.jit.si/coronajass".$_GET["id"];?>"></iframe>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="assets/js/player.js"></script>  
 <!-- // $.getJSON("../api/?action=game_state",
  //     function(data) {
  //       console.log(data)     
  //       game.id=data.game.id
  // });

  //String pagenNameValue=request.getParameter("pagename");
  //document.getElementById('jitsi').src = "https://meet.jit.si/coronajass-"+game.id;
-->
</body>
</html>