/**
 * @author fuqiang[designsor]
 * @version 20111011
 * @fileoverview 勾词分享微博，停留一段时间后浮出可分享提示
 */
(function(W,doc,$){
    dshop.add('selectshare',function(){
       var selectshare=function(range){
          this.range= range || 'body';
       };

       selectshare.prototype={
          getselectTxt:function(){
            return (doc.selection) ? doc.selection.createRange().text.toString() : doc.getSelection().toString();
          },
          init:function(){
            var that=this,
            tips=new dshop.mods['customtips']('<div id="J_SelectionShare"></div>');
            tips.init();
            var share=new dshop.mods.share('#J_SelectionShare');
            share.init();
            $(that.range).live('mouseup',function(e){
                var text=that.getselectTxt();
                if(text){
                  tips.fire();
                }else{
                  tips.hide();
                }
            });
          $('#J_SelectionShare').live('mousedown',function(){
              var text=that.getselectTxt();
              if(text){
                 
              }else{
                tips.hide();
                return false;
              }
          });
          }
       };

       dshop.mods['selectshare']=selectshare;
    });
})(window,document,jQuery)
