(function(a){dshop.add("favorite",function(){var b=function(d,c){if(a.sidebar){a.sidebar.addPanel(d,c,"")}else{if(doc.all){a.external.AddFavorite(c,d)}else{if(a.opera&&a.print){alert("浏览器暂不支持直接添加到收藏夹,请使用ctrl+D手动收藏")}}}};dshop.mods.favorite=b})})(window,document);