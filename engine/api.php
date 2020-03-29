<?php
/*
	Call Description:

	https://studentethz.ch/api/?action=create_player&p_name=John
	Erstellt neuen Spieler mit Namen John

	https://studentethz.ch/api/?action=join_game&room_name=Spielwiese
	Joint Room namens Spielwiese

	https://studentethz.ch/api/?action=game_state
	Gibt informationen über das Spiel zurück

	https://studentethz.ch/api/?action=play_card&card_num=32
	Spielt die Karte 32 und steuert den Turn eins nach vorne
*/

	class API {
		function __construct() {
			session_start();
			$this->action();
		}

		function action() {
			$res = [];
			$res["error"] = -1;

			switch ($_GET["action"]) {
				case 'create_player':
					$this->makePlayer();
					$res["player"] = $_SESSION["player"];
					break;

				case 'join_game':
					$this->getGame();
					if(!isset($_SESSION["game"]["player1"])) {
						$GLOBALS["db"]->query("UPDATE game SET player1=? WHERE id=?", $_SESSION["player"]["id"], $_SESSION["game"]["id"]);
					}
					else if(!isset($_SESSION["game"]["player2"])) {
						$GLOBALS["db"]->query("UPDATE game SET player2=? WHERE id=?", $_SESSION["player"]["id"], $_SESSION["game"]["id"]);
					}
					else if(!isset($_SESSION["game"]["player3"])) {
						$GLOBALS["db"]->query("UPDATE game SET player3=? WHERE id=?", $_SESSION["player"]["id"], $_SESSION["game"]["id"]);
					}
					else if(!isset($_SESSION["game"]["player4"])) {
						$GLOBALS["db"]->query("UPDATE game SET player4=?, turn=0 WHERE id=?", $_SESSION["player"]["id"], $_SESSION["game"]["id"]);
						$_SESSION["game"]["player4"] = $_SESSION["player"]["id"];
						$this->reShuffleCards();
					}
					else {
						$res["error"] = "2552";
						$res["errorstr"] = "Game Room is full";
					}
					break;

				case 'game_state':
					if(!isset($_SESSION["player"])) {
						$res["error"] = "74";
						$res["errorstr"] = "First create a player before getting state of game";
					}
					else if(!isset($_SESSION["game"])) {
						$res["error"] = "17";
						$res["errorstr"] = "First join a game before getting state of game";
					}
					else {
						$this->refreshGame();
						$res["game"] = $_SESSION["game"];
						$res["protagonist"] = $_SESSION["player"]["id"];
						$res["players"] = [];
						for($i = 0; $i < 4; $i ++) {
							$res["players"][$i] = $GLOBALS["db"]->query("SELECT * FROM player WHERE id=?", $_SESSION["game"]["player".($i + 1)])[0];
							if($_SESSION["game"]["player".($i + 1)] === $_SESSION["player"]["id"]){
								$res["players"][$i]["cards"] = [];
								$cards = $GLOBALS["db"]->query("SELECT * FROM rel_inhand WHERE player_id=?", $_SESSION["game"]["player".($i + 1)]);
								for ($q=0; $q < sizeof($cards); $q++) {
									array_push($res["players"][$i]["cards"], $cards[$q]["card_num"]);
								}
								$res["players"][$i]["claimed"] = [];
								$claimed_cards = $GLOBALS["db"]->query("SELECT * FROM rel_stock WHERE player_id=?", $_SESSION["game"]["player".($i + 1)]);
								for ($q=0; $q < sizeof($claimed_cards); $q++) {
									array_push($res["players"][$i]["claimed"], $claimed_cards[$q]["card_num"]);
								}
							}
						}
					}
					break;

				case 'my_cards':
					# echo "Session:<br>";
					# echo '<pre>';
					# var_dump($_SESSION);
					# echo '</pre>';
					# echo "<br>###################<br>";

					if(!isset($_SESSION["player"])) {
						$res["error"] = "74";
						$res["errorstr"] = "First create a player before getting state of game";
					}
					else if(!isset($_SESSION["game"])) {
						$res["error"] = "17";
						$res["errorstr"] = "First join a game before getting state of game";
					}
					else {
						$this->refreshGame();
						$res["cards"] = [];
						$cards = $GLOBALS["db"]->query("SELECT * FROM rel_inhand WHERE player_id=?", $_SESSION["player"]["id"]);
						for ($q=0; $q < sizeof($cards); $q++) {
							array_push($res["cards"], $cards[$q]["card_num"]);
						}
					}
					break;
				case 'claim':
					if(!isset($_SESSION["player"])) {
						$res["error"] = "325";
						$res["errorstr"] = "First create a player before claiming anything!";
					}
					else if(!isset($_SESSION["game"])) {
						$res["error"] = "623";
						$res["errorstr"] = "First join a game before claiming anything!";
					}
					else{
						// Check if everyone has plaid their card
						$all_played=TRUE;
						$res["lastcards"]=[0,0,0,0];
						for($i = 0; $i < 4; $i ++) {
							$last_card = $GLOBALS["db"]->query("SELECT last_card FROM player WHERE id=?", $_SESSION["game"]["player".($i + 1)])[0]["last_card"];
							$res["lastcards"][$i]=$last_card;
							if($last_card == null){
								$all_played=FALSE;
							}
						}
						if(! $all_played){
							$res["error"] = "624";
							$res["errorstr"] = "Not everyone has played yet.";
						}
						else{
							$this->refreshGame();
							// Set all played cards to null

							for($q = 0; $q < sizeof($player_cards); $q ++) {
							}

							for($i = 0; $i < 4; $i ++) {
								$last_card = $GLOBALS["db"]->query("SELECT last_card FROM player WHERE id=?", $_SESSION["game"]["player".($i + 1)])[0]["last_card"];
								$GLOBALS["db"]->query("INSERT INTO rel_stock (player_id, card_num) VALUES (?, ?)", $_SESSION["player"]["id"], $last_card);
								$GLOBALS["db"]->query("UPDATE player SET last_card=null WHERE id=?", $_SESSION["game"]["player".($i + 1)]);
							}
							// Update turn
							$player_position = $GLOBALS["db"]->query("SELECT position FROM player WHERE id=?", $_SESSION["player"]["id"])[0]["position"];
							$GLOBALS["db"]->query("UPDATE game SET turn = ? WHERE id=?", $player_position, $_SESSION["game"]["id"]);

							$cards = $GLOBALS["db"]->query("SELECT * FROM rel_inhand WHERE player_id=?", $_SESSION["player"]["id"]);
							if(sizeof($cards)==0){
								$GLOBALS["db"]->query("UPDATE game SET finished=1 WHERE id=?", $_SESSION["game"]["id"]);

								for($i = 0; $i < 4; $i ++) {
									$GLOBALS["db"]->query("UPDATE player SET ready=0 WHERE id=?", $_SESSION["game"]["player".($i + 1)]);
								}
							}
						}

					}
					break;
				case 'play_card':
					if(!isset($_SESSION["player"])) {
						$res["error"] = "325";
						$res["errorstr"] = "First create a player before playing a card";
					}
					else if(!isset($_SESSION["game"])) {
						$res["error"] = "623";
						$res["errorstr"] = "First join a game before playing a card";
					}
					else{
						$this->refreshGame();

						$all_played=TRUE;
						$res["lastcards"]=[0,0,0,0];
						for($i = 0; $i < 4; $i ++) {
							$last_card = $GLOBALS["db"]->query("SELECT last_card FROM player WHERE id=?", $_SESSION["game"]["player".($i + 1)])[0]["last_card"];
							$res["lastcards"][i]=$last_card;
							if($last_card == null){
								$all_played=FALSE;
							}
						}

						$player_position = $GLOBALS["db"]->query("SELECT position FROM player WHERE id=?", $_SESSION["player"]["id"])[0]["position"];
						$turn = $GLOBALS["db"]->query("SELECT turn FROM game WHERE id=?", $_SESSION["game"]["id"])[0]["turn"];

						if($player_position!=$turn){
							$res["error"] = "624";
							$res["errorstr"] = "It's not you'r turn!";
						}
						else if($all_played){
							$res["error"] = "625";
							$res["errorstr"] = "Someone has to claim the cards first";
						}
						else{

							$GLOBALS["db"]->query("DELETE FROM rel_inhand WHERE player_id=? AND card_num=?", $_SESSION["player"]["id"], $_GET["card_num"]);

							$GLOBALS["db"]->query("UPDATE player SET last_card=? WHERE id=?", $_GET["card_num"], $_SESSION["player"]["id"]);
							$GLOBALS["db"]->query("UPDATE game SET turn = (turn + 1) % 4 WHERE id=?", $_SESSION["game"]["id"]);
						}
					}
					break;

		    	case 'sit':
							if(!isset($_SESSION["player"])) {
								$res["error"] = "74";
								$res["errorstr"] = "First create a player before getting state of game";
							}
							else if(!isset($_SESSION["game"])) {
								$res["error"] = "17";
								$res["errorstr"] = "First join a game before getting state of game";
							}
							else {
								$this->refreshGame();
								$is_free=TRUE;
								for($i = 0; $i < 4; $i ++) {
									$ready = $GLOBALS["db"]->query("SELECT ready FROM player WHERE id=?", $_SESSION["game"]["player".($i + 1)])[0]["ready"];
									if($ready){
										$position = $GLOBALS["db"]->query("SELECT position FROM player WHERE id=?", $_SESSION["game"]["player".($i + 1)])[0]["position"];
										if($position==$_GET["position"]){
											$res["occupied"]=$i;
											$is_free=FALSE;
										}
									}
								}
								if($is_free){
									$GLOBALS["db"]->query("UPDATE player SET position=? WHERE id=?", $_GET["position"], $_SESSION["player"]["id"]);
									$GLOBALS["db"]->query("UPDATE player SET ready=? WHERE id=?", 1, $_SESSION["player"]["id"]);
								}

								$all_ready=TRUE;
								for($i = 0; $i < 4; $i ++) {
									$ready = $GLOBALS["db"]->query("SELECT ready FROM player WHERE id=?", $_SESSION["game"]["player".($i + 1)])[0]["ready"];
									if(!$ready){
										$all_ready=FALSE;
									}
								}
								if($all_ready){
									$this->reShuffleCards();
									$GLOBALS["db"]->query("UPDATE game SET finished=0 WHERE id=?", $_SESSION["game"]["id"]);
									$GLOBALS["db"]->query("UPDATE game SET turn=0 WHERE id=?", $_SESSION["game"]["id"]);
								}
							}
				break;

				case 'set_turn':
					if(!isset($_SESSION["player"])) {
						$res["error"] = "663";
						$res["errorstr"] = "First create a player before set turn of game";
					}
					else if(!isset($_SESSION["game"])) {
						$res["error"] = "532";
						$res["errorstr"] = "First join a game before set turn of game";
					}

					$this->refreshGame();

					$GLOBALS["db"]->query("UPDATE game SET turn = ? WHERE id=?", $_GET["turn"], $_SESSION["game"]["id"]);
					break;

				case 'delete':
					$this->refreshGame();
					$GLOBALS["db"]->query("DELETE FROM game WHERE create_date < (NOW() - INTERVAL 4 HOUR)");
					$GLOBALS["db"]->query("DELETE FROM player WHERE create_date < (NOW() - INTERVAL 4 HOUR)");
					break;

				default:
					$res["error"] = "8568";
					$res["errorstr"] = "Keine Action spezifiziert";
					break;
			}

			echo json_encode($res);
		}

		function reShuffleCards(){
			$this->refreshGame();
			$global_cards = [];
			for($i = 0; $i < 4; $i ++) {
				$player_cards = [];
				while(sizeof($player_cards) != 9) {
					$randCard = rand(1, 36);

					if(!in_array($randCard, $global_cards)) {
						array_push($global_cards, $randCard);
						array_push($player_cards, $randCard);
					}
				}

				$GLOBALS["db"]->query("DELETE FROM rel_inhand WHERE player_id=?", $_SESSION["game"]["player".($i + 1)]);
				$GLOBALS["db"]->query("DELETE FROM rel_stock WHERE player_id=?", $_SESSION["game"]["player".($i + 1)]);

				for($q = 0; $q < sizeof($player_cards); $q ++) {
					$GLOBALS["db"]->query("INSERT INTO rel_inhand (player_id, card_num) VALUES (?, ?)", $_SESSION["game"]["player".($i + 1)], $player_cards[$q]);
				}
			}
			$this->refreshGame();
		}

		function makePlayer() {
			$GLOBALS["db"]->query("INSERT INTO player (name) VALUES (?)", $_GET["p_name"]);
			$_SESSION["player"] = [];
			$_SESSION["player"]["name"] = $_GET["p_name"];
			$_SESSION["player"]["id"] = (int)$GLOBALS["db"]->lastIns();
		}
		function getGame() {
			$_SESSION["game"] = [];

			$res = $GLOBALS["db"]->query("SELECT * FROM game WHERE room_name=?", $_GET["room_name"]);
			if(sizeof($res) == 1) {
				$_SESSION["game"] = $res[0];
			}
			else {
				$this->createGame();
				$this->getGame();
			}
		}
		function createGame() {
			$GLOBALS["db"]->query("INSERT INTO game (room_name, turn) VALUES (?, -1)", $_GET["room_name"]);
		}
		function refreshGame() {
			$_SESSION["game"] = $GLOBALS["db"]->query("SELECT * FROM game WHERE id=?", $_SESSION["game"]["id"])[0];
		}
	}
?>
