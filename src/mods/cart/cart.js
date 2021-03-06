/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20101025
 * @fileoverview 购物车 - 我的购物车，填写核对信息单，提交订单
 */
(function(W, $) {
	dshopmods.add('cart', function() {

		var cart = function() {
      
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
        incatr:function(n,id){
          $.ajax({
            url:'/cart/updatacartgood.ajax',
            data:{
              inc:n.join(','),
              id:id.join(',')
            },
            type:'POST',
            success:function(){
              window.location.href='/order/info';
            },
            error:function(){
              alert('网络原因，请重新提交');
            }
          });
        },
        tableinit:function(){
          $('#J_CartTable .J_removeOne').live('click',function(){
              var input=$(this).closest('td').find('.J_currentSize'),
              val=parseFloat(input.val());
              if(val-1>0){
                input.val(val-1);
                _fn.updateprice(input.val(),this);
              }
          });
          $('#J_CartTable .J_addOne').live('click',function(){
              var input=$(this).closest('td').find('.J_currentSize'),
              val=parseFloat(input.val()),suplus=$(this).closest('td').find('.J_Surplus').val();
              if(val+1<=suplus){
                input.val(val+1);
                _fn.updateprice(input.val(),this);
              }
          });
          $('#J_Goinfo').live('click',function(){
              var narr=[],idarr=[];
              $('#J_CartTable .J_currentSize').each(function(){
                  narr.push($(this).val());
                  idarr.push($(this).attr('data-id'));
                });
              if(narr.length==0 || idarr.length==0){
                alert('购物车里还没有商品');
                return false;
              }
              _fn.incatr(narr,idarr);
              return false;
            });
          $('#J_DeleteAll').live('click',function(){
              var msg='是否全部删除购物车';
              if(confirm(msg)==true){
                $('#J_delForm').submit();
              }
          });
          $('#J_CartTable .J_AppendDesc').each(function(){
              var str=$(this).val();
              if(str!='null' && str!=''){
                $(this).closest('tr').find('.J_CartName').after('<div class="gray1">'+_fn.AppendDescinstant(str)+'</div>');
              }
            })
        },
        updateprice:function(n,node){
          var currentprice=parseFloat($(node).closest('td').find('.J_CurrentPrice').val()),countprice=0;
          $(node).closest('tr').find('.J_onePrice').text(parseFloat((currentprice*n).toFixed(2)));    
          $('.J_onePrice').each(function(){
              countprice+=parseFloat($(this).text());    
          });
          $('#J_CountPrice').text(parseFloat(countprice.toFixed(2)));
        }
      };

			return {
				mycart: {
					init: function() {
            $(function(){
              //初始化
              dshopmods.use('goodsbar',function(){
                var indexgoodsbar=dshopmods.mods.goodsbar.torouse();
              }); 
              _fn.tableinit();
            });
					}
				}
			}
		} ();
		dshopmods.mods.cart = cart;
	});
})(window, jQuery);

