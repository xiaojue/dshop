/**
 * @author fuqiang[designsor]
 * @version 20111011
 * @fileoverview 勾词分享微博，停留一段时间后浮出可分享提示
 */
(function(W,doc,$){
    dshop.add('selectshare',function(){
       var selectshare=function(range){
          this.range= range || doc;
       };

       selectshare.prototype={
          getselectTxt:function(){
            return (doc.selection) ? doc.selection.createRange().text.toString() : doc.getSelection().toString();
          },
          init:function(){
            var that=this,
            tips=new dshop.mods['customtips']('<div id="J_SelectionShare">share</div>');
            tips.init();
            $(that.range).live('mouseup',function(e){
                var text=that.getselectTxt();
                if(text){
                  tips.fire();
                }else{
                  $('#J_SelectionShare').hide();
                }
            });
          }
       };

       dshop.mods['selectshare']=selectshare;
    });
})(window,document,jQuery)
