var CandyCrush = window.CandyCrush || {};

CandyCrush.Game = (function ($){
	var Game = function(){
		this.init = function(){
			$("#start-game").on("click", startGame);
		};
	};
	
	var startGame = function(){
		$("#start-game").off("click");
		CandyCrush.ui.hideDialog();
	};
	
	return Game;
})(jQuery);
