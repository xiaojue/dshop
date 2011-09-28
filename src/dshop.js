/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20110928
 * @fileoverview 商城部分种子文件,整个结构按照mods和plug两个部分组成，plug放置写好的jquery扩展，通过dshop进行依赖处理
 * 并且按照固定的方式引入与书写。mods放置不同的具体项目文件，可以单独引入一个mod，也可以使用list方法，引入多个mods.建议
 * 使用异步引入，让ui无阻塞,本文件也提供debug功能，在url中包含debug字眼，即可引入非min的文件，并且支持本地调试，请先用fiddler
 * 代理这个文件，修改你的ip地址与本地项目路径……
 * ps:鉴于时间紧，项目多，商城项目允许引入第三方编写的jquery插件，但是在引入之前，需要review code，并且修改加载和应用时的接口。
 * 统一的jquery插件，和模块化的mods，也可以被社区所引用和调用，届时会在gm/seed.js中体现，社区的widget，tools，apps同样也可以被
 * 商城所调用。
 * 社区里如果需要增加tools，不建议再在tools文件夹中新增，直接扩展到jqplug中，供所有人使用
 *
 * bulid.bat和bulid.xml是打包文件和脚本，本地需要安装ant和java，还有yuicompress,建议本地使用git管理自己的项目和分支。
 * 自测无误后再提交svn到测试机测试，之后没问题了再发布上线。
 */
(function(W,$){
    
    var dshop={};

    dshop.queue=[];
    dshop.queueflg=false;
    dshop._mods={};
    dshop.mods={};
    dshop.plug='http://localhost/idmstatic/js/dshop/src/jQplug/';
    
    dshop.add=function(name,mod){
      if(dshop._mods.hasOwnProperty(name)) return;
      dshop._mods[name]=mod;
    }

    dshop.use=function(name,callback,required){
      var canbeuse=false,T1,T2;
      if(required){
        for(var i=0;i<required.length;i++){
          var requiredname=required[i],
              requiredfile=dshop.plug+'jquery.'+requiredname+'.js';
              if(dshop._mods.hasOwnProperty(requiredname)) continue;
              (function(j,l,name){
                 $.getScript(requiredfile,function(){
                    dshop.queue.push(dshop._mods[name]);
                    if(j==l) dshop.queueflg=true;
                 });
              })(i,required.length-1,requiredname)
        }

         T1=setInterval(function(){
          if(dshop.queueflg){
            clearInterval(T1);
            dshop.queueflg=false;
             for(var i=0;i<dshop.queue.length;i++) dshop.queue[i]();
             dshop.queue=[];
             canbeuse=true;
            }
          },100);
      }else{
        canbeuse=true;
      }
      if(dshop.mods.hasOwnProperty(name)){
        callback();
      }else{
        var file=dshop.plug+'jquery.'+name+'.js';
        T2=setInterval(function(){
          if(canbeuse){
            clearInterval(T2)
            $.getScript(file,function(){
                dshop._mods[name]();
                callback();
                dshop._mods={};
            });
          }
        },100);
      }
    };

    W.dshop=dshop;

})(window,jQuery);

dshop.use('test',function(){
    console.log('end')
    dshop.mods.test();
    dshop.use('test',function(){
        console.log('retest')
      })
    dshop.use('test2',function(){
        console.log('retest2');
      })
    dshop.use('test3',function(){
        console.log('retest3');
      },['test','test2'])
},['test3','test2']);

