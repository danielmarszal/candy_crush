var CandyCrush = window.CandyCrush || {};

CandyCrush.Game = (function ($) {
	var Game = function () {
		var board;
		var selectedCandyPosition;

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

		selectedCandyPosition = null;
		$(".candy").on("click", clickCandy);
	};

	var clickCandy = function (e) {
		var duration = 200;
		var curCandyPosition = null;
		var candyPosition = CandyCrush.ui.getCandyPosition(e, board);
		
		if (!selectedCandyPosition){
			selectedCandyPosition = candyPosition;
			CandyCrush.ui.setHighlightToCandy(selectedCandyPosition);
		} else if (selectedCandyPosition) {
			curCandyPosition = candyPosition;
			
			if( !(selectedCandyPosition.row == curCandyPosition.row && selectedCandyPosition.col == curCandyPosition.col) ){
				let	isAround = CandyCrush.ui.checkIfCandyIsAround(selectedCandyPosition, curCandyPosition, board);

				if (isAround){
					CandyCrush.ui.swapCandies(selectedCandyPosition, curCandyPosition, board, duration);	
					CandyCrush.ui.deleteHighlightFromCandy(selectedCandyPosition);
					selectedCandyPosition = null;
				} else {
					CandyCrush.ui.deleteHighlightFromCandy(selectedCandyPosition);
					selectedCandyPosition = curCandyPosition;
					CandyCrush.ui.setHighlightToCandy(selectedCandyPosition);
				}
			} else {
				CandyCrush.ui.deleteHighlightFromCandy(selectedCandyPosition);
				selectedCandyPosition = null;	
			};
		}
	}
	return Game;
})(jQuery);
