var CandyCrush = window.CandyCrush || {};

CandyCrush.Game = (function ($) {
	"use strict";
	
	var Game = function () {
		var board;
		var firstCandy;

		this.init = function () {
			$("#start-game").on("click", startGame);
		};

		var startGame = function () {
			$("#start-game").off("click");
			CandyCrush.ui.hideDialog();
			CandyCrush.ui.showBoard();

			board = new CandyCrush.Board();
			CandyCrush.ui.drawBoard(board);
			
			var delay = 1000;
			var groups = board.getGroups();
			synchCrushDropRepeat(groups, delay);

			firstCandy = null;
			$(".candy").on("click", clickCandy);
		};

		var clickCandy = function (e) {
			console.log("clicked");
			var duration = 250;
			var secondCandy = null;

			var candy = CandyCrush.ui.getCandyClicked(e, board);

			if (!firstCandy){
				firstCandy = candy;
				CandyCrush.ui.setHighlightToCandy(firstCandy);
			} else if (firstCandy) {
				secondCandy = candy;

				if( !(firstCandy.getRow() == secondCandy.getRow() && firstCandy.getCol() == secondCandy.getCol()) ){
					var	isAround = CandyCrush.ui.checkIfCandyIsAround(firstCandy, secondCandy, board);

					if (isAround){
						var firstCandyLeft = firstCandy.getCoords().left;
						var firstCandyTop = firstCandy.getCoords().top;
						var secondCandyLeft = secondCandy.getCoords().left;
						var secondCandyTop = secondCandy.getCoords().top;
						
						CandyCrush.ui.swapCandies(firstCandy, secondCandy, firstCandyLeft, firstCandyTop, secondCandyLeft, secondCandyTop, duration);
						board.swapCandies(firstCandy, secondCandy);	
						var groups = board.getGroups();
						if(groups.length > 0){
							var delay = 1000;
							synchCrushDropRepeat(groups, delay);
						} else {
							CandyCrush.ui.swapCandies(firstCandy, secondCandy, secondCandyLeft, secondCandyTop, firstCandyLeft, firstCandyTop, duration);
							board.swapCandies(firstCandy, secondCandy);
						}
						
						CandyCrush.ui.deleteHighlightFromCandy(firstCandy);
						firstCandy = null;
					} else {
						CandyCrush.ui.deleteHighlightFromCandy(firstCandy);
						firstCandy = secondCandy;
						CandyCrush.ui.setHighlightToCandy(firstCandy);
					}
				} else {
					CandyCrush.ui.deleteHighlightFromCandy(firstCandy);
					firstCandy = null;	
				};
			};
		};
		
		var crushCandies = function(groups){
			$.each(groups, function(){
				var candies = this;
				$.each(candies, function(){
					var candy = this;
					board.deleteCandyAt(candy.getRow(), candy.getCol());
					candy.getSprite().remove();
				});
			});
		};
		var dropCandies = function(){
				var duration = 200;

				board.dropCandies();
	
				var emptyPlaces = board.getEmptyPlaces();

				$.each(emptyPlaces, function(){
					var emptyInRow = this;
					$.each(emptyInRow, function(){
						var position = this;
						var candy = CandyCrush.Candy.create();
						board.addCandy(candy, position.row, position.col);
						CandyCrush.ui.addCandy(candy, position.row, position.col, emptyInRow.length);
					})
				});
				CandyCrush.ui.dropCandies(duration, board);
		};
		var synchCrushDropRepeat = function(groups, delay){
				$(".candy").off("click");
				setTimeout(function(){
					crushCandies(groups);
					dropCandies(board);
					groups = board.getGroups();
					
					if(groups.length > 0){
						synchCrushDropRepeat(groups, delay);
					} else {
						$(".candy").on("click", clickCandy);
					}
					
				}, delay);
			}
	};
	return Game;
})(jQuery);
