var characterPicked = false;
var defenderPicked = false;
var character = {};
var defender = {};
var enemiesDefeated = 0;
endGame = false;

var obiWanKenobi = {
	name: "Obi-Wan Kenobi",
	health: 150,
	attack: 8,
	counterAttack: 8,
};

var lukeSkywalker = {
	name: "Luke Skywalker",
	health: 200,
	attack: 10,
	counterAttack: 8,
};

var darthMaul = {
	name: "Darth Maul",
	health: 250,
	attack: 8,
	counterAttack: 10,
};

var darthVader = {
	name: "Darth Vader",
	health: 300,
	attack: 15,
	counterAttack: 4,
};

function initPick(chosenCharacter){
	character.name = chosenCharacter.name;
	character.health = chosenCharacter.health;
	character.attack = chosenCharacter.attack;
	character.counterAttack = chosenCharacter.counterAttack;
};

function initDenfender(chosenDefender){
	defender.name = chosenDefender.name;
	defender.health = chosenDefender.health;
	defender.attack = chosenDefender.attack;
	defender.counterAttack = chosenDefender.counterAttack;
};

// function moveYourCharacter(){
// 	$(".characters").removeClass("available-character").addClass("chosen-character");
// 	$('#users-choice').append($(".chosen-character"));
// }

function moveToEnemies() {
	$(".characters").removeClass("available-character").addClass("enemy-character");
	$('#users-enemies').append($(".enemy-character"));
};

// function moveToDefender(){
// 	$(".characters").removeClass("available-character").addClass("defender-character");
// 	$('#denfender').append($(".defender-character"));
// }

function resetGame(){
	$('#obi').childern(".health").html(obiWanKenobi.health);
	$('#luke').childern(".health").html(lukeSkywalker.health);
	$('#maul').childern(".health").html(darthMaul.health);
	$('#vader').childern(".health").html(darthVader.health);

	$('.character-image').removeClass("chosen-character enemy-character defender-character").addClass("available-character");
	var image = $(".characters").show();
	$("#users-pick").html(image);

	$("#game-message").empty();
	$("#restart").hide();

	characterPicked = false;
	defenderPicked = false;
	characters = {};
	defender = {};
	enemiesDefeated = 0;
	endGame = false;

	character = {};
	defender = {};

}

$(document).ready(function() {

	$("#restart").hide();

	$("#obi").on("click", function(){
		console.log("You picked Obi-Wan-Kenobi")

		if(characterPicked == false){
		
			$("#game-message").empty();

			initPick(obiWanKenobi);
			characterPicked = true;


			$("#obi").removeClass("available-character").addClass("chosen-character");
			$("#users-choice").append(this);
			// moveYourCharacter();
			// moveToEnemies();
			
		} else if((characterPicked == true) & (defenderPicked == false)){

			if($("#obi").hasClass("enemy-character")){
				$("#game-message").empty();

				initDenfender(obiWanKenobi);
				defenderPicked = true;

				$("#obi").removeClass("enemy-character").addClass("defender-character");
				$("#defender").append(this);
				// moveToDefender();
			}
		}
	})


	$("#luke").on("click", function(){
		console.log("You picked Luke Skywalker")

		if(characterPicked == false){
			 // moveYourCharacter();
			$("#game-message").empty();

			initPick(lukeSkywalker);
			characterPicked = true;
			moveYourCharacter();
			$("#luke").removeClass("available-character").addClass("chosen-character");
			$("#users-choice").append(this);
			// moveToEnemies();
			
		} else if((characterPicked == true) & (defenderPicked == false)){

			if($("#luke").hasClass("enemy-character")){
				$("#game-message").empty();

				initDenfender(lukeSkywalker);
				defenderPicked = true;

				$("#luke").removeClass("enemy-character").addClass("defender-character");
				$("#defender").append(this);
				// moveToDefender();
			}
		}
	});

	$("#maul").on("click", function(){
		console.log("You picked Darth Maul")

		if(characterPicked == false){
			// moveToEnemies();
			$("#game-message").empty();

			initPick(darthMaul);
			characterPicked = true;

			$("#maul").removeClass("available-character").addClass("chosen-character");
			$("#users-choice").append(this);

			// moveToEnemies();

		} else if((characterPicked == true) & (defenderPicked == false)){

			if($("#maul").hasClass("enemy-character")){
				$("#game-message").empty();

				initDenfender(darthMaul);
				defenderPicked = true;

				$("#maul").removeClass("enemy-character").addClass("defender-character");
				$("#defender").append(this);
			}
		}
	});


	$("#vader").on("click", function(){
		console.log("You picked Darth Vader")

		if(characterPicked == false){
			// moveToEnemies();
			$("#game-message").empty();

			initPick(darthVader);
			characterPicked = true;

			$("#vader").removeClass("available-character").addClass("chosen-character");
			$("#users-choice").append(this);

			// moveToEnemies();
		} else if((characterPicked == true) & (defenderPicked == false)){

			if($("#vader").hasClass("enemy-character")){
				$("#game-message").empty();

				initDenfender(darthVader);
				defenderPicked = true;

				$("#vader").removeClass("enemy-character").addClass("defender-character");
				$("#defender").append(this);
			}
		}
	});

	$("#attack").on("click", function(){
		console.log("Attack Button Pushed")

		if(characterPicked && defenderPicked && !endGame){

			defender.health = defender.health - character.counterAttack;
			$(".defender-character").children(".health").html(denfender.health);
			$("#game-message").html("<p> You attacked" + defender.name + "for" + character.counterAttack + "damage.</p>");
			character.counterAttack = character.counterAttack + character.attack;

			if(defender.health > 0){
				character.health = character.health - defender.attack;
				$('.user-pick').children(".health").html(character.health);

				if(character.health > 0 ) {
					$("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.counterAttack + " damage.</p>");
				}else {
		          endGame = true;
		          $("#game-message").html("<p>You were defeated</p><p>Play again?</p>");
		          $("#restart").show();
		        }
			} else {
	        
		        enemiesDefeated++;
		        defenderSelected = false;
		        $("#game-message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
		        $(".defender-character").hide();

		        if (enemiesDefeated === 3) {
		          endGame = true;
		          $("#game-message").html("<p>You have won the game!!!</p><p>Play again?</p>");
		          $("#restart").show();
		        }
		    }
		}else if (!characterPicked && !endGame) {
	      $("#game-message").html("<p>You must first select your game character.</p>");
	    } else if (!defenderPicked && !endGame) {
	      $("#game-message").html("<p>You must choose an enemy to fight.</p>");
	    }

	});

	 $("#restart").on("click", function() {
	    console.log("Restart selected");

	    resetGame();
	  });








});


