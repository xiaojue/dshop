(function(a,b){dshop.add("suggest",function(){var c=function(f){var d=function(){if(!c.core){var g="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js";b.getScript(g,function(){e()})}else{setTimeout(function(){if(c.core){f(c.core,KISSY)}else{d()}},1)}};function e(){var g="http://a.tbcdn.cn/s/kissy/1.2.0/";KISSY.Config.base=g;KISSY.use("suggest",function(h){c.core=h.Suggest;f(c.core,h)})}if(!a.KISSY){d()}else{e()}};dshop.mods.suggest=c})})(window,jQuery);