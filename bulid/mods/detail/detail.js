/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111017
 * @fileoverview 商品详情页面的js,包含右侧4个模块的加载，顶部放大镜和详情信息的初始化
 */
(function(W, $) {
	dshopmods.add('detail', function() {
		var detail = function() {
      var _fn={
        magnifier:function(){
          dshop.use('magnifier',function(){
              
          });
        },
        picgroup:function(){

        },
        shareinit:function(){

        },
        detailtab:function(){

        }
      }
      return {
        init:function(){
          _fn.magnifier();
          _fn.picgroup();
          _fn.shareinit();
          _fn.detailtab();
        }
      }
		};
		dshopmods.mods['detail'] = detail;
	});
})(window, jQuery);

