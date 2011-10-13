/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111013
 * @fileoverview 自定义提示浮出层
 */
(function(W,$){
    dshop.add('customtips',function(){
      
      var customtips=function(html){
        this.html=html;
        this.coordX=0;
        this.coordY=0;
        this.layerid='#J_layer'+new Date().valueOf();
      };

      customtips.prototype={
        init:function(){
          var that=this;
          that._createlayer(that.html,that.layerid.slice(1));
          $('body').live('mousemove',function(e){
              that.coordX=e.originalEvent.x || e.originalEvent.layerX || 0;
              that.coordY=e.originalEvent.y || e.originalEvent.layerY || 0;
          });
        },
        _createlayer:function(html,id){
          var that=this,
          layer=$('<div>').attr('id',id).html(html).css('position','absolute');
          $('body').append(layer);
          layer.hide();
        },
        fire:function(){
          var that=this;
          $(that.layerid).css({
              left:that.coordX+10,
              top:that.coordY+10
            }).show(); 
        },
        hide:function(){
          $(this.layerid).hide();
        }
      };

      dshop.mods['customtips']=customtips;
    });
})(window,jQuery)

