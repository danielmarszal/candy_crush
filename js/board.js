var CandyCrush = window.CandyCrush || {};
//board constructor, keeps informations about each candy inside board
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
		this.swapCandies = function(candy1, candy2){
			var row1 = candy1.getRow();
			var col1 = candy1.getCol();
			
			var row2 = candy2.getRow();
			var col2 = candy2.getCol();
			
			var temp = rows[row1][col1];
			
			rows[row1][col1] = rows[row2][col2];
			rows[row2][col2] = temp;
			
			candy1.setRow(row2);
			candy1.setCol(col2);
			candy2.setRow(row1);
			candy2.setCol(col1);
		},
		this.deleteCandyAt = function (rowNum, colNum){
			delete rows[rowNum][colNum];
		},
		this.getCandiesAround = function(rowNum, colNum){
			//returns 4 candies (up,down,left,right relative to candy) inside array
			var candies = [];
			
			if(rowNum - 1 >= 0){
				var candyAt = that.getCandyAt(rowNum - 1, colNum);
				candies.push(candyAt)
			} 
			if(rowNum + 1 < rows.length){
				var candyAt = that.getCandyAt(rowNum + 1, colNum);
				candies.push(candyAt)
			}
			if(colNum - 1 >= 0){
				var candyAt = that.getCandyAt(rowNum, colNum - 1);
				candies.push(candyAt)
			} 
			if(colNum + 1 < rows[rowNum].length){
				var candyAt = that.getCandyAt(rowNum, colNum + 1);
				candies.push(candyAt)
			}
			
			return candies;
		},
		this.getGroups = function(){
			//returns each group of candies on board bigger than 3
			var groups = [];
			
			//horizontal
			var nextType = null;
			for(var rowNum = 0; rowNum < rows.length; rowNum++){
				var group = [];
				for(var colNum = 0; colNum < rows[rowNum].length; colNum++){
					
					var candy = that.getCandyAt(rowNum, colNum);
					var type = candy.getType();
					
					if(colNum + 1 < rows.length){
						nextType = that.getCandyAt(rowNum, colNum + 1).getType();
					} else {
						nextType = null
					}
					
					group.push(candy);
					
					if(!(type == nextType)){
						if(group.length >= 3) groups.push(group);
						group = [];
					}
					
				}
			}
			//vertical
			var nextType = null;
			for(var colNum = 0; colNum < rows.length; colNum++){
				var group = [];
				for(var rowNum = 0; rowNum < rows[colNum].length; rowNum++){
					
					var candy = that.getCandyAt(rowNum, colNum);
					var type = candy.getType();
					
					if(rowNum + 1 < rows.length){
						nextType = that.getCandyAt(rowNum + 1, colNum).getType();
					} else {
						nextType = null
					}
					
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
			//if type is not set groups candies of each tpye
			//if type is set groups only candies of one type
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
			//finds empty places then add it to array afterwards looks for closest candy to fill it, iteration goes from bottom to top and left to right
			
			var emptyPlaces = [];	
			for(var colNum = 0; colNum < rows.length; colNum++){
				var emptyInRow = [];
				for(var rowNum = (rows[colNum].length - 1); rowNum >= 0 ; rowNum--){
					var position = {};
					var candy = rows[rowNum][colNum];
					if(candy === undefined){ 
						//sets empty position
						position.row = rowNum;
						position.col = colNum;
						emptyInRow.push(position);
					}
					if(candy !== undefined && emptyInRow.length > 0){
						//sets cur candy to oldest empty position
						var position = emptyInRow[0]; 
						candy.setRow(position.row);
						candy.setCol(position.col);
						rows[position.row][position.col] = candy;
						
						//deletes cur candy
						delete rows[rowNum][colNum];
						emptyInRow.shift();
						
						//sets cur candy place to empty place
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
			//gets each empty place
			
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
