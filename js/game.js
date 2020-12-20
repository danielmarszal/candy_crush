var CandyCrush = window.CandyCrush || {};
//game controller
CandyCrush.Game = (function ($) {
	"use strict";
	
	var Game = function () {
		var board;
		var firstCandy;

		//inits game
		this.init = function () {
			$("#start-game").on("click", startGame);
		};

		//starts game's logic
		var startGame = function () {
			$("#start-game").off("click");
			CandyCrush.ui.hideDialog();
			CandyCrush.ui.showBoard();

			board = new CandyCrush.Board();
			CandyCrush.ui.drawBoard(board);
			
				//get groups of candies bigger than 2
				var groups = board.getGroups();
				firstCandy = null;
				if(groups.length > 0){
					var delay = 200;
					var dropDuration = 175;
					//crush then drop candies repetitively when groups bigger than 3 exists, cuts off (.candy).onclick while working then adds it at the end
					synchCrushDropRepeat(groups, dropDuration, delay);
				} else {
					$(".candy").on("click", swapCandies);
				}
		};

		//swaps candies every second click
		var swapCandies = function (e) {
			console.log("clicked");
			var swapDuration = 250;
			var secondCandy = null;

			var candy = CandyCrush.ui.getCandyClicked(e, board);

			
			if (!firstCandy){ //if first candy doesn't exist set it
				firstCandy = candy;
				CandyCrush.ui.setHighlightToCandy(firstCandy);
			} else if (firstCandy) { //if first candy exists set second candy
				secondCandy = candy;

				//if first candy is not second candy 
				if( !(firstCandy.getRow() == secondCandy.getRow() && firstCandy.getCol() == secondCandy.getCol()) ){
					var	isAround = CandyCrush.ui.checkIfCandyIsAround(firstCandy, secondCandy, board);
					
					if (isAround){ //if second candy is around get their coords and swap
						var firstCandyLeft = firstCandy.getCoords().left;
						var firstCandyTop = firstCandy.getCoords().top;
						var secondCandyLeft = secondCandy.getCoords().left;
						var secondCandyTop = secondCandy.getCoords().top;
						
						CandyCrush.ui.swapCandies(firstCandy, secondCandy, firstCandyLeft, firstCandyTop, secondCandyLeft, secondCandyTop, swapDuration);
						board.swapCandies(firstCandy, secondCandy);	
						
						//get groups of candies bigger than 2
						var groups = board.getGroups(); 
						if(groups.length > 0){ //if there is atleast 1 group
							var delay = 200;
							var dropDuration = 175;
							//crush then drop candies repetitively when groups bigger than 3 exists, cuts off (.candy).onclick while working
							synchCrushDropRepeat(groups, dropDuration, delay);
						} else {
							//swap candies back
							CandyCrush.ui.swapCandies(firstCandy, secondCandy, secondCandyLeft, secondCandyTop, firstCandyLeft, firstCandyTop, swapDuration);
							board.swapCandies(firstCandy, secondCandy);
						}
						
						CandyCrush.ui.deleteHighlightFromCandy(firstCandy);
						firstCandy = null;
					} else { //if second candy is not around set firstCandy to secondCandy
						CandyCrush.ui.deleteHighlightFromCandy(firstCandy);
						firstCandy = secondCandy;
						CandyCrush.ui.setHighlightToCandy(firstCandy);
					}
				} else { //if firstCandy is secondCandy set it to null
					CandyCrush.ui.deleteHighlightFromCandy(firstCandy);
					firstCandy = null;	
				};
			};
		};
		
		var crushCandies = function(groups){
			//delete every candy of groups bigger than 2
			$.each(groups, function(){
				var candies = this;
				$.each(candies, function(){
					var candy = this;
					board.deleteCandyAt(candy.getRow(), candy.getCol());
					candy.getSprite().remove();
				});
			});
		};
		var dropCandies = function(dropDuration){

				console.log(dropDuration);
				//drop candies in game logic
				board.dropCandies();
	
				//gets places where there is no candies
				var emptyPlaces = board.getEmptyPlaces();

				var maxEmptyInRow = 0;
				//adds candy to each place with no candy
				$.each(emptyPlaces, function(){
					var emptyInRow = this;
					if(emptyInRow.length > maxEmptyInRow){
						maxEmptyInRow = emptyInRow.length;
					}
					$.each(emptyInRow, function(){
						var position = this;
						var candy = CandyCrush.Candy.create();
						board.addCandy(candy, position.row, position.col);
						CandyCrush.ui.addCandy(candy, position.row, position.col, emptyInRow.length);
					})
				});
						//console.log(dropDuration);
				CandyCrush.ui.dropCandies(dropDuration, board);
				return maxEmptyInRow;
		};
		var synchCrushDropRepeat = function(groups, dropDuration, delay){
			//var maxEmptyVertical;
				//recursionaly crush then dropping candies till there is no groups of candies bigger than 3
				$(".candy").off("click");
				setTimeout(function(){
					crushCandies(groups);
					var maxEmptyVertical = dropCandies(dropDuration);
					groups = board.getGroups();
					
					if(groups.length > 0){
						//calculate dropping animation time
						delay = dropDuration * maxEmptyVertical;
						synchCrushDropRepeat(groups, dropDuration, delay);
					} else {
						$(".candy").on("click", swapCandies);
					}
					
				}, delay);
			}
	};
	return Game;
})(jQuery);
