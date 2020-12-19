var CandyCrush = window.CandyCrush || {};

CandyCrush.Game = (function ($) {
	"use strict";
	
	var Game = function () {
		var board;
		var selectedCandy;

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
			//groups = board.getGroups();
			//delay = 3000;
			//crushCandies(groups, delay);
			//dropCandies(board, delay);
			//while(groups.length > 0) {
					//var delay = 2000;
					//groups = board.getGroups();
					//crushCandies(groups, delay);
					//dropCandies(board, delay);
			//} 

			selectedCandy = null;
			//$(".candy").on("click", clickCandy);
		};

		var clickCandy = function (e) {
			var duration = 250;
			var curCandy = null;

			var candy = CandyCrush.ui.getCandyClicked(e, board);

			/*if (!selectedCandy){
				selectedCandy = candy;
				CandyCrush.ui.setHighlightToCandy(selectedCandy);
			} else if (selectedCandy) {
				curCandy = candy;

				if( !(selectedCandy.getRow() == curCandy.getRow() && selectedCandy.getCol() == curCandy.getCol()) ){
					let	isAround = CandyCrush.ui.checkIfCandyIsAround(selectedCandy, curCandy, board);

					if (isAround){
						CandyCrush.ui.swapCandies(selectedCandy, curCandy, board, duration);	
						CandyCrush.ui.deleteHighlightFromCandy(selectedCandy);
						selectedCandy = null;
					} else {
						CandyCrush.ui.deleteHighlightFromCandy(selectedCandy);
						selectedCandy = curCandy;
						CandyCrush.ui.setHighlightToCandy(selectedCandy);
					}
				} else {
					CandyCrush.ui.deleteHighlightFromCandy(selectedCandy);
					selectedCandy = null;	
				};
			};*/
		};
		
		var crushCandies = function(groups, delay){
			$.each(groups, function(){
				var candies = this;
				$.each(candies, function(){
					var candy = this;
					board.deleteCandyAt(candy.getRow(), candy.getCol());
					candy.getSprite().remove();
				});
			});
		};
		var dropCandies = function(delay){
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
				setTimeout(function(){
					crushCandies(groups);
					dropCandies(board);
					groups = board.getGroups();
					
					if(groups.length > 0){
						synchCrushDropRepeat(groups, delay);
					}
					
				}, delay);
			}
	};
	return Game;
})(jQuery);
