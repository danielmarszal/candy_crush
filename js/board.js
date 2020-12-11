var CandyCrush = window.CandyCrush || {};

CandyCrush.Board = (function ($) {
	"use strict";
	
	const NUM_ROWS = 8;
	const NUM_COLS = 8;

	var Board = function () {
		
		var that = this;
		var rows = createLayout();
		this.getRows = function () {
			return rows;
		},
		this.getCandyAt = function (rowNum, colNum){
			return this.getRows()[rowNum][colNum];
		},
		this.deleteCandyAt = function (rowNum, colNum){
			var row = rows[rowNum];
			delete row[colNum];
		},
		this.getCandiesAround = function(curRow, curCol){
			var candies = [];
			
			if(curRow - 1 >= 0){
				var candyAt = that.getCandyAt(curRow - 1, curCol);
				candies.push(candyAt)
			} 
			if(curRow + 1 < rows.length){
				var candyAt = that.getCandyAt(curRow + 1, curCol);
				candies.push(candyAt)
			}
			if(curCol - 1 >= 0){
				var candyAt = that.getCandyAt(curRow, curCol - 1);
				candies.push(candyAt)
			} 
			if(curCol + 1 < rows[curRow].length){
				var candyAt = that.getCandyAt(curRow, curCol + 1);
				candies.push(candyAt)
			}
			
			return candies;
		},
		this.getGroupAt = function(candy, found){
			var curRow = candy.getRow();
			var curCol = candy.getCol();

			if(!found[curRow]){
				found[curRow] = {};
			}
			if(!found.list){				
				found.list = [];	
			}
			if(found[curRow][curCol]){
				return found;
			}

			found[curRow][curCol] = candy;
			found.list.push(candy);

			var surrounding = that.getCandiesAround(curRow, curCol);
			//console.log(surrounding.length);
			for(var i = 0; i<surrounding.length; i++){
				var candyAt = surrounding[i];
				if(candyAt.getType() == candy.getType()){
					found = that.getGroup(candyAt, found);
				};
			};	
			return found;
		},
		this.getGroups = function(){
			var groups = [];
			
			//vertical
			var nextType = null;
			for(var i = 0; i < rows.length; i++){
				var group = [];
				for(var j = 0; j < rows[i].length; j++){
					
					var candy = that.getCandyAt(i, j);
					var type = candy.getType();
					
					if(j + 1 < rows.length){
						nextType = that.getCandyAt(i, j + 1).getType();
					} else nextType = null;
					
					
					group.push(candy);
					
					if(!(type == nextType)){
						if(group.length >= 3) groups.push(group);
						group = [];
					}
					
				}
			}
			//horizontal
			var nextType = null;
			for(var i = 0; i < rows.length; i++){
				var group = [];
				for(var j = 0; j < rows[i].length; j++){
					
					var candy = that.getCandyAt(j, i);
					var type = candy.getType();
					
					if(j + 1 < rows.length){
						nextType = that.getCandyAt(j + 1, i).getType();
					} else nextType = null;
					
					group.push(candy);
					if(!(type == nextType)){
						if(group.length >= 3) groups.push(group);
						group = [];
					}
					
				}
			}
			return groups;
		},
		this.getCandiesOfType = function(type){
			var candies = {}
			
			for(var rowNum = 0; rowNum < rows.length; rowNum++){
				for(var colNum = 0; colNum < rows[rowNum].length; colNum++){
					var candy = that.getCandyAt(rowNum, colNum);
					var curType = candy.getType();
					
					if(!type && type !=0) {
						if(!candies[curType]) candies[curType] = {};
						if(!candies[curType].list) candies[curType].list = [];
					} else if(type == curType){
						if(!candies[type]) candies[type] = {};
						if(!candies[type].list) candies[type].list = [];
					}
					
					if(!type && type !=0){
						candies[curType].list.push(candy);
					} else if(type == curType){
						candies[type].list.push(candy);
					}
				}
			}
			return candies;
		},
		this.dropCandies = function(){
		var candiesToAdd = [];	
			for(var colNum = 0; colNum < rows.length; colNum++){
				var emptyElements = [];
				for(var rowNum = (rows[colNum].length - 1); rowNum >= 0 ; rowNum--){
					var emptyPosition = {};
					if(rows[rowNum][colNum] === undefined){
						emptyPosition.row = rowNum;
						emptyPosition.col = colNum;
						emptyElements.push(emptyPosition);
					}
					if(rows[rowNum][colNum] !== undefined && emptyElements.length > 0){
						var position = emptyElements[0]; 
						rows[position.row][position.col] = rows[rowNum][colNum];
						
						delete rows[rowNum][colNum];
						emptyElements.shift();
						
						if(rows[rowNum][colNum] === undefined){
						emptyPosition.row = rowNum;
						emptyPosition.col = colNum;
						emptyElements.push(emptyPosition);
						}
					}
				}
				candiesToAdd = candiesToAdd.concat(emptyElements);
			}
		}
		return this;
	};
	
	var createLayout = function(){
		var rows = [];
		
		for(var i = 0; i < NUM_ROWS; i++){
			var row = [];
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
