var CandyCrush = window.CandyCrush || {};

CandyCrush.ui = (function($){
	var ui = {
		CANDY_SIZE: 60,
		MARGIN_BETWEEN_CANDIES: 15,
		init: function(){
			
		},
		hideDialog: function(){
			$(".dialog").fadeToggle(300);
		},
		showBoard: function(){
			$("#board").fadeIn(300);
		},
		drawBoard: function(board){
			var rows = board.getRows();
			var gameArea = $("#board");
			
			for(var i = 0; i < rows.length; i++){
				var row = rows[i];
				for(var j = 0; j < row.length; j++){
					var candy = row[j];
					var sprite = candy.getSprite();
					gameArea.append(sprite);
					
					var left = j * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + 7.5;
					var top = i * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + 7.5;
					
					sprite.css({
						left: left,
						top: top
					});
				};
			};
		}
	}
	return ui;
})(jQuery);

