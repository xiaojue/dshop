/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111017
 * @fileoverview 商品详情页面的js,包含右侧4个模块的加载，顶部放大镜和详情信息的初始化
 */
(function(W, $) {
	dshopmods.add('detail', function() {
		var detail = function() {
			var Goods = GLOBAL_GOODS || {};
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
				shopcartinit: function() {
					//先校验是否能加入购物车
					var choosetypes = $('.J_Chosetype'),
					Stock = parseInt($('#J_Stock').text());
					if (choosetypes.length != 0) {
						choosetypes.find('a').live('click', function() {
							$(this).closest('.J_Chosetype').find('a').removeClass('active');
							$(this).addClass('active');
						});
					}
					$('#J_ChoseNum').val(1).keyup(function() {
						var val = $.trim($(this).val());
						if (isNaN(val) || val == "") $(this).val(1);
						if (parseInt(val) > Stock) $(this).val(Stock);
					});
					$('#J_AddShopCart').live('click', function() {
						var valobj = {},
						appendDesc = {},
						typeready = true;
						choosetypes.each(function() {
							var choose = $(this).find('.active');
							if (choose.length == 0) {
								typeready = false;
								return false;
							} else {
								var type = choose.attr('data-type');
								appendDesc[type] = $.trim(choose.text());
							}
						});
						if (typeready) {
							var ChoseNum = $('#J_ChoseNum');
							if (!isNaN(parseInt($.trim(ChoseNum.val())))) ChoseNum.val(parseInt($.trim(ChoseNum.val())));
							var nu = parseInt(ChoseNum.val());
							if (isNaN(nu)) {
								alert('数量必须是数字');
							} else if (nu <= 0) {
								alert('数量不能为负');
							} else if (nu > Stock) {
								alert('对不起，购买数量不能大于库存数');
							} else {
								var isEpt = function(obj) {
									var isEpt = true;
									for (var i in obj) {
										if (i) {
											isEpt = false;
											break;
										}
									}
									return isEpt;
								}
								if (isEpt(appendDesc)) {
									appendDesc = '';
									valobj['appendDesc'] = '';
									valobj['gCount'] = nu;
									_fn.addshopcart(valobj);
								} else {
									dshop.use('json', function() {
										valobj['appendDesc'] = dshop.mods.json.ObjTostr(appendDesc);
										valobj['gCount'] = nu;
										_fn.addshopcart(valobj);
									});
								}
							}
						} else {
							alert('请选择商品的类型');
						}
					});

					$('.J_Backtodeal').live('click', function() {
						$('#J_ShopCartSuccess,#J_FavSuccess').hide();
						$('#J_Deatildeal').show();
					});
					$('#J_GoCart').live('click', function() {
						W.location.href = '/cart/cartlist';
					})
				},
				addshopcart: function(data) {
					data['gid'] = Goods.id;
					$.ajax({
						url: '/cart/savecartgood.ajax',
						data: data,
						type: 'POST',
						success: function(ret) {
							//{"s":1||0,"msg":"","count":0,"countprice":0.0}
							try {
								var data = eval('(' + ret + ')');
							} catch(e) {
								alert(e)
							}
							if (data.s == 1) {
								dshop.use('template', function() {
									var temp = '<div class="scart ks_clear">' + '<div class="scart_l"><span class="mall"></span></div>' + '<div class="scart_r">' + '<div class="scart_tittle">商品已成功加入购物车</div>' + '<div>购物车共有 {{count}}件商品，合计：&yen;{{countprice}}元</div>' + '<div class="scart_but">' + '<input type="button" class="scart_box1 mall J_Backtodeal" value="继续购物">' + '<input type="button" class="scart_box2 mall" value="去结算" id="J_GoCart">' + '</div>' + '</div>' + '</div>';

									temp = dshop.mods.template.to_html(temp, data);

									if ($('#J_ShopCartSuccess').length == 0) {
										$('#J_Deatildeal').after('<div id="J_ShopCartSuccess" class="choose"></div>');
									}
									$('#J_Deatildeal').hide();
									$('#J_ShopCartSuccess').html(temp).show();
                  //更新一下header
                  $.getScript('http://dshop.idongmi.com/cart/getCart.json?callback=idmjsonp.cart&pageNo=1');
								});
							} else {
								alert(data.msg);
							}
						},
						error: function() {
							alert('网络超时，请尝试重新添加购物车');
						}
					});

				},
				favoriteinit: function() {
					$('#J_AddFavorite').live('click', function() {
						$.ajax({
							url: '/hudong/setFavGoods.ajax',
							data: {
								goodsid: Goods.id
							},
							type: 'POST',
							success: function(data) {
								try {
									var ret = eval('(' + data + ')');
								} catch(e) {
									alert(e);
								};
								if (ret.s == 1) {
									dshop.use('template', function() {
										var favtemp = '<div class="scart ks_clear"> <div class="scart1_l"><span class="mall"></span></div> <div class="scart_r"> <div class="scart_tittle">商品已成功加入收藏夹</div> <div>收藏夹中共有{{count}}件商品</div> <div class="scart_but"> <input value="继续购物" class="J_Backtodeal scart_box1 mall" type="button"> </div> </div> </div>';
                    favtemp=dshop.mods.template.to_html(favtemp,ret);
                    if($('#J_FavSuccess').length==0){
                      $('#J_Deatildeal').after('<div id="J_FavSuccess" class="choose"></div>');
                    }
                    $('#J_Deatildeal').hide();
                    $('#J_FavSuccess').html(favtemp).show();
									});
								} else {
									alert(ret.msg);
								}
							},
							error: function() {
								alert('网络原因，请尝试重新收藏');
							}
						});
					});
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
					$('#J_MYREFERPAG a,#J_COMMENTPAG a').live('click', function() {
						_fn.addloading();
					});
				},
				addloading: function() {
					if ($('#J_detailLoading').length == 0) {
						$('#J_DetailContent').append('<div id="J_detailLoading" style="padding:30px;text-align:center;"><img src="http://s1.ifiter.com/static/images/loading.gif" alt="loading"><br/>正在加载数据...</div>');
					} else {
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
          _fn.favoriteinit();
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

