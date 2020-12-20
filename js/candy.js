var CandyCrush = window.CandyCrush || {};
//candy constructor, keeps informations about each candy created
CandyCrush.Candy = (function ($) {
	"use strict";

	var Candy = function (row, col, type, sprite) {
		var that = this;
		this.getType = function () {
			return type;
		};
		this.getSprite = function () {
			return sprite;
		};
		this.getCol = function () {
			return col;
		};
		this.getRow = function () {
			return row;
		};
		this.setCol = function (colIn) {
			col = colIn;
		};
		this.setRow = function (rowIn) {
			row = rowIn;
		}
		this.getOffset = function () { //gets coords relatively to viewport
			var offset = {
				left: $("#board").offset().left + that.getCol() * (CandyCrush.ui.MARGIN_BETWEEN_CANDIES + CandyCrush.ui.CANDY_SIZE) + CandyCrush.ui.MARGIN_BETWEEN_CANDIES / 2,
				top: $("#board").offset().top + that.getRow() * (CandyCrush.ui.MARGIN_BETWEEN_CANDIES + CandyCrush.ui.CANDY_SIZE) + CandyCrush.ui.MARGIN_BETWEEN_CANDIES / 2
			};
			return offset;
		};
		this.getCoords = function () { //gets coorsd relatively to its contener
			var coords = {
				left: sprite.position().left,
				top: sprite.position().top,
			};
			return coords;
		};
	};
	Candy.create = function (rowNum, colNum, type) {
		if (!type) {
			type = Math.floor(Math.random() * 6);
		};
			var sprite = $(document.createElement("div"));
			sprite.addClass("candy");
			sprite.addClass("candy_" + type);
		
		var candy = new Candy(rowNum, colNum, type, sprite);
		return candy;
	};
	return Candy;
})(jQuery);
