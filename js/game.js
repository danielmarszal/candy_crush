var CandyCrush = window.CandyCrush || {};

CandyCrush.Game = (function ($){
	var board;
	
	var Game = function(){
		this.init = function(){
			$("#start-game").on("click", startGame);
		};
	};
	
	var startGame = function(){
		$("#start-game").off("click");
		CandyCrush.ui.hideDialog();
		CandyCrush.ui.showBoard();
		
		board = new CandyCrush.Board();
		CandyCrush.ui.drawBoard(board);
	};
	
	return Game;
})(jQuery);
