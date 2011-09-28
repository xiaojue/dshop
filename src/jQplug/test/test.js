(function(W,$,shop){
    shop.add('test',function(){
      var test=function(){
         shop.mods.test2();
         shop.mods.test3();
      }
      shop.mods['test']=test;
    });
})(window,jQuery,dshop)
