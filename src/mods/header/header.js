/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111014
 * @fileoverview 动米网商城头部吊顶
 */
(function(W, $) {
	dshopmods.add('header', function() {
		var header = function() {
			return {
				greetbar: function() {
					dshop.use('cookie', function() {
						var user = dshop.mods.cookie('ATsport'),
						bar = '';
						if (user) {
							bar = 'hi,您已登陆健身商城<a href="#" class="red">退出</a>';
						} else {
							bar = '你好，欢迎光临健身商城<a href="#" class="red">登录</a><span class="gray">|</span><a href="#" class="red">注册</a>'
						};
						$('#J_Greetbar').html(bar);
					},
					['template']);
				},
				menuinit: function() {
					$('#J_MyShop').hover(function() {
						$('.mid_mall').addClass('hover');
						$('.mall_on').show();
					},
					function() {
						$('.mid_mall').removeClass('hover')
						$('.mall_on').hide();
					});
					$('#J_ShopCart').hover(function() {
						$('#J_ShopCart').addClass('hover1');
						$('.shop_on').show();
					},
					function() {
						$('#J_ShopCart').removeClass('hover1');
						$('.shop_on').hide();
					});
				},
				searchinit: function() {
					var msg = '请输入商品的名称';
					$('#J_Search').focus(function() {
						var val = $.trim($(this).val());
						if (val == msg) $(this).val('');
					}).blur(function() {
						var val = $.trim($(this).val());
						if (val == '') $(this).val(msg);
					});
					dshop.use('suggest', function() {
						dshop.mods.suggest(function(suggest, KISSY) {
							var dataUrl = 'http://dev.idongmi.com/api/suggestAjax.jsp?max=10';
							var sug = new suggest('#J_Search', dataUrl, {
								queryName: 'key',
								callbackFn: 'callback'
							});
							sug.on('dataReturn', function() {
								this.returnedData = this.returnedData.s || [];
							});
						});
					});
				},
				init: function() {
					var that = this;
					$(function() {
						that.greetbar();
						that.menuinit();
						if ($('#J_Search').length != 0) that.searchinit();
					});
				}
			}
		} ();

		dshopmods.mods['header'] = header;

	});
})(window, jQuery);

