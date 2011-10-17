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
					$('#J_Nav').hover(function() {
						$('#J_Nav').addClass('hover2');
						$('.mall_nav').show();
					},
					function() {
						$('#J_Nav').removeClass('hover2')
						$('.mall_nav').hide();
					});
				},
				favorite: function() {
					$('#J_Favorite').click(function() {
						dshop.use('favorite', function() {
							dshop.mods.favorite('动米网健身商城', 'http://shop.idongmi.com/');
						});
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
				shopcart: function() {
					dshop.use('template', function() {
						var html = '{{#s}}' + '<dl>' + '<dt><a href="{{id}}"><img src="{{pic}}" alt="{{name}}" title="{{name}}"></a></dt>' + '<dd>' + '<div><a class="gray1" href="{{id}}">{{name}}</a></div>' + '<div class="st"><a href="{{id}}">删除</a>¥<font>{{price}}</font></div>' + '</dd>' + '</dl>' + '{{/s}}' + '<div class="shop_set"><input type="button" class="mall">购物车中共有 {{count}} 件商品</div>';
						function errorhandle() {
							var setting = {
								count: 0,
								s: []
							};
              console.log(dshop.mods.template)
							var result = dshop.mods.template.to_html(setting, html);
							$('#J_ShopCartWrap').html(result);
						};
						$.ajax({
							url: 'xxx.jsp',
              datatype:'jsonp',
							jsonpCallback: 'callback',
							jsonp: 'callback',
							data: {},
							success: function(data) {
								var result = dshop.mods.template.to_html(data, html);
								$('#J_ShopCartWrap').html(result);
							},
							timeout: 5000,
							error: errorhandle
						});
					});
				},
				init: function() {
					var that = this;
					$(function() {
						that.greetbar();
						that.menuinit();
						that.favorite();
            that.shopcart();
						if ($('#J_Search').length != 0) that.searchinit();
					});
				}
			}
		} ();

		dshopmods.mods['header'] = header;

	});
})(window, jQuery);

