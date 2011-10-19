/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111014
 * @fileoverview 商城首页主要交互模块
 */
(function(W, $) {
	dshopmods.add('index', function() {
		var index = function() {
			var _fn = {
				initNav: function() {
					var T;
					$('#J_AllNav>li').bind('mouseenter', function() {
						clearTimeout(T);
						$('#J_AllNav>li').removeClass('active');
						$('.sub_column').hide();
						$(this).addClass('active');
						$(this).find('.sub_column').show();
					}).bind('mouseleave', function() {
						var that = this;
						T = setTimeout(function() {
							$(that).removeClass('active');
							$(that).find('.sub_column').hide();
						},
						100);
					});
					$('#J_AllNav>li>a').bind('mouseenter', function() {
						clearTimeout(T);
					});
					$('.sub_column').bind('mouseenter', function() {
						clearTimeout(T);
						$(this).closest('li').addClass('active');
						$(this).show();
					}).bind('mouseleave', function() {
						var that = this;
						T = setTimeout(function() {
							$(that).closest('li').removeClass('active');
							$(that).hide();
						},
						100);

					});
				},
				indexfoucs: function() {
					dshop.use('carousel', function() {
						var imgloader = new dshop.mods.imgloader('.J_loader', function() {
                var N=function(i){
                  var cls='';
                  if(i==1) cls='active';
                  return '<a href="javascript:void(0);" class="'+cls+' mall">'+i+'</a>';
                };
              $('#J_IndexFoucs img').each(function(index){
                  $('#J_IndexFoucsSize').append(N(index+1));
                });
							var indexfoucs = new dshop.mods.carousel({
								wrap: '#J_IndexFoucs',
								wrapitem: '.J_Indexitem',
								before: function(index) {
									$('#J_IndexFoucsSize>a').removeClass('active');
									$('#J_IndexFoucsSize>a').eq(index).addClass('active');
								},
								auto: true
							});
							var T;
							$('#J_IndexFoucsSize>a').bind('mouseenter', function() {
								var that = this;
								T = setTimeout(function() {
									var index = $(that).index();
									indexfoucs.to(index);
									$(that).addClass('active');
								},
								300);
								indexfoucs.stopauto();
							}).bind('mouseleave', function() {
								clearTimeout(T);
							});
							$('#J_IndexFoucs').bind('mouseenter', function() {
								indexfoucs.stopauto();
							});
							$('#J_IndexFoucsSize').bind('mouseleave', function() {
								indexfoucs.auto();
							});
						});
          imgloader.init();
					},['imgloader']);
				},
				indexscroll: function() {
					dshop.use('carousel', function() {
            var lazyhelp=new dshop.mods.lazyload();
						var indexscroll = new dshop.mods.carousel({
							wrap: '#J_IndexScroll',
							wrapitem: '.ScrollItem'
						});
						$('#J_leftCol').click(function() {
							indexscroll.backward();
              var current=indexscroll.getcurrent();
              lazyhelp.drawimg('.ScrollItem:eq('+current+') img');
						});
						$('#J_rightCol').click(function() {
							indexscroll.forward();
              var current=indexscroll.getcurrent();
              lazyhelp.drawimg('.ScrollItem:eq('+current+') img');
						});
					},['lazyload']);
				},
				lazyloadinit: function() {
					dshop.use('lazyload', function() {
						var indexlazyload = new dshop.mods.lazyload({
							auto: true
						});
						indexlazyload.init();
					});
				},
        goodsbarinit:function(){
          dshopmods.use('goodsbar',function(){
              var indexgoodsbar=dshopmods.mods.goodsbar.torouse();
          });
        }
			};
			return {
				init: function() {
					_fn.initNav();
					_fn.indexfoucs();
					_fn.indexscroll();
					_fn.lazyloadinit();
          _fn.goodsbarinit();
				}
			}
		} ();
		dshopmods.mods['index'] = index;
	});
})(window, jQuery);

