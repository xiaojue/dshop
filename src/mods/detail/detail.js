/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111017
 * @fileoverview 商品详情页面的js,包含右侧4个模块的加载，顶部放大镜和详情信息的初始化
 */
(function(W, $) {
	dshopmods.add('detail', function() {
		var detail = function() {
			var _fn = {
				picgroup: function() {
					dshop.use('carousel', function() {
						dshop.mods['magnifier'](function(zoom, KISSY) {
							var picgroup = new dshop.mods.carousel({
								wrap: '#J_PicGroup',
								wrapitem: '.J_PicItem'
							});
							$('#J_GroupL').click(function() {
								picgroup.backward();
							});
							$('#J_GroupR').click(function() {
								picgroup.forward();
							});
							var nowpic = $('#J_PicGroup .active>img').attr('data-picy'),
							bigpic = $('#J_PicGroup .active>img').attr('data-picb');
							$('#J_Zoom').html('<img src="' + nowpic + '" width="" height="298" width="298" id="J_Zoompic">');
							var picZoom = new zoom({
								imageNode: '#J_Zoompic',
								align: {
									node: '#J_Zoompic',
									points: ['tr', 'tl'],
									offset: [10, 0]
								},
								bigImageSrc: bigpic
							});

							$('#J_PicGroup li>img').live('click', function() {
								var pic = $(this).attr('data-picy'),
								bpic = $(this).attr('data-picb');
								$('#J_PicGroup li').removeClass('active');
								$('#J_Triangle').remove();
								$(this).parent('li').addClass('active');
								$(this).after('<div id="J_Triangle" class="spec_ico mall"></div>');
								$('#J_Zoompic').attr('src', pic);
								picZoom.set('bigImageSrc', bpic)
							});
						});
					},
					['magnifier', 'loadcss']);
				},
				shareinit: function() {
					dshop.use('share', function() {
						var detailshare = new dshop.mods.share('#J_Share');
						detailshare.init();
					},
					['loadcss', 'template']);
				},
        shopcartinit:function(){
           //先校验是否能加入购物车
           var choosetypes=$('.J_Chosetype'),Stock=parseInt($('#J_Stock').text());
           if(choosetypes.length!=0){
             choosetypes.find('a').live('click',function(){
                 $(this).closest('.J_Chosetype').find('a').removeClass('active');
                 $(this).addClass('active');    
            });
           }
           $('#J_ChoseNum').val(1).keyup(function(){
               var val=$.trim($(this).val());
               if(isNaN(val) || val=="") $(this).val(1);
               if(parseInt(val)>Stock) $(this).val(Stock);
             });
           $('#J_AddShopCart').live('click',function(){
               var valobj={},appendDesc={},typeready=true;
               choosetypes.each(function(){
                    var choose=$(this).find('.active');
                    if(choose.length==0){
                      typeready=false;
                      return false;
                    }else{
                      var type=choose.attr('data-type');
                      appendDesc[type]=$.trim(choose.text());
                    }
                });
                if(typeready){
                  var ChoseNum=$('#J_ChoseNum');
                  if(!isNaN(parseInt($.trim(ChoseNum.val())))) ChoseNum.val(parseInt($.trim(ChoseNum.val())));
                  var nu=parseInt(ChoseNum.val());
                  if(isNaN(nu)){
                    alert('数量必须是数字');
                  }else if(nu<=0){
                    alert('数量不能为负');
                  }else if(nu>Stock){
                    alert('对不起，购买数量不能大于库存数');
                  }else{
                    if(appendDesc.length==0) appendDesc='';
                    valobj['appendDesc']=appendDesc;
                    valobj['gCount']=nu;
                    _fn.addshopcart(valobj);
                  }
                }else{
                  alert('请选择商品的类型');
                }
           }); 
        },
        addshopcart:function(data){
          console.log(data);
        },
        favoriteinit:function(){

        },
				detailtab: function() {
					$('#J_DetailTab>li').click(function() {
						$('#J_DetailTab>li').removeClass('curr');
						$(this).addClass('curr');
            _fn.addloading();
					});
					var wrap = $('#J_DetailContent');
					$('#J_ProductInfo').click(function() {
						_fn.info(wrap);
					});
					$('#J_ProductComment').click(function() {
						_fn.comment(wrap);
					});
					$('#J_ProductRefer').click(function() {
						_fn.refer(wrap);
					});
					$('#J_ProductAfter').click(function() {
						_fn.after(wrap);
					});
          //给分页增加loading
          $('#J_MYREFERPAG a,#J_COMMENTPAG a').live('click',function(){
             _fn.addloading();
            });
				},
        addloading:function(){
          if($('#J_detailLoading').length==0){
            $('#J_DetailContent').append('<div id="J_detailLoading" style="padding:30px;text-align:center;"><img src="http://s1.ifiter.com/static/images/loading.gif" alt="loading"><br/>正在加载数据...</div>');
          }else{
            $('#J_detailLoading').show();
          }
        },
				info: function(wrap) {
					dshopmods.use('detailinfo', function() {
						dshopmods.mods.detailinfo.toview(wrap);
					});
				},
				comment: function(wrap) {
					dshopmods.use('detailcomment', function() {
						dshopmods.mods.detailcomment.toview(wrap);
					});
				},
				refer: function(wrap) {
					dshopmods.use('detailrefer', function() {
						dshopmods.mods.detailrefer.toview(wrap);
					});
				},
				after: function(wrap) {
					dshopmods.use('detailafter', function() {
						dshopmods.mods.detailafter.toview(wrap);
					});
				}
			}
			return {
				init: function() {
          _fn.shopcartinit();
					_fn.picgroup();
					_fn.shareinit();
					_fn.detailtab();
					_fn.info($('#J_DetailContent')); //初始化先加载info内容
          _fn.addloading();
				}
			}
		} ();
		dshopmods.mods['detail'] = detail;
	});
})(window, jQuery);

