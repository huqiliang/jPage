module.exports = function(name){
	var search = location.search.replace('?','').split('&');
	for (var i = 0; i < search.length; i++) {
		if(search[i].indexOf(name)>-1){
			return search[i].split('=')[1];
		}
	};
	
}