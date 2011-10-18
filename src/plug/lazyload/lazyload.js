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
            attr:'data-lazyload',
            target:'.J_lazyload',
            effect:'slow',
            threshold:0, //距离窗口下部 200px的时候就加载
            auto:false, //不设置的话，滚动到哪里都不会执行懒加载，必须在初始化的时候指定,类型是数组[]
            customfn:null
          }
          if(cg) $.extend(_cg,cg);
          $.each(_cg,function(key,val){
              that[key]=val;
            });

          var _fnfired;
          
          lazyload.lazyloadfire=function(){
            that.lazyfn(that.target,function(ele){
                  if(that.auto) that.drawimg(ele);
                  if(that.customfn && !_fnfired){
                    that.customfn(ele);
                    _fnfired=true;
                  }
               });
             var dh=$('body').height(),wt=$(window).scrollTop(),wh=$(window).height();
             //如果到了底部，则删除这个lazyload的window事件
             if(wt+wh>=dh){
               $(window).unbind('load scroll resize',lazyload.lazyloadfire);
             }
          }

          $(window).bind('load scroll resize',lazyload.lazyloadfire);
        }


        lazyload.prototype={
            init:function(){
              var that=this;  
              $(that.target).each(function(){
                  $(this).hide();
              });
            },
            //把一个img的data-src换成src
            drawimg:function(ele){
              var that=this;
              if(!!$(ele).attr(that.attr)){
                 var realsrc=$(ele).attr(that.attr);
                 $(ele).attr('src',realsrc); 
                 $(ele).fadeIn(that.effect);
               }
            },
            lazyfn:function(wrap,callback){
              var that=this,windowT=$(window).scrollTop(),windowH=$(window).height();
              $(wrap).each(function(index,ele){
                if($(this).offset().top-windowT-windowH<=that.threshold){
                   callback(this);
                }
              });
            }
        }

        dshop.mods['lazyload']=lazyload;
    });
})(window,jQuery);
