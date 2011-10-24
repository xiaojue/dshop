/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111020
 * @fileoverview 商品详情咨询模块
 */
(function(W, $) {
	dshopmods.add('detailrefer', function() {
		var refer = function() {
			var Goods = GLOBAL_GOODS || {},
			isRealputs, isInit, onsget = true,
			Mydetailrefer,oneget=true, _fn = {
        _checksize:function(){
             var max=300,size=$.trim($('#J_ContentArea').val()).length;
                if(size<=300){
                  $('#J_QuestionTips').removeClass('red');
                  $('#J_lessSize').text(max-size);
                }else{
                  $('#J_QuestionTips').addClass('red');
                  $('#J_lessSize').text('0');
                }
                  $('#J_hasSize').text(size);
                  
        },
        inittextarea:function(isLogin){
          if(isLogin){
            var textarea='<div class="consult_list">'+
									'<dl class="question1 ks_clear">'+
										'<dt>问题说明</dt>'+
                    '<dd><textarea rows="" cols="" name="content" id="J_ContentArea"></textarea>'+
											'<div class="question_txt ks_clear">'+
                      '<a id="J_addContent" class="question_button" href="javascript:void(0);">提交问题</a><span id="J_QuestionTips">已输入<span id="J_hasSize"></span>个字，还可以输入<span id="J_lessSize"></span>字。</span></div>'+
                    '</dd>'+
									'</dl>'+
								'</div>';
              
              $('#J_ContentArea').live('keyup',_fn._checksize);
              $('#J_addContent').live('click',function(){
                  var question=$.trim($('#J_ContentArea').val());
                  if(question.length>300) return false; //放入校验
                  $.ajax({
                  url:'/hudong/setAsk.ajax?gid='+Goods.id+'&question='+question,
                  type:'POST',
                  success:function(data){
                    try{
                        var ret=eval('('+data+')');
                        if(ret.s==1){ //成功
                          alert(ret.msg);
                        }else{
                          alert(ret.msg);
                        }
                    }catch(e){
                      alert(e);
                    }
                  },
                  error:function(){
                    alert('网络原因，请求超时，请重试');
                  }
                  });
              });
            return textarea;
          }else{
            return '';
          }
        },
				postdata: function(id, pageNo) {
          if(oneget){
            oneget=false;
            $.getScript('http://dshop.idongmi.com/hudong/getAsks.json?gid=' + id + '&pageNo=' + pageNo + '&callback=idmjsonp.detailrefer&t='+new Date().valueOf(),function(){
                oneget=true;
            });
          }
				},
				initrefer: function(wrap) {
					wrap.append('<div id="J_AJAXREFER"></div>');
					dshop.use('paging', function() {
            var isInitrefer;
						idmjsonp.detailrefer = function(data) {
              if(!isInitrefer){
              isInitrefer=true;
              function changecls(current){
                 $('#J_MYREFERPAG a').removeClass('active');
                 $('#J_MYREFERPAG a:contains('+current+')').addClass('active');     
              } 
              Mydetailrefer=new dshop.mods.paging({
                  wrap:'#J_MYREFERPAG',
                  prevfn:function(current){
                    _fn.postdata(Goods.id,current-1);
                     changecls(current-1);
                  },
                  nextfn:function(current){
                    _fn.postdata(Goods.id,current + 1);
                    changecls(current+1);
                  },
                  sizeclick:function(current,node){
                    _fn.postdata(Goods.id,current);
                     changecls(current);
                    
                  }
                });
							var htmls = data.s,
							htmlret = '';
							for (var i = 0; i < htmls.length; i++) {
								htmlret += htmls[i]['html'];
							}
              htmlret = _fn.inittextarea(data.isLogin)+'<div id="J_ReferWarp">'+htmlret + '</div><div id="J_MYREFERPAG"></div>';
							$('#J_AJAXREFER').html(htmlret);
              _fn._checksize();
              Mydetailrefer.setattr('count',data.Count);
              Mydetailrefer.setattr('onepagesize',10);
              Mydetailrefer.init();
              }else{
                  var htmls = data.s,
							htmlret = '';
							for (var i = 0; i < htmls.length; i++) {
								htmlret += htmls[i]['html'];
							}
              $('#J_ReferWarp').html(htmlret);
              }
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
					$('#J_AJAXREFER').show();
				},
			};

			return {
				toview: function(wrap) {
					if (isInit && isRealputs) {
						_fn.toggle(wrap);
					} else {
						_fn.initrefer(wrap);
						isInit = true;
					}
				}
			}
		} ();
		dshopmods.mods['detailrefer'] = refer;
	});
})(window, jQuery)

