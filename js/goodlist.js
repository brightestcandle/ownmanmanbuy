$(function() {
	//获取传过来的参数"?data-list-id=1500193800289",商品ID
	var idNum = window.location.search.split("=");
	var index = 1;
	//获取头部导航数据
	function getNavDat(goodid) {
		$.ajax({
			type: "get",
			url: url + "api/getcategorybyid" + "?categoryid=" + goodid,
			data: null,
			success: function(info) {
				var navData = Handlebars.compile($("#navTitle").html());
				$(".breadcrumb").html(navData(info));
				getListData(goodid, 1);
			}
		})
	}
	getNavDat(parseInt(idNum[1]));
	/*获取数据列表和页码
	 * 参数为 商品ID和要获取的页码
	 */
	function getListData(list, pageid) {
		$.ajax({
			type: "get",
			url: url + "api/getproductlist" + "?categoryid=" + list + "&pageid=" + pageid,
			data: null,
			success: function(info) {
				var productdata = Handlebars.compile($("#productList").html());
				$(".content").html(productdata(info));						
				//这一部分都是在操作最底下的页码
				var totalNum = info.totalCount; //总共的商品数量
				var everyPage = info.pagesize; //每页的商品数量
				window.totalPag = Math.ceil(totalNum / everyPage); //总共页数
				//设置默认的显示页数,index+"/"+totalPag
				$("#nowPage").text(pageid + "/" + totalPag);
				//用来设置上拉菜单中的字符变化,并且li需要动态生成total数量的Li
				var df = document.createDocumentFragment();
				for(var i = 0; i < window.totalPag; i++) {
					var lis = $("<li><a href='javascript:;'>" + (i + 1) + "</a></li>");
					$(df).append(lis);
				}
				$(".pagenum .dropdown-menu").html($(df));
				//给上一页和下一页按钮设置data，方便控制			
				if($("#upBtn").attr("data-index") == 0) {
					$("#upBtn")[0].disabled = "disabled";
				} else {
					$("#upBtn")[0].disabled = "";
				}
				if($("#downBtn").attr("data-index") == totalPag + 1) {
					$("#downBtn")[0].disabled = "disabled";
				} else {
					$("#downBtn")[0].disabled = "";
				}
			}
		})
	}
	//用来按钮点击
	$("#upBtn").on("click", function() {
		index--;
		getListData(parseInt(idNum[1]), index);
		indexSet(index);
	})
	$("#downBtn").on("click", function() {
		index++;
		indexSet(index);
		getListData(parseInt(idNum[1]), index);
	})
	function indexSet(index){
		$("#upBtn").attr("data-index", index - 1);
		$("#downBtn").attr("data-index", (index + 1));
	}
	//用来给每个li绑定事件
	$(".dropdown-menu").on("click", "li", function() {
		var pagenow = $(this).children()[0].innerHTML;
		$("#nowPage").text(pagenow + "/" + window.totalPag);
		index = parseInt(pagenow);
		indexSet(index);
		getListData(parseInt(idNum[1]), pagenow);
	})
})