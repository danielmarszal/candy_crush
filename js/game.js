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
			var groups = board.getGroups();
			if(groups.length > 0){
				var delay = 750;
				crushCandies(groups, delay);
				dropCandies(board);
			}

			selectedCandy = null;
			$(".candy").on("click", clickCandy);
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
		var dropCandies = function(board){
			var duration = 300;
			board.dropCandies()
			CandyCrush.ui.dropCandies(duration, board);
		};
	};
	return Game;
})(jQuery);
