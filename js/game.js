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
		var duration = 200;
		var curCandy = null;
		var candyPosition = CandyCrush.ui.getCandyPosition(e, board);
		
		if (!selectedCandy){
			selectedCandy = candyPosition;
			CandyCrush.ui.setHighlightToCandy(selectedCandy);
		} else if (selectedCandy) {
			curCandy = candyPosition;
			
			if( !(selectedCandy.row == curCandy.row && selectedCandy.col == curCandy.col) ){
				let	isAround = CandyCrush.ui.checkIfSecondCandyIsAround(selectedCandy, curCandy, board);

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
		}
	}
	return Game;
})(jQuery);
