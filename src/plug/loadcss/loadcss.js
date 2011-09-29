/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20110929
 * @fileoverview 弥补jquery无法动态加载css的功能
 */
(function(W,$){
  
    dshop.add('loadcss',function(){
        
        var loadcss=function(list){
          function insertone(link){
            var link=$('<link>').attr({
					      type:'text/css',
					      rel:'stylesheet',
					      href:link+'?t='+new Date().valueOf()+'.css'
				      });
            $('head').prepend(link);   
          };
         if(typeof list == 'string'){
           insertone(list);
          }else{
            $.each(list,function(index,val){
                insertone(val);
            });
          }
        };

        dshop.mods['loadcss']=loadcss;
    });

})(window,jQuery);
