(function(a,b,c){dshop.add("ie6fix",function(){var d=function(){var e={fixpng:function(f){if(!f){f="body"}b(f+" img").each(function(){var h=this.src.toUpperCase();if(h.substring(h.length-3,h.length)=="PNG"){var g=b("<span>").css({width:this.offsetWidth,height:this.offsetHeight,display:"inline-block",overflow:"hidden",cursor:(this.parentElement.href)?"hand":""}).attr({title:this.alt||this.title||"","class":this.className});g[0].style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.src+'", sizingMethod="scale")';b(this).replaceWith(g)}})},addhover:function(g,f){b(g).hover(function(){b(this).addClass(f)},function(){b(this).removeClass(f)})},tabledistance:function(g,f){var h={evencls:"",oddcls:""};b.extend(h,f);b(g+":odd").addClass(h.oddcls);b(g+":even").addClass(h.evencls)}};c.execCommand("BackgroundImageCache",false,true);return{fixpng:e.fixpng,addhover:e.addhover,tabledistance:e.tabledistance}}();dshop.mods.ie6fix=d})})(window,jQuery,document);