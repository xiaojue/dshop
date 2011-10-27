/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111017
 * @fileoverview 加入收藏,加入购物车等与单个商品相关的功能条，这是一个惰性单体，只且被实例化一次
 */
(function(W, $) {
	dshopmods.add('goodsbar', function() {
		var goodsbar = (function() {
			var uninstance, constructor = function() {
				this.setCollectCls('.J_Collect');
				this.setTradeCls('.J_Trade');
        this.setComment('.J_Commentbar');
				this.attr = 'data-goodsid';
			};

      var T;

			constructor.prototype = {
				successlay: function(msg, node) {
          clearTimeout(T);
					var lay = '<div id="J_MYLAY" class="mall_review"></div>';
					if ($('#J_MYLAY').length == 0) $('body').append(lay);
					$('#J_MYLAY').css({
						'left': node.pageX+10,
						'top': node.pageY+10,
						'position': 'absolute',
            'z-index':10
          }).html(msg).show();
          T=setTimeout(function(){
              $('#J_MYLAY').hide();
          },800);
				},
				initEvent: function() {
					var that = this;
					$(that.collect).live('click', function(e) {
						var id = $(this).attr(that.attr);
						that.addCollect(id, e);
						return false;
					});
					$(that.trade).live('click', function(e) {
						var id = $(this).attr(that.attr);
						that.addTrade(id, e);
						return false;
					});
          $(that.comment).live('mouseover',function(e){
              that.successlay('商品评论共有'+$(this).text()+'条',e); 
          });
				},
				addCollect: function(id, e) {
					var that = this;
          if($(e.currentTarget).attr('data-isCol')){
            that.successlay('已经添加到收藏夹',e);
            return;
          }
					$.ajax({
						url: '/hudong/setFavGoods.ajax',
						type: 'POST',
						datatype: 'json',
						data: {
							goodsid: id
						},
						success: function(data) {
							try {
								var data = eval('(' + data + ')');
							} catch(ex) {
								that.successlay(ex, e);
							}
							if (data.s == 1) {
								that.successlay(data.msg, e);
               $(e.currentTarget).attr('data-isCol',true);
							} else {
								that.successlay(data.msg, e);
							}
						},
						error: function() {
							that.successlay('添加收藏失败，请检查网络',e);
						}
					});
				},
				addTrade: function(id, e) {
          var that=this;
          if($(e.currentTarget).attr('data-isTra')){
            that.successlay('已经添加到购物车', e);
            return;
          }
					$.ajax({
						url: '/cart/savecartgood.ajax',
						data: {
							gCount: 1,
							gid: id
						},
						type: 'POST',
						datatype: 'json',
						success: function(data) {
							try {
								var data = eval('(' + data + ')');
							} catch(ex) {
									that.successlay(ex, e);
							}
							if (data.s == 1) {
								that.successlay(data.msg, e);
                $(e.currentTarget).attr('data-isTra',true);
                //更新一下购物车
                $.getScript('http://dshop.idongmi.com/cart/getCart.json?callback=idmjsonp.cart&pageNo=1');
							} else {
							that.successlay(data.msg, e);
							}
						},
						error: function() {
							that.successlay('添加购物车失败，请检查网络',e);
						}
					});
				},
				setCollectCls: function(cls) {
					this.collect = cls;
				},
				setTradeCls: function(cls) {
					this.trade = cls;
				},
        setComment:function(cls){
          this.comment=cls
        }
			};

			return {
				torouse: function() {
					if (!uninstance) {
						uninstance = new constructor();
						uninstance.initEvent(); //初始化一次事件绑定
					}
					return uninstance;
				}
			};
		})();
		dshopmods.mods['goodsbar'] = goodsbar;
	});
})(window, jQuery)

