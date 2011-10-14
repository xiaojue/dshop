/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111014
 * @fileoverview 动米网商城头部吊顶
 */
(function(W,$){
    dshopmods.add('header',function(){
      var header=function(){
          return {
            greetbar:function(){
              dshop.use('cookie',function(){
                  var user=dshop.mods.cookie('ATsport'),
                  bar='';
                  if(user){
                    bar = 'hi,您已登陆健身商城<a href="#" class="red">退出</a>';
                  }else{
                    bar = '你好，欢迎光临健身商城<a href="#" class="red">登录</a><span class="gray">|</span><a href="#" class="red">注册</a>'
                  };
                  $('#J_Greetbar').html(bar);
              },['template']);
            },
            menuinit:function(){
              dshop.use('imgctrler',function(){
                $('#J_MyShop').hover(function(){
                  $('.mall_on').show();
                },function(){
                  $('.mall_on').hide();
                });
              });
              
            },
            init:function(){
              $(function(){

              }); 
            }
          }
      }();

      dshopmods.mods['header']=header;

    });
})(window,jQuery);
