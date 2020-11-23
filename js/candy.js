var CandyCrush = window.CandyCrush || {};

CandyCrush.Candy = (function($){
	var Candy = function(row, col, type, sprite){
		var that = this;
		this.getType = function(){return type;};
		this.getSprite = function(){return sprite;};
		this.getCol = function(){return col;};
		this.getRow = function(){return row;};
	};
	Candy.create = function(rowNum, colNum, type){
		if(type === undefined) type = Math.floor((Math.random()) * 4);
		
		var sprite = $(document.createElement("div"));
		sprite.addClass("candy");
		sprite.addClass("candy_" + type);
		
		var candy = new Candy(rowNum, colNum, type, sprite);
		return candy;
	};
	return Candy;
})(jQuery);