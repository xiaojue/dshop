/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111020
 * @fileoverview 商品详情展示页面模块
 */
(function(W, $) {
	dshopmods.add('detailinfo', function() {
		var info = function() {
			var Goods = GLOBAL_GOODS || {},
			isRealputs, isInit, _fn = {
				getdata: function(wrap, callback) {
					$.ajax({
						url: '/goods/desc/' + Goods.id,
						success: function(data) {
							callback(wrap, data);
						},
						error: function() {
							alert('商品详情加载失败，请尝试重新刷新页面');
						}
					});
				},
				handledata: function(wrap, html) {
					wrap.append('<div id="J_AJAXINFO"></div>');
					$('#J_AJAXINFO').html(html);
					isRealputs = true;
					_fn.toggle(wrap);
				},
				toggle: function(wrap) {
					wrap.children('div').hide();
					$('#J_AJAXINFO').show();
				}
			};

			return {
				toview: function(wrap) {
					if (isInit && isRealputs) {
						_fn.toggle(wrap);
					} else {
						_fn.getdata(wrap, _fn.handledata);
						isInit = true;
					}
				}
			}
		} ();
		dshopmods.mods['detailinfo'] = info;
	});
})(window, jQuery)

