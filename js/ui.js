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
		setHighlightToCandy: function (candyPosition){
			var candy = board.getCandyAt(candyPosition.row, candyPosition.col);
			var sprite = candy.getSprite();
			
			sprite.css("background-color", "rgba(255,255,255,.4)");
		},
		deleteHighlightFromCandy: function (candy){
			var candy = board.getCandyAt(selectedCandyPosition.row, selectedCandyPosition.col);
			var sprite = candy.getSprite();
			
			sprite.css("background-color", "rgba(255,255,255,0");
		},
		checkIfCandyIsAround: function(selectedCandyPosition, secondCandyPosition, board){
			var isAround = false;
			
			var candies = board.getCandiesAround(selectedCandyPosition.row, selectedCandyPosition.col);
			
			for(i = 0; i < candies.length; i++){
				if(candies[i].getRow() == secondCandyPosition.row && candies[i].getCol() == secondCandyPosition.col){
					isAround = true;
				}
			}
			return isAround;
		},
		swapCandies: function(selectedCandyPosition, secondCandyPosition, board, duration){
			var selectedCandyPosition = board.getCandyAt(selectedCandyPosition.row, selectedCandyPosition.col);
			var selectedCandyPositionLeft = selectedCandyPosition.getCoords().left; 
			var selectedCandyPositionTop = selectedCandyPosition.getCoords().top;	
			
			var secondCandyPosition = board.getCandyAt(secondCandyPosition.row, secondCandyPosition.col);
			var secondCandyPositionLeft = secondCandyPosition.getCoords().left;
			var secondCandyPositionTop = secondCandyPosition.getCoords().top;
			
			
			selectedCandyPosition.getSprite().animate({
				left: secondCandyPositionLeft,
				top: secondCandyPositionTop
			},
			{
				duration: duration,
				easing: "linear"
			});
			
			secondCandyPosition.getSprite().animate({
				left: selectedCandyPositionLeft,
				top: selectedCandyPositionTop
			},
			{
				duration: duration,
				easing: "linear"
			});
			
			setTimeout(function(){
				selectedCandyPosition.getSprite().animate({
					left: selectedCandyPositionLeft,
					top: selectedCandyPositionTop
				},
				{
					duration: duration,
					easing: "linear"
				});

				secondCandyPosition.getSprite().animate({
					left: secondCandyPositionLeft,
					top: secondCandyPositionTop
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
