var CandyCrush = window.CandyCrush || {};

CandyCrush.Game = (function ($){
	var Game = function(){
		this.init = function(){
			$("#game-start").on("click", startGame);
		}
	};
	var startGame = function(){};
	return Game;
}(jQuery);
