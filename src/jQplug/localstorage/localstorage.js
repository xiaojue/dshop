/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20110929
 * @fileoverview 实现本地存储的一个通用类-IE6/7使用userdata,其他浏览器使用html5的storage,没有clear事件，过期时间均为60天。
 */
(function(W,$){
  
    dshop.add('localstorage',function(){

        var localstorage=function(){
          //检查是否支持html的storage
          var isSupportstorage=function(){
            try{
              return 'localStorage' in window && window['localStorage'] !== null;
            }catch(e){
              return false;
            }
          },memory;

          if(!isSupportstorage){
            memory=document.createElement('div');
            memory.style.cssText='display:none;behavior:url("#default#userData")';
            memory.expires=new Date(new Date().getTime()+(5184000*1000)).toUTCString();
            document.body.appendChild(memory);
            memory.load('UserDataStorage'); 
          }
          
          function setitem(key,value){
            if(isSupportstorage){
              localStorage.setItem(key,value);
            }else{
              memory.setAttribute(key,value);
              memory.save('UserDataStorage');
            }
          }

          function getitem(key){
            if(isSupportstorage){
              return localStorage.getItem(key);
            }else{
              return memory.getAttribute(key) || null;
            }
          }

          function removeitem(key){
            if(isSupportstorage){
              localStorage.removeItem(key);
            }else{
              memory.removeAttribute(key);
              memory.save('UserDataStorage');
            }
          }

          function renameitem(key,newname){
              var val=getitem(key);
              removeitem(key);
              setitem(key,val);
          }

          //对外暴露的统一接口
            return {
              set:setitem,
              get:getitem,
              remove:removeitem,
              rename:renameitem,
              _clear:function(){
                if(isSupportstorage) localStorage.clear(); //针对localstorage清空，似有
              },
              _isSupport:isSupportstorage //似有，检测是否支持localstorage
            }

          }();

        dshop.mods['localstorage']=localstorage;
    });

})(window,jQuery)
