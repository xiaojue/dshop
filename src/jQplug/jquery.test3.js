(function(W,$,shop){
  
    shop.add('test3',function(){
       var test3=function(){
         console.log('test3');
       }
       shop.mods['test3']=test3;
     });   

})(window,jQuery,dshop);

