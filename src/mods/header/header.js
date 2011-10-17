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
                dshop.mods.favorite('动米网健身商城','http://shop.idongmi.com/');
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
        shopcart:function(){
          dshop.use('template',function(){
            var dl='<dl>'+
									'<dt><a href="{{href}}"><img src="{{pic}}" alt="{{name}}" title="{{name}}"></a></dt>'+
									'<dd>'+
										'<div><a class="gray1" href="{{href}}">{{name}}</a></div>'+
										'<div class="st"><a href="{{delete}}">删除</a>¥<font>{{price}}</font></div>'+
									'</dd>'+
                '</dl>',
                footbar='<div class="shop_set"><input type="button" class="mall">购物车中共有 {{count}} 件商品</div>';
            $.ajax({
              url:'',  
              type:'POST',
              data:{

              },
              success:function(){

              },
              timeout:5000,
              error:function(){
                  //5000没有返回结果，用默认的渲染
                  var setting={
                    count:0,
                    s:[]
                  };

              }
            });
            
          }); 
        },
				init: function() {
					var that = this;
					$(function() {
						that.greetbar();
						that.menuinit();
            that.favorite();
						if ($('#J_Search').length != 0) that.searchinit();
					});
				}
			}
		} ();

		dshopmods.mods['header'] = header;

	});
})(window, jQuery);

