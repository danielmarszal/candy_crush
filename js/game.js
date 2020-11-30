var CandyCrush = window.CandyCrush || {};

CandyCrush.Game = (function ($) {
	var Game = function () {
		var board;
		var selectedCandy;

		this.init = function () {
			$("#start-game").on("click", startGame);
		};
	};

	var startGame = function () {
		$("#start-game").off("click");
		CandyCrush.ui.hideDialog();
		CandyCrush.ui.showBoard();

		board = new CandyCrush.Board();
		CandyCrush.ui.drawBoard(board);

		selectedCandy = null;
		$(".candy").on("click", clickCandy);
	};

	var clickCandy = function (e) {
		var duration = 250;
		var curCandy = null;
		
		var candy = CandyCrush.ui.getCandyClicked(e, board);
		
		if (!selectedCandy){
			selectedCandy = candy;
			CandyCrush.ui.setHighlightToCandy(selectedCandy);
		} else if (selectedCandy) {
			curCandy = candy;
			
			if( !(selectedCandy.getRow() == curCandy.getRow() && selectedCandy.getCol() == curCandy.getCol()) ){
				let	isAround = CandyCrush.ui.checkIfCandyIsAround(selectedCandy, curCandy, board);

				if (isAround){
					var group = board.getGroup(selectedCandy, {});
					console.log(group);
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
		}
	}
	return Game;
})(jQuery);
