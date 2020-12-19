var CandyCrush = window.CandyCrush || {};

CandyCrush.Board = (function ($) {
	"use strict";
	
	var NUM_ROWS = 8;
	var NUM_COLS = 8;

	var Board = function () {
		
		var that = this;
		var rows = createLayout();
		this.getRows = function () {
			return rows;
		},
		this.getCandyAt = function (rowNum, colNum){
			return this.getRows()[rowNum][colNum];
		},
		this.addCandy = function(candy, rowNum, colNum){
			rows[rowNum][colNum] = candy;	
			candy.setRow(rowNum);
			candy.setCol(colNum);
		},
		this.deleteCandyAt = function (rowNum, colNum){
			delete rows[rowNum][colNum];
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
		this.getGroups = function(){
			var groups = [];
			
			//horizontal
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
			//vertical
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
			var emptyPlaces = [];	
			for(var colNum = 0; colNum < rows.length; colNum++){
				var emptyInRow = [];
				for(var rowNum = (rows[colNum].length - 1); rowNum >= 0 ; rowNum--){
					var position = {};
					var candy = rows[rowNum][colNum];
					if(candy === undefined){
						position.row = rowNum;
						position.col = colNum;
						emptyInRow.push(position);
					}
					if(candy !== undefined && emptyInRow.length > 0){
						var position = emptyInRow[0]; 
						candy.setRow(position.row);
						candy.setCol(position.col);
						rows[position.row][position.col] = candy;
						
						delete rows[rowNum][colNum];
						emptyInRow.shift();
						
						if(rows[rowNum][colNum] === undefined){
							position.row = rowNum;
							position.col = colNum;
							emptyInRow.push(position);
						}
					}
				}
				emptyPlaces = emptyPlaces.concat(emptyInRow);
			}
		},
		this.getEmptyPlaces = function(){
			var emptyPlaces = [];
			for(var colNum = 0; colNum < rows.length; colNum++){
				var emptyInRow = [];
				for(var rowNum = 0; rowNum < rows[colNum].length; rowNum++){
					var position = {};
					if(rows[rowNum][colNum] === undefined){
						position.row = rowNum;
						position.col = colNum;
						emptyInRow.push(position);
					} else {
						if(emptyInRow.length > 0) emptyPlaces.push(emptyInRow);
						break;
					}
				}
			}
			return emptyPlaces;
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
