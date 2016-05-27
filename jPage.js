var $ = require('jquery')
var search = require('./search')


module.exports.init = function(){
	var s = location.pathname
	var categoryId = s.substr(s.lastIndexOf('/')+1);
	$.ajax({
		url: '/common/ajax/getArtTotal?typeId='+categoryId,
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		var total = parseInt(data);
		var firstResult = parseInt(search('firstResult')) || 0;
		var pageSize = parseInt(search('pageSize')) || 8;   //目前写死 以后改成全局
		var current = firstResult/pageSize;
		var pageCount = Math.ceil(total/pageSize);

		//根据链接生成分页
		function page_icon(page,count,eq){
			var ul_html = "";
			var prev = '';
			var next = '';
			if( firstResult != 0 ){
				prev = "<span>上一页</span>";
			}
			if((current+1) != pageCount && total!=0){
				next = "<span>下一页</span>"
			}

			for(var i = page; i <= count-1; i++){
				ul_html += "<a href='/common/category/"+categoryId+"?firstResult="+pageSize*i+"&pageSize="+pageSize+"'>"+(i+1)+"</a>";
			}
			html = prev + ul_html + next;
			$('.ui_jPage').html(html);
			$('.ui_jPage a').eq(current).addClass("current");
			$('.ui_jPage span').click(function() {
				var current = $('.current').index()-1;
				if(current < 0) { current = 0 };
				if($(this).text()=='上一页'){
					current = current - 1;
				}else{
					current = current + 1;
				}
				window.location.href = '/common/category/'+categoryId+'?firstResult='+pageSize*current+'&pageSize='+pageSize;
			});
		}
		page_icon(0,pageCount,0);
	})
	

}