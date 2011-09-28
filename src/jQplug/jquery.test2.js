(function(W,$,shop){
  
    shop.add('test2',function(){
        var test2=function(){
         console.log('test2');
       }
       shop.mods['test2']=test2;
    });   

})(window,jQuery,dshop);
