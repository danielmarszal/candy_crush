var CandyCrush = window.CandyCrush || {};

CandyCrush.Candy = (function($){
	var Candy = function(Candy){
		var that = this;
		this.getSprite = function(){return sprite};
	};
	Candy.create = function(){
		var sprite = $(document.createElement("div"));
		sprite.addClass("candy");
		sprite.addClass("candy_0");
		var candy = new Candy(sprite);
		return candy;
	};
	return Candy;
})(jQuery);