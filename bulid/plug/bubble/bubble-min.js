(function(a,b){dshop.add("bubble",function(){var c=function(d){var e={cls:"",postion:"bottom",target:"",content:"",id:"#J_Bubble"+new Date().valueOf().toString().slice(3)};b.extend(e,d);this.config=e};c.prototype={init:function(){var e=this,d=e.config;e.createWrap()},remove:function(){var e=this,d=e.config;b(d.id).remove()},show:function(){var e=this,d=e.config;b(d.id).show()},hide:function(){var e=this,d=e.config;b(d.id).hide()},setcontent:function(d){var f=this,e=f.config;b(e.id).html(d)},postionsign:function(){var f=this,e=f.config,h=b(e.target).offset(),d=b(e.target).height(),g=b(e.target).width();e.width=b(e.id).width();e.height=b(e.id).height();return{bottom:{left:h.left+(g-e.width)/2,top:h.top+d},top:{left:h.left+(g-e.width)/2,top:h.top-e.height},right:{left:h.left+g,top:h.top+(d-e.height)/2},left:{left:h.left-e.width,top:h.top+(d-e.height)/2}}},createWrap:function(){var f=this,e=f.config;var d=b("<div>").addClass(e.cls).css({"z-index":50,position:"absolute",display:"none"}).attr("id",e.id.slice(1));if(e.content!=""){d.append(b(e.content))}b("body").prepend(d);f.rebulidPostion()},rebulidPostion:function(){var e=this,d=e.config;if(typeof d.postion=="string"&&e.postionsign().hasOwnProperty(d.postion)){b(d.id).offset({left:e.postionsign()[d.postion].left,top:e.postionsign()[d.postion].top})}else{if(typeof d.postion=="object"){var f=b(d.target).offset();b(d.id).offset({left:f.left+d.postion[0],top:f.top+d.postion[1]})}}}};dshop.mods.bubble=c})})(window,jQuery);