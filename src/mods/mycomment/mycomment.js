/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111026
 * @fileoverview 商城-我的评价部分
 */
(function(W, $) {
	dshopmods.add('mycomment', function() {
		var mycomment = function() {
      var _fn={
        AppendDescinstant:function(str){
          try{
            var data=eval('('+str+')'); 
          }catch(e){
            alert(e);
          }
          var arr=[];
          $.each(data,function(i,v){
              arr.push(i+':'+v);
          });
          return arr.join(',');
        },
        initstar:function(){
          dshop.use('randerstar',function(){
              var randerid=[],rander=[];
              $('.J_Stars').each(function(){
                  randerid.push($(this).attr('data-id'));
                });
              $.each(randerid,function(i,v){
                  rander[i]=new dshop.mods.randerstar({
                      target:'#J_Stars_'+v,
                      radioname:'star_'+v,
                      eventcallback:function(e){
                        e.find('.J_StarMsg').removeClass('red');
                      }
                  });
                  rander[i].init();
              });
          });
        },
        initAppendDesc:function(){
          $('.J_AppendDesc').each(function(){
              var apd=$(this).attr('data-jsonstr');
              if(apd!='null' && apd!=''){
                var str=_fn.AppendDescinstant(apd);
                $(this).html(str);
              }
          });
        },
        formverify:function(){
          var maxl=300,comml=true;
          $('#comm').submit(function(){
              var radioready=[];
              $('.J_Stars').each(function(i){
                  var radios=$(this).find('input[type="radio"]');
                  radioready[i]='undef';
                  radios.each(function(){
                      var checked=$(this).attr('checked');
                      if(checked=='checked'){
                        radioready[i]="checked";
                      }
                  });
              });
             for(var i=0;i<radioready.length;i++){
                if(radioready[i]!='checked'){
                  $('.J_Stars').eq(i).find('.J_StarMsg').text('请选择星级').addClass('red');
                  alert('请选择星级');
                  return false;
                }
              };
              $('.J_CommTxt').each(function(){
                  var l=$(this).val().length;
                  if(l>maxl){
                    comml=false;
                    return false;
                  }
              });
            
              if(!comml){
                alert('评价不能超过'+maxl+'个字');
                return false;
              }
          });
        var txtless=function(){
            var l=$(this).val().length,num=maxl-l,less=$(this).parent('div').next('div').find('.J_Less');
              if(num<0){
                num=0;
                less.addClass('red');
              }else{
                less.removeClass('red');
              }
                less.text(num);
              
        };
          $('.J_CommTxt').live('keyup',txtless).each(txtless);
        }
      }
			return {
				init: function() {
          _fn.initstar();
          _fn.initAppendDesc();
          _fn.formverify();
				},
        randerjson:function(){
          _fn.initAppendDesc();
        }
			}
		} ();
		dshopmods.mods['mycomment'] = mycomment;
	});
})(window, jQuery);

