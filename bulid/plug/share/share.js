/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111009
 * @fileoverview 分享到各大网站分享条的渲染脚本 :依赖loadcss和template
 */
(function(W,$){
    dshop.add('share',function(){
        var share=function(node,cg){
            var _cg={
              size:14,
              pic:'',
              url:W.location.href,
              title:$('title').text(),
              _cls:'J_Share',
              order:['tsina','qzone','tqq','renren','douban','kaixin','taojianghu','baidu','msn','souhu','tsouhu','buzz','s139','w51'],
              list:{
                "tsina" : ["新浪微博","http://v.t.sina.com.cn/share/share.php?title={{T}}&url={{U}}&pic={{P}}"],
			          "taojianghu" : ["淘江湖","http://share.jianghu.taobao.com/share/addShare.htm?url={{U}}&title={{T}}&_input_charset=gbk"],
			          "qzone" : ["QQ空间","http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{U}}&title={{T}}"],
			          "tqq" : ["腾讯微博","http://v.t.qq.com/share/share.php?title={{T}}&url={{U}}&site=www.idongmi.com&pic={{P}}"],
			          "msn" : ["msn","http://mail.live.com/secure/start?action=compose&subject={{T}}&body={{U}}"],
			          "renren" : ["人人网","http://share.renren.com/share/buttonshare.do?link={{U}}&title={{T}}"],
			          "kaixin" : ["开心网","http://www.kaixin001.com/repaste/bshare.php?rtitle={{T}}&URL={{U}}"],
			          "baidu" : ["百度空间","http://apps.hi.baidu.com/share/?title={{T}}&url={{U}}"],
			          "buzz" : ["谷歌buzz","http://www.google.com/buzz/post?hl=zh-CN&url={{U}}"],
			          "souhu" : ["搜狐白社会","http://bai.sohu.com/share/blank/addbutton.do?title={{T}}&link={{U}}"],
			          "s139" : ["139说客","http://wz.csdn.net/storeit.aspx?t={{T}}&u={{U}}"],
			          "douban" : ["豆瓣","http://www.douban.com/recommend/?title={{T}}&url={{U}}&v=1&sel="],
			          "tsouhu" : ["tsouhu","http://t.sohu.com/third/post.jsp?&url={{U}}&title={{T}}&content=utf-8&pic={{P}}"],
			          "w51" : ["51","http://share.51.com/share/share.php?type=8&title={{T}}&vaddr={{U}}"]
              }
            }
            if(cg) $.extend(_cg,cg);
            this.target=node;
            this.config=_cg;
            //载入样式文件
            if(!share.cssloaded){
              dshop.mods['loadcss'](dshop.host+'share/share-min.css');
              share.cssloaded=true;
            }

        }

        share.cssloaded=false;

        share.prototype={
          draw:function(target){
            var that=this,cg=that.config,
                A='<a href="{{U}}" target="_blank" class="{{C}}" title="{{T}}"></a>',Allstr='';
            for(var i=0;i<cg.size;i++){
              var tempobj={
                U:encodeURIComponent(cg.url),
                T:cg.title,
                P:cg.pic
              },
              Aobj={
                U:dshop.mods.template.to_html(cg.list[cg.order[i]][1],tempobj),
                T:cg.list[cg.order[i]][0],
                C:cg.order[i]
              };

              Allstr+=dshop.mods.template.to_html(A,Aobj);
            }
            $(target).addClass(cg._cls).html(Allstr);
          },
          init:function(){
            var that=this,cg=that.config;
            that.draw(that.target);
            //针对腾讯微博做小窗口处理
            $('.tqq').live('click',function(){
              var win=W.open($(this).attr('href'),'分享到腾讯微博','height=540,width=670,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')  
              if(win!=null) return false;
            });
          }
        }
        
        dshop.mods['share']=share;
    });
})(window,jQuery)
