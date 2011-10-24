/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111020
 * @fileoverview 商品评论模块
 */
(function(W, $) {
	dshopmods.add('detailcomment', function() {
		var comment = function() {

			var Goods = GLOBAL_GOODS || {},
			isInit, isRealputs, 
			Mydetailcomment,oneget=true;

			var _fn = {
				postdata: function(id, pageNo) {
          if(oneget){
            oneget=false;
            $.getScript('http://dshop.idongmi.com/hudong/getComments.json?gid=' + id + '&pageNo=' + pageNo + '&callback=idmjsonp.detailcomment&t='+new Date().valueOf(),function(){
                  oneget=true;
              });
          }
				},
				cratestar: function(starlevel) {
					var sl = Math.floor(parseFloat(starlevel)),
					baseurl = 'http://s2.ifiter.com/dianshang/static/images/',
					starfull = baseurl + 'dxing1.png',
					starhalf = baseurl + 'dxing1a.png',
					stargrey = baseurl + 'dxing2.png',
					returnhtml = '';
					for (var i = 1; i <= 5; i++) {
						if (i <= sl) {
							src = starfull;
						}
						if (i > sl) {
							src = stargrey;
						}
						if (i == sl + 1 && starlevel % i >= 0.5) {
							src = starhalf;
						}
						returnhtml += '<img src="' + src + '" alt="星级"/>';
					}
					return returnhtml;
				},
				initcomment: function(wrap) {
					wrap.append('<div id="J_AJAXCOMMENT" class="consult_cont"></div>');
					dshop.use('paging', function() {
						var isInitComment;
						idmjsonp.detailcomment = function(data) {
							if (!isInitComment) {
								isInitComment = true;
                function changecls(current){
                 $('#J_COMMENTPAG a').removeClass('active');
                 $('#J_COMMENTPAG a:contains('+current+')').addClass('active');     
                }
                Mydetailcomment = new dshop.mods.paging({
									wrap: '#J_COMMENTPAG',
									prevfn: function(current) {
										_fn.postdata(Goods.id, current - 1);
                    changecls(current-1);
									},
									nextfn: function(current) {
										_fn.postdata(Goods.id, current + 1);
                    changecls(current+1);
									},
									sizeclick: function(current) {
										_fn.postdata(Goods.id, current);
                    changecls(current);
									}
								});
								var htmls = data.s,
								htmlret = '';
								for (var i = 0; i < htmls.length; i++) {
									htmlret += htmls[i]['html'];
								};

								var starlevel = '<div class="assess_grade"><span>所有打分及评价均来自已购买本商品用户</span> <p id="J_Stars"></p><font>{{starlevel}}</font>分 ({{count}}个用户参与评价)</div>';

								var starobject = {
									starlevel: data.Star,
									count: data.Count
								};

								starlevel = dshop.mods.template.to_html(starlevel, starobject);

								htmlret = starlevel + '<div id="J_CommentWarp">' + htmlret + '</div><div id="J_COMMENTPAG"></div>';

								$('#J_AJAXCOMMENT').html(htmlret);

								$('#J_Stars').html(_fn.cratestar(data.Star));

								Mydetailcomment.setattr('count', data.Count);
								Mydetailcomment.setattr('onepagesize', 10); //10个一页
								Mydetailcomment.init();
							}else{
                //非初始化的翻页回调
                var htmls=data.s,htmlret='';
                for(var i = 0; i < htmls.length; i++){
                 	htmlret += htmls[i]['html'];
                };
                $('#J_CommentWarp').html(htmlret);
                Mydetailcomment.setattr('count', data.Count);
                Mydetailcomment.rebuild(data.Count,data.pageNo);
              }
              $('.assess_list:odd').addClass('assess_two');
							$('.assess_list:last').addClass('last').removeClass('assess_two');
              //清loading
              $('#J_detailLoading').hide();
						};

						_fn.postdata(Goods.id, 1);
						isRealputs = true;
						_fn.toggle(wrap);
					},
					['template']);
				},
				toggle: function(wrap) {
					wrap.children('div').hide();
					$('#J_AJAXCOMMENT').show();
				}
			}

			return {
				toview: function(wrap) {
					if (isInit && isRealputs) {
						_fn.toggle(wrap);
					} else {
						_fn.initcomment(wrap);
						isInit = true;
					}
				}
			}
		} ();
		dshopmods.mods['detailcomment'] = comment;
	});
})(window, jQuery)

