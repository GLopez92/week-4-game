$(document).ready(function() {

	var characterPicked = false;
	var defenderPicked = false;
	var character = {};
	var defender = {};
	var enemiesDefeated = 0;
	var endGame = false;

	var characters = {
		obi: {
			name: "Obi-Wan Kenobi",
			health: 150,
			startingHealth: 150,
			attack: 8,
			counterAttack: 8,
		},

		luke: {
			name: "Luke Skywalker",
			health: 200,
			startingHealth: 200,
			attack: 10,
			counterAttack: 8,
		},

		maul: {
			name: "Darth Maul",
			health: 250,
			startingHealth: 250,
			attack: 8,
			counterAttack: 15,
		},

		vader: {
			name: "Darth Vader",
			health: 300,
			startingHealth: 300,
			attack: 15,
			counterAttack: 50,
		}
	};

	function initPick(chosenCharacter){
		character = chosenCharacter;
	};

	function initDefender(chosenDefender){
		defender = chosenDefender;
	};

	function moveToEnemies() {
		$(".characters").removeClass("available-character").addClass("enemy-character");
		$('#users-enemies').append($(".enemy-character"));
	};

	function resetGame() {
		characters.obi.health = characters.obi.startingHealth;
		characters.luke.health = characters.luke.startingHealth;
		characters.maul.health = characters.maul.startingHealth;
		characters.vader.health = characters.vader.startingHealth;

		$('#obi').children(".health").html(characters.obi.health);
		$('#luke').children(".health").html(characters.luke.health);
		$('#maul').children(".health").html(characters.maul.health);
		$('#vader').children(".health").html(characters.vader.health);

		$('.character-image').removeClass("chosen-character enemy-character defender-character").addClass("available-character");
		var image = $(".characters").show();
		$("#users-pick").html(image);

		$("#game-message").empty();
		$("#restart").hide();

		characterPicked = false;
		defenderPicked = false;
		enemiesDefeated = 0;
		endGame = false;

		character = {};
		defender = {};

	}

	$('.characters').on('click', function() {

		var name = $(this).attr('id');
		var characterInfo = characters[name];

		console.log('You picked: ', name);

		if ( !characterPicked ) {

			moveToEnemies();

			$("#game-message").empty();

			initPick(characterInfo);
			characterPicked = true;

			$(this).removeClass("enemy-character").addClass("chosen-character");
			$("#users-choice").append(this);

		} else if ( characterPicked && !defenderPicked ) {

				$("#game-message").empty();

				initDefender(characterInfo);
				defenderPicked = true;

				$(this).removeClass("enemy-character").addClass("defender-character");
				$("#defender").append(this);
		}

	});


	$("#attack").on("click", function(){

		console.log("Attack Button Pushed")

		if(characterPicked && defenderPicked && !endGame){

			defender.health -= character.counterAttack;

			$(".defender-character").children(".health").html(defender.health);

			$("#game-message").html("<p> You attacked " + defender.name + " for " + character.counterAttack + " damage.</p>");

			character.counterAttack += character.attack;

			if(defender.health > 0){

				character.health -= defender.attack;
				$('.chosen-character').children(".health").html(character.health);

				if(character.health > 0 ) {
					$("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.counterAttack + " damage.</p>");

				} else {
					endGame = true;
					$("#game-message").html("<p>You were defeated</p><p>Play again?</p>");
					$("#restart").show();
				}

			} else {

				enemiesDefeated++;
				defenderPicked = false;

				$("#game-message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
				$(".defender-character").hide();

				if (enemiesDefeated === 3) {
					endGame = true;
					$("#game-message").html("<p>You have won the game!!!</p><p>Play again?</p>");
					$("#restart").show();
				}

			}

		} else if (!characterPicked && !endGame) {

				$("#game-message").html("<p>You must first select your game character.</p>");

		} else if (!defenderPicked && !endGame) {

			$("#game-message").html("<p>You must choose an enemy to fight.</p>");

		}

	});

	$("#restart").hide();

	$("#restart").on("click", function() {
		console.log("Restart selected");
		resetGame();
	});

});

