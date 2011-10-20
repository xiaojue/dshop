/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111020
 * @fileoverview 商品详情页售后服务模块
 */
(function(W, $) {
	dshopmods.add('detailafter', function() {
		var after = function() {
			var Goods = GLOBAL_GOODS || {},
			isRealputs, isInit, _fn = {
				getdata: function(wrap, callback) {
					$.ajax({
						url: '/goods/sale/' + Goods.id,
						success: function(data) {
							callback(wrap, data);
						},
						error: function() {
							alert('商品售后服务信息加载失败，请尝试重新刷新页面');
						}
					});
				},
				handledata: function(wrap, html) {
					wrap.append('<div id="J_AJAXAFTER"></div>');
					$('#J_AJAXAFTER').html(html);
					isRealputs = true;
					_fn.toggle(wrap);
				},
				toggle: function(wrap) {
					wrap.children('div').hide();
					$('#J_AJAXAFTER').show();
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
		dshopmods.mods['detailafter'] = after;
	});
})(window, jQuery)

