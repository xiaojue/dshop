/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111009
 * @fileoverview suggest组件，本来想自己写，但是时间太紧，暂时还是先用kissy的吧……
 * http://docs.kissyui.com/docs/html/api/component/suggest/
 */
(function(W,$){
    dshop.add('suggest',function(){
      var suggest=function(callback){
          var loadkissy=function(){
              if(!suggest.core){
                var kissymin='http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js';
                $.getScript(kissymin,function(){
                    kissysuggest();
                  });
              }else{
                setTimeout(function(){
                    if(suggest.core) callback(suggest.core,KISSY);
                    else loadkissy();
                  },1);
              }
          }

          function kissysuggest(){
            var base='http://a.tbcdn.cn/s/kissy/1.2.0/';
            KISSY.Config.base=base;
            KISSY.use('suggest',function(S){
                suggest.core=S.Suggest;
                callback(suggest.core,S);
            });
          }
          
           if(!W.KISSY){
            loadkissy();
          }else{
            kissysuggest();
          }
        };
      dshop.mods['suggest']=suggest;
    });
})(window,jQuery)
