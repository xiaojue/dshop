/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111020
 * @fileoverview 商品详情咨询模块
 */
(function(W, $) {
	dshopmods.add('detailrefer', function() {
		var refer = function() {
			var Goods = GLOBAL_GOODS || {},
			isRealputs, isInit, onsget = true,
			Mydetailrefer, _fn = {
				postdata: function(id, pageNo) {
					if (onsget) {
						oneget = false;
						$.getScript('http://dshop.idongmi.com/hudong/getAsks.json?gid=' + id + '&pageNo=' + pageNo + '&callback=idmjsonp.detailrefer', function() {
							onsget = true;
						});
					}
				},
				initrefer: function(wrap) {
					wrap.append('<div id="J_AJAXREFER"></div>');
					dshop.use('paging', function() {
						idmjsonp.detailrefer = function(data) {
							var htmls = data.s,
							htmlret = '';
							for (var i = 0; i < htmls.length; i++) {
								htmlret += htmls[i]['html'];
							}
							$('#J_AJAXREFER').html(htmlret);
						};
						_fn.postdata(Goods.id, 1);
            isRealputs = true;
					_fn.toggle(wrap);
					},
					['template']);
				},
				toggle: function(wrap) {
					wrap.children('div').hide();
					$('#J_AJAXREFER').show();
				},
			};

			return {
				toview: function(wrap) {
					if (isInit && isRealputs) {
						_fn.toggle(wrap);
					} else {
						_fn.initrefer(wrap);
						isInit = true;
					}
				}
			}
		} ();
		dshopmods.mods['detailrefer'] = refer;
	});
})(window, jQuery)

