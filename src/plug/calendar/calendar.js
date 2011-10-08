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
          function loadcalendar(){
            if(!calendar.loaded){
                calendar.loaded=true;
                var kissymin='http://a.tbcdn.cn/s/kissy/1.1.7/kissy-min.js';
                $.getScript(kissymin,function(){
                    kissycalendar();
                  });
            }else{
              setTimeout(function(){
                if(calendar.core) callback(calendar.core);
                else loadcalendar();
              },1);
            }
          }
          
          function kissycalendar(){
            dshop.mods['loadcss'](dshop.host+'calendar/base-min.css');
            var base = 'http://a.tbcdn.cn/s/kissy/1.1.7/';
            KISSY.Config.base = base;
            KISSY.use('calendar',function(S){
                calendar.core=S.Calendar;
                callback(calendar.core,S);
            });
          }
          
          loadcalendar();

        };

        calendar.loaded=false;

        dshop.mods['calendar']=calendar;
    });
})(window,jQuery);
