$(function() {
	//js for menu
	function getmenuData() {
		$.ajax({
			type: "get",
			url: url + "api/getindexmenu",
			data: null,
			success: function(info) {
				//绑定模板
				var mydata = template("menulist", info);
				$(".menu .row").html(mydata);
				$(".menu .row").on("click", '.menu .row>div:nth-child(8)', function() {
					//切换是否显示下面的四个
					$(".menu").toggleClass("showall");
				})
			}
		})
	}
	getmenuData();
	getdiscountData();
	//js for discount
	function getdiscountData() {
		$.ajax({
			type: "get",
			url: url + "api/getmoneyctrl",
			data: null,
			success: function(data) {
				//绑定模板
				var myTemplate = Handlebars.compile($("#discountlist").html());
				$('.discount .center').html(myTemplate(data));
			}
		})
	}
})