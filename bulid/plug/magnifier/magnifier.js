/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111008
 * @fileoverview 放大镜，直接取kissy的组件
 */
(function(W,$){
    dshop.add('magnifier',function(){
        var T;
        var magnifier=function(callback){
          var loadkissy=function(){
            dshop.KISSYLOAD=true;
            if(!magnifier.core){
              var kissymin='http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js';
              $.getScript(kissymin,function(){
                  kissymagnifier();
                });
            }else{
              setTimeout(function(){
                  if(magnifier.core) callback(magnifier.core,KISSY);
                  else loadkissy();
              },1)
            }
          };

          function kissymagnifier(){
            var base='http://a.tbcdn.cn/s/kissy/1.2.0/';
            KISSY.Config.base= base;
            var filename = dshop.debug ? '.css' : '-min.css';
            dshop.mods['loadcss'](dshop.host+'magnifier/magnifier'+filename);
            KISSY.use('imagezoom',function(S){
                magnifier.core=S.ImageZoom;
                callback(magnifier.core,S);
            });
          }

          if(!dshop.KISSYLOAD){
            loadkissy();
          }else{
            T=setInterval(function(){
                if(W.KISSY){
                  kissymagnifier();    
                  clearInterval(T);
                }
            },500);
          }
        };

        dshop.mods['magnifier']=magnifier;
    });
})(window,jQuery);
