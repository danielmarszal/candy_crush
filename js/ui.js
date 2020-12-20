var CandyCrush = window.CandyCrush || {};

CandyCrush.ui = (function ($) {
	"use strict";
	
	var ui = {
		CANDY_SIZE: 60,
		MARGIN_BETWEEN_CANDIES: 15,
		init: function () {

		},
		hideDialog: function () {
			$(".dialog").fadeToggle(300);
		},
		showBoard: function () {
			$("#board").fadeIn(300);
		},
		drawBoard: function (board) {
			var rows = board.getRows();
			var gameArea = $("#board");
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				for (var j = 0; j < row.length; j++) {
					var candy = row[j];
					if(candy !== undefined){
						var sprite = candy.getSprite();
						gameArea.append(sprite);

						var left = j * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + ui.MARGIN_BETWEEN_CANDIES / 2;
						var top = i * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + ui.MARGIN_BETWEEN_CANDIES / 2;

						sprite.css({
							left: left,
							top: top
						});
					}
				}
			}
		},
		getMouseCoords: function (e) {
			var coords = {
				x: e.pageX,
				y: e.pageY
			};
			return coords
		},
		getCandyCoords: function(candy){
			var candyCoords = candy.getOffset();
			return candyCoords;
		},
		getCandyClicked: function (e, board) {
			var rows = board.getRows();

			for (var i = 0; i < rows.length; i++) {
				for (var j = 0; j < rows.length; j++) {
					var candy = rows[i][j];
					if(candy !== undefined)	{
						var candyCoords = this.getCandyCoords(candy);
						
						if ( ( (ui.getMouseCoords(e).x >= candyCoords.left) && (ui.getMouseCoords(e).x <= candyCoords.left + ui.CANDY_SIZE) ) && ( (ui.getMouseCoords(e).y >= candyCoords.top) && (ui.getMouseCoords(e).y <= candyCoords.top + ui.CANDY_SIZE) ) ) {
							var candy = board.getCandyAt(i,j);
							return candy;
						}
					}
				}
			}
		},
		setHighlightToCandy: function (candy){
			var sprite = candy.getSprite();
			
			sprite.css("background-color", "rgba(255,255,255,.4)");
		},
		deleteHighlightFromCandy: function (candy){
			var sprite = candy.getSprite();
			
			sprite.css("background-color", "rgba(255,255,255,0");
		},
		checkIfCandyIsAround: function(selectedCandy, secondCandy, board){
			var isAround = false;
			
			var candies = board.getCandiesAround(selectedCandy.getRow(), selectedCandy.getCol());
			
			for(var i = 0; i < candies.length; i++){
				if(candies[i].getRow() == secondCandy.getRow() && candies[i].getCol() == secondCandy.getCol()){
					isAround = true;
				}
			}
			return isAround;
		},
		swapCandies: function(firstCandy, secondCandy, firstCandyLeft, firstCandyTop, secondCandyLeft, secondCandyTop, duration){
			firstCandy.getSprite().animate({
				left: secondCandyLeft,
				top: secondCandyTop
			},
			{
				duration: duration,
				easing: "linear",
			});
			secondCandy.getSprite().animate({
				left: firstCandyLeft,
				top: firstCandyTop
			},
			{
				duration: duration,
				easing: "linear"
			});
		},
		addCandy: function(candy, rowNum, colNum, countEmptyInRow){
			var left = colNum * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + ui.MARGIN_BETWEEN_CANDIES / 2;
			var top = - ((countEmptyInRow - rowNum) * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) - ui.MARGIN_BETWEEN_CANDIES / 2);
			
			var gameArea = $("#board");
			var sprite = candy.getSprite();
			gameArea.append(sprite);
			
			sprite.css({
				left: left,
				top: top
			});
		},
		dropCandies: function(duration, board){
			var rows = board.getRows();
			for (var i = 0; i < rows.length; i++) {
				for (var j = 0; j < rows[i].length; j++) {
					var candy = rows[i][j];
					if(candy !== undefined){
						var sprite = candy.getSprite();
						
						var left = j * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + ui.MARGIN_BETWEEN_CANDIES / 2;
						var top = i * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + ui.MARGIN_BETWEEN_CANDIES / 2;
						
						var rowsToDrop = Math.round((top - candy.getCoords().top) / (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES));
						if(rowsToDrop > 0){
							sprite.animate({
								left: left,
								top: top
							},
							{
								duration: duration * rowsToDrop,
								easing: "linear"
							});
						}
					}
				}
			}
		}
	}
	return ui;
})(jQuery);
