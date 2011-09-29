/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20110929
 * @fileoverview 简单版lazyload，支持所有浏览器，禁用js无效,用noscript标签解决,服务器端用一个函数(如果是直接载入的图片).
 */
(function(W,$){
    dshop.add('lazyload',function(){
        
        var lazyload=function(cg){
          var that=this,
            _cg={
            placeholder:dshop.base+"plug/lazyload/gray.gif",
            attr:'data-lazyload',
            cls:'J_lazyload',
            effect:'show',
            threshold:'200',
            autowrap:null //不设置的话，滚动到哪里都不会执行懒加载，必须在初始化的时候指定,类型是数组[]
          }
          if(cg) $.extend(_cg,cg);
          $.each(_cg,function(key,val){
              that[key]=val;
            });
          
          if(!lazyload.isbind){
             $(window).bind('scroll',function(){
                 $.each(lazyload.queue,function(inedx,fn){
                     if(fn) fn();
                 });
             });
             lazyload.isbind=true;
          }

        }

        lazyload.queue=[]; //一个函数数组，保存window的scroll事件列队，滚动都出发同一个列队，事件只绑定一次
        lazyload.isbind=false;

        lazyload.prototype={
            //把一个区域的img的data-src换成src
            drawimg:function(wrap){
                
            },
            //滚动到threshold懒执行某个函数
            lazyfn:function(threshold){
               //每次实例化和触发都是往queue列队中加函数     
            },
            //进行scroll的初始化,对autowrap指定的容器，进行滚动条监听处理
            scrollinit:function(){
              if(autowrap){
                //每次实例化和触发都是往queue列队中加函数     
              }
            }
        }

        dshop.mods['lazyload']=lazyload;
    });
})(window,jQuery);
