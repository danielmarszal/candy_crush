var CandyCrush = window.CandyCrush || {};

CandyCrush.ui = (function ($) {
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
					var sprite = candy.getSprite();
					gameArea.append(sprite);

					var left = j * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + ui.MARGIN_BETWEEN_CANDIES / 2;
					var top = i * (ui.CANDY_SIZE + ui.MARGIN_BETWEEN_CANDIES) + ui.MARGIN_BETWEEN_CANDIES / 2;

					sprite.css({
						left: left,
						top: top
					});
				};
			};
		},
		getMouseCoords: function (e) {
			var coords = {
				x: e.pageX,
				y: e.pageY
			};
			return coords
		},
		getCandiesCoords: function (board) {
			var rows = board.getRows();
			var candiesCoords = [];

			for (var i = 0; i < rows.length; i++) {
				candiesCoords[i] = []
				var row = rows[i];
				for (var j = 0; j < row.length; j++) {
					var candy = row[j];
					candiesCoords[i][j] = candy.getOffset();
				}
			}
			return candiesCoords;
		},
		getCandyPosition: function (e, board) {
			candiesCoords = ui.getCandiesCoords(board);

			var counter = 0;

			//get col and row of clicked candy
			for (var i = 0; i < candiesCoords.length; i++) {
				for (var j = 0; j < candiesCoords[i].length; j++) {
					if ((ui.getMouseCoords(e).x >= candiesCoords[i][j].left && ui.getMouseCoords(e).x <= candiesCoords[i][j].left + ui.CANDY_SIZE) && (ui.getMouseCoords(e).y >= candiesCoords[i][j].top && ui.getMouseCoords(e).y <= candiesCoords[i][j].top + ui.CANDY_SIZE)) {
						let candyPosition = {
							row: i,
							col: j,
						};
						return candyPosition;
					}
				}
			}
		},
		setHighlightToCandy: function (candy){
			var candy = board.getCandyAt(selectedCandy.row, selectedCandy.col);
			var sprite = candy.getSprite();
			
			sprite.css("background-color", "rgba(255,255,255,.4)");
		},
		deleteHighlightFromCandy: function (candy){
			var candy = board.getCandyAt(selectedCandy.row, selectedCandy.col);
			var sprite = candy.getSprite();
			
			sprite.css("background-color", "rgba(255,255,255,0");
		},
		checkIfSecondCandyIsAround: function(selectedCandy, secondCandy, board){
			var isAround = false;
			
			var candies = board.getCandiesAround(selectedCandy.row, selectedCandy.col);
			
			for(i = 0; i < candies.length; i++){
				if(candies[i].getRow() == secondCandy.row && candies[i].getCol() == secondCandy.col){
					isAround = true;
				}
			}
			return isAround;
		},
		swapCandies: function(selectedCandy, secondCandy, board, duration){
			var selectedCandy = board.getCandyAt(selectedCandy.row, selectedCandy.col);
			var selectedCandyLeft = selectedCandy.getCoords().left; 
			var selectedCandyTop = selectedCandy.getCoords().top;	
			
			var secondCandy = board.getCandyAt(secondCandy.row, secondCandy.col);
			var secondCandyLeft = secondCandy.getCoords().left;
			var secondCandyTop = secondCandy.getCoords().top;
			
			
			selectedCandy.getSprite().animate({
				left: secondCandyLeft,
				top: secondCandyTop
			},
			{
				duration: duration,
				easing: "linear"
			});
			
			secondCandy.getSprite().animate({
				left: selectedCandyLeft,
				top: selectedCandyTop
			},
			{
				duration: duration,
				easing: "linear"
			});
			
			setTimeout(function(){
				selectedCandy.getSprite().animate({
					left: selectedCandyLeft,
					top: selectedCandyTop
				},
				{
					duration: duration,
					easing: "linear"
				});

				secondCandy.getSprite().animate({
					left: secondCandyLeft,
					top: secondCandyTop
				},
				{
					duration: duration,
					easing: "linear"
				});
			}, 1000);
		}
	}
	return ui;
})(jQuery);
