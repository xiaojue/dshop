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
        this.attr='data-goodsid';
      };

      constructor.prototype={
         initEvent:function(){
           var that=this;
           $(that.collect).live('click',function(){
               var id=$(this).attr(that.attr);
               that.addCollect(id);
               return false;
           });
           $(that.trade).live('click',function(){
              var id=$(this).attr(that.attr);
              that.addTrade(id);
              return false;
           });
         },
         addCollect:function(id){
            $.ajax({
              url:'/hudong/setFavGoods.ajax',
              type:'POST',
              datatype:'json',
              data:{
                goodsid:id
              },
              success:function(data){
                console.log(data);
                if(data.s==1){
                  alert('收藏成功');
                }else{
                  alert(data.msg);
                }
              },
              error:function(){
                alert('添加收藏失败，请检查网络');
              }
            });           
         },
         addTrade:function(id){
           dshop.use('cookie',function(){
               var cid=dshop.mods.cookie('IDMUV');
              $.ajax({
              url:'cart/savecartgood.ajax?cid='+cid+'&gid='+id,
              type:'POST',
              datatype:'json',
              success:function(data){
                console(data);
                if(data.s==1){
                  alert('添加购物车成功');
                }else{
                  alert(data.msg);
                }
              },
              error:function(){
                alert('添加购物车失败，请检查网络');
              }
              });
           });
         },
         setCollectCls:function(cls){
            this.collect=cls;
         },
         setTradeCls:function(cls){
            this.trade=cls;
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

