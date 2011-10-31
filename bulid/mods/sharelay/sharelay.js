/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111031
 * @fileoverview 分享到其他网站，惰性加载覆层
 */
(function(W,$){
    dshopmods.add("sharelay",function(){
      
      var sharelay=function(){
        
        var isInit,hook='#J_MYSHARELAY'+new Date().valueOf();

        var bulidlay=function(){
          $('body').append("<div id='"+hook.slice(1)+"' style='position:absolute;display:none;background:#eee;border:#ddd;padding:10px;'></div>")    
        }();

        var _init=function(title,url){
          this.title=title;
          this.url=url;
        };
        
        _init.prototype={
          set:function(attr,val){
            this[attr]=val;
          },
          hide:function(){
            $(hook).hide();
          },
          show:function(e){
            var that=this;
            dshop.use('share',function(){
              $(hook).html("");
              _init.regin=null;
              _init.regin=new dshop.mods.share(hook,{
                  url:that.url,
                  title:that.title
                });
              _init.regin.init();
              $(hook).show();
              var w=$(hook).width(),h=$(hook).height();
              $(hook).css({
                  left:e.pageX+10,
                  top:e.pageY+5
                });
            },['loadcss','template']);
          }
        }

        return {
          init:function(selector,cg){
              $(selector).live("click",function(e){
                var title=$(this).attr(cg.title),
                    url=$(this).attr(cg.url);
                    if(!isInit){
                       isInit=new _init(title,url);
                       isInit.show(e);
                       $('body').live('click',function(e){
                          isInit.hide();
                       });
                    }else{
                      isInit.set('title',title);
                      isInit.set('url',url);
                      isInit.show(e);
                    }
                return false;
              });   
          }
        }
      }();
      dshopmods.mods.sharelay=sharelay;
    });
})(window,jQuery);
