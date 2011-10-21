/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20110929
 * @fileoverview 动米网编辑器，这里做中转处理，引入淘宝CDN的编辑器，使用默认配置，不支持多图上传，插入视频等高级功能，暂时是默认基础版本
 * 不能和其他kissy组件共存，bug未修复
 */
(function(W,$){
    dshop.add('editor',function(){
        
        var editor=function(editor){
          kissybase='http://a.tbcdn.cn/s/kissy/1.1.7/??kissy-min.js,uibase/uibase-pkg-min.js,dd/dd-pkg-min.js,overlay/overlay-pkg-min.js,editor/editor-all-pkg-min.js';
          resetbase='http://a.tbcdn.cn/s/kissy/1.1.7/cssreset/reset-min.css',
          editorbase='http://a.tbcdn.cn/s/kissy/1.1.7/editor/theme/base-min.css',
          lt8='http://a.tbcdn.cn/s/kissy/1.1.7/editor/theme/cool/editor-pkg-sprite-min.css',
          gte8='http://a.tbcdn.cn/s/kissy/1.1.7/editor/theme/cool/editor-pkg-min-datauri.css';
        
          var styleIsLoad=false,kissyIsLoad=false;

          function initstyle(){
            if(!styleIsLoad){
                dshop.mods['loadcss'](resetbase);
                dshop.mods['loadcss'](editorbase);
                if($.browser.msie && $.browser.version<8){
                  dshop.mods['loadcss'](lt8);
                }else{
                  dshop.mods['loadcss'](gte8);
                }
              styleIsLoad=true;
            };
          };
         
          function initkissy(callback){
            initstyle();
            if(!kissyIsLoad){
              $.getScript(kissybase,callback);
              kissyIsLoad=true;
            }else{
              callback();
            }
          }

          return {
              init:function(textarea){
                initkissy(function(){
                    $(function(){
                        var base = 'http://a.tbcdn.cn/s/kissy/1.1.7/';
                            KISSY.Config.base = base;
                            var KE = KISSY.Editor;
                            KE.Config.base = base + "editor/plugins/";                            
                      W[editor]=new KE(textarea,{
                          attachForm:true,
                          baseZIndex:10000,
                          pluginConfig:{
                              "image":{
                                upload:{
                                  serverUrl:'some.jsp',
                                  surfix:"png,jpg,jpeg,gif",
                                  fileInput:"Filedata",
                                  sizeLimit:5000
                                }
                              },
                              "resize":{
                                direction:["y"]
                              }
                          }
                        }).use("elementpaths,"+
                            "sourcearea,preview," +
                            "undo,separator," +
                            "removeformat,font,format,color," +
                            "list,indent," +
                            "justify,link," +
                            "image");
                    });
                });
              }
          }
        };

        dshop.mods['editor']=editor;
    }); 
})(window,jQuery);
