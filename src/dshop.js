/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20110928
 * @fileoverview 商城部分种子文件,整个结构按照mods和plug两个部分组成，plug放置写好的jquery扩展，通过dshop进行依赖处理
 * 并且按照固定的方式引入与书写。mods放置不同的具体项目文件，可以单独引入一个mod，也可以使用list方法，引入多个mods.建议
 * 使用异步引入，让ui无阻塞,本文件也提供debug功能，在url中包含debug字眼，即可引入非min的文件，并且支持本地调试，请先用fiddler
 * 代理这个文件，修改你的ip地址与本地项目路径……
 * 社区里如果需要增加tools，不建议再在tools文件夹中新增，直接扩展到jqplug中，供所有人使用
 *
 * bulid.bat和bulid.xml是打包文件和脚本，本地需要安装ant和java，还有yuicompress,建议本地使用git管理自己的项目和分支。
 * 自测无误后再提交svn到测试机测试，之后没问题了再发布上线。
 */
(function(W,$){

    var dependfix=function(host){
      this._queue=[];
      this._queuefn={};
      this.mods={};
      this.host=host;
    };

    dependfix.prototype={
      add:function(name,mod){
        var that=this;  
        if(that._queuefn.hasOwnProperty(name)) return;
        that._queuefn[name]=mod;
      },
      use:function(name,callback,required){
        var that=this;
        if(that._queuefn.hasOwnProperty(name)){
          if(callback) callback(); 
        }else{
          var list=[name];
          if(required) list=list.concat(required);
          for(var i=0;i<list.length;i++){
            var modname=list[i],
            file=that.host+modname+'/'+modname+'.js';
            if(that._queuefn.hasOwnProperty(modname)) continue;
              (function(modname,index){
                $.getScript(file,function(){
                  that._queue[index]=that._queuefn[modname];
                  if(that._queue.length==list.length){
                    for(var j=0;j<that._queue.length;j++){
                      that._queue[j]();
                    }
                    if(callback) callback();
                    that._queue=[];
                  }
                }); 
            })(modname,i);
          }
        }
      }
    }

    var host='http://localhost/idmstatic/js/dshop/src/',
        dshop=new dependfix(host+'plug/'),
        dshopmods=new dependfix(host+'mods/');
    //要用社区的js的时候,直接引这个http://s1.ifiter.com/static/GM/bulid/GM-min.js?t=20110915.js
    //社区里的tools部分会不断重写到plug里
    W.dshop=dshop;
    W.dshopmods=dshopmods;
    //关闭ajax缓存,需要时自行开启，然后再自行关闭
    $.ajaxSetup({
        cache:false
    });
    //加载HTML5.js,如果浏览器为ie则加载
    if($.browser.msie){
      var html5js='http://a.tbcdn.cn/p/fp/2011a/html5.js';
      $.getScript(html5js);
    }
})(window,jQuery);
