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
					var T;
					$('#J_MyShop').hover(function() {
						$('.mid_mall').addClass('hover');
						$('.mall_on').show();
					},
					function() {
						$('.mid_mall').removeClass('hover')
						$('.mall_on').hide();
					});
					$('#J_ShopCart').bind('mouseenter', function() {
						clearTimeout(T);
						$('#J_ShopCart').addClass('hover1');
						$('.shop_on').show();
					}).bind('mouseleave', function() {
						T = setTimeout(function() {
							$('#J_ShopCart').removeClass('hover1');
							$('.shop_on').hide();
						},
						100);
					});
					$('.shop_on').bind('mouseleave', function() {
						$('#J_ShopCart').removeClass('hover1');
						$('.shop_on').hide();
					}).bind('mouseenter', function() {
						clearTimeout(T);
					});
					$('#J_Nav').hover(function() {
						$('#J_Nav').addClass('hover2');
						$('.mall_nav').show();
					},
					function() {
						$('#J_Nav').removeClass('hover2');
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
								callbackFn: 'idmjsonp.suggest'
							});
							sug.on('dataReturn', function() {
								this.returnedData = this.returnedData.s || [];
							});
						});
					});
				},
				shopcart: function() {
					dshop.use('template', function() {
						var html = '{{#s}}' + '<dl>' + '<dt><a href="{{goodsId}}"><img src="{{smallPicture}}" alt="{{goodsName}}" title="{{goodsName}}"></a></dt>' + '<dd>' + '<div><a class="gray1" href="{{goodsId}}">{{goodsName}}</a></div>' + '<div class="st"><a href="javascript:void(0)" data-id="{{goodsId}}" class="J_CartDel">删除</a>¥<font>{{price}}</font></div>' + '</dd>' + '</dl>' + '{{/s}}' + '<div class="shop_set"><input type="button" class="mall">购物车中共有 {{count}} 件商品</div>';
						function inithandle() {
							var setting = {
								count: 0,
								s: []
							};
							var result = dshop.mods.template.to_html(html, setting);
							$('#J_ShopCartWrap').html(result);
						};

						inithandle();
						idmjsonp.cart = function(data) {
							var result = dshop.mods.template.to_html(html, data);
							$('#J_ShopCartWrap').html(result);
							$('#J_CartN').html(data['count'])
						};
						var id = dshop.mods.cookie('IDMUV');
						$.getScript('http://dshop.idongmi.com/cart/getCart.json?callback=idmjsonp.cart&pageNo=1&cid=' + id);
						$('.J_CartDel').live('click', function() {
							var shopid = $(this).attr('data-id'),
							node = $(this);
							$.ajax({
								url: '/cart/delcartgood.ajax',
								type: 'POST',
								data: {
									cid: id,
									gid: shopid
								},
								success: function(data) {
                  var ret = $.trim(data),data=eval('('+ret+')');
									if (data.s == 1) {
										node.closest('dl').remove();
									} else if (data.s == 0) {
                    alert(data.msg);
									}
								},
								error: function() {
									alert('系统超时，删除失败');
								}
							});
						});
					},
					['cookie']);
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

