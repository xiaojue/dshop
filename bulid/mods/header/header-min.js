(function(a,b){dshopmods.add("header",function(){var c=function(){return{greetbar:function(){dshop.use("cookie",function(){var d=dshop.mods.cookie("ATsport"),e="";if(d){e='hi,您已登陆健身商城<a href="#" class="red">退出</a>'}else{e='你好，欢迎光临健身商城<a href="#" class="red">登录</a><span class="gray">|</span><a href="#" class="red">注册</a>'}b("#J_Greetbar").html(e)},["template"])},menuinit:function(){b("#J_MyShop").hover(function(){b(".mid_mall").addClass("hover");b(".mall_on").show()},function(){b(".mid_mall").removeClass("hover");b(".mall_on").hide()});b("#J_ShopCart").hover(function(){b("#J_ShopCart").addClass("hover1");b(".shop_on").show()},function(){b("#J_ShopCart").removeClass("hover1");b(".shop_on").hide()});b("#J_Nav").hover(function(){b("#J_Nav").addClass("hover2");b(".mall_nav").show()},function(){b("#J_Nav").removeClass("hover2");b(".mall_nav").hide()})},favorite:function(){b("#J_Favorite").click(function(){dshop.use("favorite",function(){dshop.mods.favorite("动米网健身商城","http://shop.idongmi.com/")})})},searchinit:function(){var d="请输入商品的名称";b("#J_Search").focus(function(){var e=b.trim(b(this).val());if(e==d){b(this).val("")}}).blur(function(){var e=b.trim(b(this).val());if(e==""){b(this).val(d)}});dshop.use("suggest",function(){dshop.mods.suggest(function(h,g){var f="http://dev.idongmi.com/api/suggestAjax.jsp?max=10";var e=new h("#J_Search",f,{queryName:"key",callbackFn:"callback"});e.on("dataReturn",function(){this.returnedData=this.returnedData.s||[]})})})},shopcart:function(){dshop.use("template",function(){var e='{{#s}}<dl><dt><a href="{{id}}"><img src="{{pic}}" alt="{{name}}" title="{{name}}"></a></dt><dd><div><a class="gray1" href="{{id}}">{{name}}</a></div><div class="st"><a href="{{id}}">删除</a>¥<font>{{price}}</font></div></dd></dl>{{/s}}<div class="shop_set"><input type="button" class="mall">购物车中共有 {{count}} 件商品</div>';function d(){var g={count:0,s:[]};console.log(dshop.mods.template);var f=dshop.mods.template.to_html(g,e);b("#J_ShopCartWrap").html(f)}b.ajax({url:"xxx.jsp",datatype:"jsonp",jsonpCallback:"callback",jsonp:"callback",data:{},success:function(g){var f=dshop.mods.template.to_html(g,e);b("#J_ShopCartWrap").html(f)},timeout:5000,error:d})})},init:function(){var d=this;b(function(){d.greetbar();d.menuinit();d.favorite();d.shopcart();if(b("#J_Search").length!=0){d.searchinit()}})}}}();dshopmods.mods.header=c})})(window,jQuery);