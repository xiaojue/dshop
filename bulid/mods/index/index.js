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
					$('#J_AllNav>li').bind('mouseenter', function() {
						$(this).addClass('active');
						$(this).find('.sub_column').show();
					}).bind('mouseleave', function() {
						$(this).removeClass('active');
						$(this).find('.sub_column').hide();
					});
					$('.sub_column').bind('mouseenter', function() {
						$(this).closest('li').addClass('active');
						$(this).show();
					}).bind('mouseleave', function() {
						$(this).closest('li').removeClass('active');
						$(this).hide();
					});
				},
				indexfoucs: function() {
					dshop.use('carousel', function() {
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
							T = setTimeout(function(){
								var index = $(that).index();
								indexfoucs.to(index);
								$(that).addClass('active');
							},300);
							indexfoucs.stopauto();
						}).bind('mouseleave',function() {
							clearTimeout(T);
						});
          $('#J_IndexFoucs').bind('mouseenter',function(){
              indexfoucs.stopauto();
            });
          $('#J_IndexFoucsSize').bind('mouseleave',function(){
              indexfoucs.auto();
            });
					});
				},
        indexscroll:function(){
          dshop.use('carousel',function(){
            var indexscroll=new dshop.mods.carousel({
              wrap:'#J_IndexScroll',
              wrapitem:'.ScrollItem'
            });
          $('#J_leftCol').click(function(){
              indexscroll.backward();
            });
          $('#J_rightCol').click(function(){
              indexscroll.forward();
            });
          });
        },
        lazyloadinit:function(){
          dshop.use('lazyload',function(){
             var indexlazyload=new dshop.mods.lazyload({
                 auto:true
               });
             indexlazyload.init();
          });
        }
			};
			return {
				init: function() {
					_fn.initNav();
					_fn.indexfoucs();
          _fn.indexscroll();
          _fn.lazyloadinit();
				}
			}
		} ();
		dshopmods.mods['index'] = index;
	});
})(window, jQuery);

