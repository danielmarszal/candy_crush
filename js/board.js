var CandyCrush = window.CandyCrush || {};

CandyCrush.Board = (function ($) {
	const NUM_ROWS = 8;
	const NUM_COLS = 8;

	var Board = function () {
		var that = this;
		var rows = createLayout();
		this.getRows = function () {return rows;};
		this.getCandyAt = function (rowNum, colNum){
			return this.getRows()[rowNum][colNum];
		}
		this.getCandiesAround = function(curRow, curCol){
			var candies = [];
			
			if(curRow - 1 >= 0){
				var CandyAt = that.getCandyAt(curRow - 1, curCol);
				candies.push(CandyAt)
			} 
			if(curCol - 1 >= 0){
				var CandyAt = that.getCandyAt(curRow, curCol - 1);
				candies.push(CandyAt)
			} 
			if(curCol + 1 <= 7){
				var CandyAt = that.getCandyAt(curRow, curCol + 1);
				candies.push(CandyAt)
			} 
			if(curRow + 1 <= 7){
				var CandyAt = that.getCandyAt(curRow + 1, curCol);
				candies.push(CandyAt)
			}
			return candies;
		};
		return this;
	}
	
	var createLayout = function(){
		var rows = [];
		
		for(var i = 0; i < NUM_ROWS; i++){
			row = [];
			for(var j = 0; j < NUM_COLS; j++){
				var candy = CandyCrush.Candy.create(i, j);
				row[j] = candy;
			};
			rows.push(row);
		};
		return rows;
	};
	return Board;
})(jQuery);
