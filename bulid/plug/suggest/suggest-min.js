(function(a,b){dshop.add("suggest",function(){var c;var d=function(g){var e=function(){dshop.KISSYLOAD=true;if(!d.core){var h="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js";b.getScript(h,function(){f()})}else{setTimeout(function(){if(d.core){g(d.core,KISSY)}else{e()}},1)}};function f(){var h="http://a.tbcdn.cn/s/kissy/1.2.0/";KISSY.Config.base=h;KISSY.use("suggest",function(i){d.core=i.Suggest;g(d.core,i)})}if(!dshop.KISSYLOAD){e()}else{c=setInterval(function(){if(a.KISSY){f();clearInterval(c)}},500)}};dshop.mods.suggest=d})})(window,jQuery);