/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111008
 * @fileoverview 新版的城市区列表，支持多种data配置和显示模式，分离数据和逻辑
 */
(function(W,$){
    dshop.add('cityzone',function(){
        
        var cityzone=function(config){
          var _config={
            data:dshop.host+'cityzone/data.js',
            type:'select' //3种模式,select选择模式 | select，直接渲染模式 | draw，自定义模式 | custom
          };
        }

        cityzone.prototype={
            init:function(){

            },
            filter:function(){

            }
        }

        dshop.mods['cityzone']=cityzone;
    })
})(window,jQuery)
