//先写nav部分的数据
$(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	var categoryId = GetQueryString("categoryId");
	var productId = GetQueryString("productId");
	//设置nav的分类部分
	$.ajax({
		type: "get",
		url: url + "api/getcategorybyid" + "?categoryid=" + categoryId,
		data: null,
		success: function(info) {
			//绑定数据
			var productClass = Handlebars.compile($("#navList").html());
			$(".breadcrumb").html(productClass(info));
		}
	})
	//设置nav的最后一个部分
	$.ajax({
		type: "get",
		url: url + "api/getproduct" + "?productid=" + productId,
		data: null,
		success: function(info) {
			console.log(info);
			$(".breadcrumb .active").text(info.result[0].productName);
			//绑定模板
			var products = Handlebars.compile($("#products").html());
			$(".title").html(products(info));
		}
	})
	//设置评论部分的数据
	$.ajax({
		type: "get",
		url: url + "api/getproductcom" + "?productid=" + productId,
		data: null,
		success: function(info) {
			console.log(info);
			//绑定模板
			var diswords = Handlebars.compile($("#discussall").html());
			$(".discussall").html(diswords(info));
		}
	})
})