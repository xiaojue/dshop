/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111017
 * @fileoverview 添加到收藏夹功能
 */
(function(W) {
	dshop.add('favorite', function() {
		var favorite = function(title,url) {
			if (W.sidebar) {
				W.sidebar.addPanel(title, url, "");
			}
			else if (doc.all) {
				W.external.AddFavorite(url, title);
			}
			else if (W.opera && W.print) {
				alert('浏览器暂不支持直接添加到收藏夹,请使用ctrl+D手动收藏');
			}
		};
		dshop.mods['favorite'] = favorite;
	});
})(window,document);

