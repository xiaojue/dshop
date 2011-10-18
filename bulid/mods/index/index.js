/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111014
 * @fileoverview 商城首页主要交互模块
 */
(function(W,$){
    dshopmods.add('index',function(){
        var index=function(){
          var _fn={
            initNav:function(){
              $('#J_AllNav>li').hover(function(){
                  $(this).addClass('active');
                  $(this).find('.sub_column').show();
                },
                function(){
                  $(this).removeClass('active');
                   $(this).find('.sub_column').hide();
                });
            }
          };
          return {
            init:function(){
              _fn.initNav();
            }
          }
        }();
        dshopmods.mods['index']=index;
    });
})(window,jQuery);
