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
				detailtab: function() {
					$('#J_DetailTab>li').click(function() {
						$('#J_DetailTab>li').removeClass('curr');
						$(this).addClass('curr');
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
					_fn.picgroup();
					_fn.shareinit();
					_fn.detailtab();
					_fn.info($('#J_DetailContent')); //初始化先加载info内容
				}
			}
		} ();
		dshopmods.mods['detail'] = detail;
	});
})(window, jQuery);

