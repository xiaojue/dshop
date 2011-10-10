/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111010
 * @fileoverview 菜单，气泡，层相对定位等,支持上下左右定位和自定义定位坐标
 */
(function(W,$){

dshop.add('bubble',function(){

  var bubble=function(config){
		var _config={
			cls:'',
			postion:'bottom', //left right top bottom 上下左右 [] 如果是数组则为x，y偏差值
			target:'',
      content:'',
			id:'#J_Bubble'+new Date().valueOf().toString().slice(3)
    };

		$.extend(_config,config);
		
		this.config=_config;
	};

	bubble.prototype={
		init:function(){
			var that=this,cg=that.config;
			that.createWrap();
		},
		remove:function(){
			var that=this,cg=that.config;
			$(cg.id).remove();
		},
		show:function(){
			var that=this,cg=that.config;
			$(cg.id).show();
		},
		hide:function(){
			var that=this,cg=that.config;
			$(cg.id).hide();
		},
		setcontent:function(html){
			var that=this,cg=that.config;
			$(cg.id).html(html);
		},
    postionsign:function(){
      var that=this,cg=that.config,
          postion=$(cg.target).offset(),
         	boxH=$(cg.target).height(),
          boxW=$(cg.target).width();
          cg.width=$(cg.id).width();
          cg.height=$(cg.id).height();
      return {
        bottom:{
          left:postion.left+(boxW-cg.width)/2,
				  top:postion.top+boxH
			  },
			  top:{
          left:postion.left+(boxW-cg.width)/2,
				  top:postion.top-cg.height
			  },
			  right:{
				  left:postion.left+boxW,
          top:postion.top+(boxH-cg.height)/2
			  },
			  left:{
				  left:postion.left-cg.width,
          top:postion.top+(boxH-cg.height)/2
			  }
      }
    },
		createWrap:function(){
      var that=this,cg=that.config;
			//根据位置进行创建wrap
			var wrap=$('<div>')
					.addClass(cg.cls)
					.css({
						'z-index':50,
						'position':'absolute',
						'display':'none'
					})
					.attr('id',cg.id.slice(1));

       if(cg.content!=''){
          wrap.append($(cg.content));
       }
			$('body').prepend(wrap);
      that.rebulidPostion();
		},
    rebulidPostion:function(){
      var that=this,cg=that.config;
      if(typeof cg.postion=='string' && that.postionsign().hasOwnProperty(cg.postion)){
        $(cg.id).offset({
           left:that.postionsign()[cg.postion].left,
           top:that.postionsign()[cg.postion].top
        });
      }else if(typeof cg.postion=='object'){
        var postion=$(cg.target).offset();
        $(cg.id).offset({
          left:postion.left+cg.postion[0],
				  top:postion.top+cg.postion[1]
        });
      }
    }
  };

  dshop.mods['bubble']=bubble;
});

})(window,jQuery)
