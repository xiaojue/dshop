/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111018
 * @fileoverview 群图片狂魔加载器……负责预加载一坨img然后一起插入，执行回调，增强用户体验
 */
(function(W, $) {
	dshop.add('imgloader', function() {
		var imgloader = function(cls, callback, attr) {
			this.cls = cls;
			this.callback = callback;
			this.attr = attr || 'data-src';
		};
		imgloader.prototype = {
			_batchlist: function() {
				var that = this,
				map = [],
				l = $(that.cls).length;
				$(that.cls).each(function(index, node) {
					var src = $(node).attr(that.attr);
					var img = new Image();
					img.onload = function() {
						map.push(index);
						if (map.length == l) {
							function _init() {
								//全部载入完了-ie6-8下onload不准，需要延迟
								//把图片以此插入
								$(that.cls).each(function(i, node) {
									var realsrc = $(node).attr(that.attr);
									$(node).attr('src', realsrc);
									$(node).fadeIn();
								});
								if (that.callback) that.callback();
							}
							_init();
						}
					}
          img.src = src;
				});
			},
			init: function() {
				this._batchlist();
			}
		};
		dshop.mods.imgloader = imgloader;
	});
})(window, jQuery)

