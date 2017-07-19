$(function() {
	//js for menu
	function getbrandbgTData() {
		$.ajax({
			type: "get",
			url: url + "api/getcategorytitle",
			data: null,
			success: function(info) {
				//绑定模板
				var mydata = Handlebars.compile($("#bigTitle").html());
				$(".list-group").html(mydata(info));
				$(".list-group-item").each(function() {
					var listId = parseInt($(this).attr("data-list"));
					$(this).on("click", function() {
						//把没一个高度设置为0
						$.each($(this).parent().find("table"), function() {
							$(this).css({
								height: 0
							})
						})
						getbrandtbTData(listId, $(this));
					})
				})
			}
		})
	}
	getbrandbgTData();
	function getbrandtbTData(idnum, select) {
		$.ajax({
			type: "get",
			url: url + "api/getcategory?titleid=" + idnum,
			data: null,
			success: function(info) {
				//绑定模板	
				var tbdata = Handlebars.compile($("#biglist").html());
				select.next().find("tbody tr").html(tbdata(info));
//				$(this).next().toggleClass("active");
				//高度需要根据数量决定，数量是
				if(select.next().height()!=0){
					select.next().css({
					height: 0
					});
				}
				else{	
					var hh = select.next().find("td").length / 3 * 38 + "px";
					select.next().css({
					height: hh
					});
				}
				
			}
		})
	}
})