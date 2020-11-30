var CandyCrush = window.CandyCrush || {};

CandyCrush.Board = (function ($) {
	const NUM_ROWS = 8;
	const NUM_COLS = 8;

	var Board = function () {
		var that = this;
		var rows = createLayout();
		this.getRows = function () {return rows;};
		this.getCandyAt = function (rowNum, colNum){
			if(!this.getRows()[rowNum]) return null;
			return this.getRows()[rowNum][colNum];
		}
		this.getCandiesAround = function(curRow, curCol){
			var candies = [];
			
			if(curRow - 1 >= 0){
				var candyAt = that.getCandyAt(curRow - 1, curCol);
				candies.push(candyAt)
			} 
			if(curRow + 1 < that.getRows().length){
				var candyAt = that.getCandyAt(curRow + 1, curCol);
				candies.push(candyAt)
			}
			if(curCol - 1 >= 0){
				var candyAt = that.getCandyAt(curRow, curCol - 1);
				candies.push(candyAt)
			} 
			if(curCol + 1 < that.getRows()[curRow].length){
				var candyAt = that.getCandyAt(curRow, curCol + 1);
				candies.push(candyAt)
			} 
			return candies;
		},
		this.getGroup = function(candy, found){
			var curRow = candy.getRow();

			if(!found[curRow]){
				found[curRow] = {};
			}
			if(!found.list){				
				found.list = [];	
			}
			if(found[curRow][candy.getCol()]){
				return found;
			}

			found[curRow][candy.getCol()] = candy;
			found.list.push(candy);

			var curCol = candy.getCol();
			var surrounding = that.getCandiesAround(curRow, curCol);

			for(var i = 0; i<surrounding.lenght; i++){
				var candyAt = surrounding[i];
				if(candyAt.getType() == candy.getType()){
					found = that.getGroup(candyAt, found);
				};
			};	
			return found;
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
