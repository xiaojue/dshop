(function(a,c,b){dshop.add("selectshare",function(){var d=function(e){this.range=e||"body"};d.prototype={getselectTxt:function(){return(c.selection)?c.selection.createRange().text.toString():c.getSelection().toString()},init:function(){var h=this,e=new dshop.mods.customtips('<div id="J_SelectionShare" style="background:#fff;padding:2px;border:#ddd solid 1px;"></div>');e.init();var g=new dshop.mods.share("#J_SelectionShare",{size:9,order:["tsina","kaixin","taojianghu","qzone","tqq","souhu","tsouhu","douban","baidu"]});g.init();b("#J_SelectionShare a").css("border","none");var f;b(h.range).live("mouseup",function(i){clearTimeout(f);f=setTimeout(function(){var j=h.getselectTxt();if(j){e.fire()}else{e.hide()}},20)});b("#J_SelectionShare").live("mousedown",function(){var i=h.getselectTxt();if(i.length>100){i=i.slice(0,100)}if(i){b("#J_SelectionShare a").each(function(){var j=b.trim(b(this).attr("href").replace(/(title=)(.*?)(&|$)/gi,"$1"+i+"(具体内容请查看链接)$3")).replace(/\n|\r/gi,"");b(this).attr({title:i,href:j})})}else{e.hide();return false}})}};dshop.mods.selectshare=d})})(window,document,jQuery);