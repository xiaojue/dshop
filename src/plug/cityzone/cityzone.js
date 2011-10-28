/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111008
 * @fileoverview 新版的城市区列表，支持多种data配置和显示模式，分离数据和逻辑
 */
(function(W,$){
    dshop.add('cityzone',function(){
        
        var cityzone=function(config){
          var _config={
            data:dshop.host+'cityzone/data.js',
            datasuccess:null //获得数据之后成功的回调
          };
          $.extend(_config,config);
          
          this.config=_config;
        }

        cityzone.prototype={
            init:function(){
              var that=this,cg=that.config;
                if(that.city && that.zone && cg.datasuccess){
                  cg.datasuccess(cityzone.city,cityzone.zone);
                }
                //获取远程数据,处理数据成obj格式
                $.getScript(cg.data,function(){
                    var city=function(){
                      var temobj={},arr=W.sinapb_arr.split(',');
                      for(var i=0;i<arr.length;i=i+2){
                        temobj[arr[i]]=arr[i+1];
                      }
                      return temobj;
                    }();
                    var zone=function(){
                      var temobj={};
                      for(var i in city){
                        var arr=W.sinaps_arr[i].split(','),temjobj={};
                        for(var j=0;j<arr.length;j=j+2){
                          temjobj[arr[j]]=arr[j+1];
                        }
                        temobj[i]=temjobj;
                      }
                      return temobj;
                    }();
                    that.city=city;
                    that.zone=zone;
                    if(cg.datasuccess) cg.datasuccess(that.city,that.zone);
                });
            }
        }

        dshop.mods['cityzone']=cityzone;
    })
})(window,jQuery)
