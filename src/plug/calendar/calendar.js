/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20110930
 * @fileoverview 日历组件，借用yui3的日历功能。yui3里的日历api地址：
 * http://yuilibrary.com/yui/docs/api/classes/Calendar.html
 */
(function(W,$){
    dshop.add('calendar',function(){
        
        var calendar=function(callback){

          var that=this;
         //先载入yui3的资源 
          function loadyuicalendar(){
            if(!calendar.loaded){
                calendar.loaded=true;
                var yuimin='http://yui.yahooapis.com/3.4.1/build/yui/yui-min.js';
                $.getScript(yuimin,function(){
                    yuicalendar();
                  });
            }else{
              setTimeout(function(){
                if(calendar.core) callback(calendar.core);
                else loadyuicalendar();
              },1);
            }
          }
          
          function yuicalendar(){
            YUI().use('calendar','datatype-date',function(Y){
                calendar.core=Y.Calendar;
                callback(calendar.core);
            });
          }
          
          loadyuicalendar();

        };

        calendar.loaded=false;

        dshop.mods['calendar']=calendar;
    });
})(window,jQuery);
