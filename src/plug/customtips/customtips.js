/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111013
 * @fileoverview 自定义提示浮出层
 */
(function(W,$){
    dshop.add('customtips',function(){
      
      var customtips=function(html){
        this.range=range;
        this.html=html;
        this.coordX=0;
        this.coordY=0;
        this.layerid='#J_layer'+new Date().valueOf();
      };

      customtips.prototype={
        init:function(){
          var that=this;
          that._createlayer(html,that.layerid.slice(1));
          $(document).live('mousemove',function(e){
              that.coordX=e.originalEvent.x || e.originalEvent.layerX || 0;
              that.coordY=e.originalEvent.y || e.originalEvent.layerY || 0;
          });
        },
        _createlayer:function(html,id){
          var that=this,
          layer=$('<div>').attr('id',id).html(html);
          $('body').append(layer).css('position','absolute').hide();
        },
        fire:function(){
          var that=this;
          $(that.layerid).css({
              left:that.coordX,
              top:that.coordY
            }).show(); 
        }
      };

      dshop.mods['customtips']=customtips;
    });
})(window,jQuery)

