/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111026
 * @fileoverview 我的商城 - 退换货页面的交互 back.jsp
 */
(function(W, $) {
	dshopmods.add('toback', function() {
		var toback = function() {
			var _fn = {
				createSelectDom: function(node, index, size) {
					_fn.createSizeInput(node, size);
					_fn.createSelect(node, index);
				},
				createSizeInput: function(e, size) {
					var tep = '<div class="barter_text"><input type="button" style="width:15px;height:15px;font-size:12px;color:#666;" class="J_removeOne" value="-">' + '<input type="text" class="J_currentSize" readonly="readonly" style="width:50px;height:22px;margin:0 10px;border:#ccc solid 1px;font-size:12px;color:#666;" value="' + size + '">' + '<input type="button" style="width:15px;height:15px;font-size:12px;color:#666;" class="J_addOne" value="+"></div>';
					$(e).parent().append(tep);
				},
				createSelect: function(e, index) {
					try {
						var alltype = eval($('#J_AllSelectVal').val()); //是一个数组形式的字符串
					} catch(e) {
						alert($('#J_AllSelectVal').val());
						alert(e);
					}
					var html = '',
					oldData = $(e).siblings('.J_oldData').val();
					if (oldData != "") {
            var oldObject={};
            oldData=oldData.split(',');
            for(var d=0;d<oldData.length;d++){
              var temp=oldData[d].split(':');
              oldObject[temp[0]]=temp[1];
            };

						for (var i in alltype[index]) {
							for (var j = 0; j < alltype[index][i].length; j++) {
								var types = alltype[index][i][j];
								for (var k in types) {
									html += '<div class="barter_text">更换' + k + ':<select>' + (function() {
										var option = '';
										for (var t = 0; t < types[k].length; t++) {
                      if(oldObject.hasOwnProperty(k) && oldObject[k]==types[k][t]){
                        option += '<option value="' + types[k][t] + '" selected="selected">' + types[k][t] + '</option>';
                      }else{
                        option += '<option value="' + types[k][t] + '">' + types[k][t] + '</option>';
                      }
											
										}
										return option;
									})() + '</select></div>';
								}
							}
						};
					};
					$(e).parent().append(html);

				},
        createReasonDom:function(target,data){
          var that=this,ulhtml='<ul>';
           $.each(data,function(k,v){
               ulhtml+='<li><label><input type="radio" value="'+k+'" name="reasonTitle">'+k+'</li></label>';  
               var liststr='';
               for(var i=0;i<v.length;i++){
                 liststr+='<option value="'+v[i]+'">'+v[i]+'</option>';
               };
               that._listobj[k]=liststr;
           });
         ulhtml+='</ul>';
         var selecthtml='<select id="J_reasonList" size="9"></select>';
         $(target).html(ulhtml+selecthtml);
         var firstkey=$('input[name="reasonTitle"]:first').attr('checked','checked').val();
         $('#J_reasonList').html(that._listobj[firstkey]);
        },
				bindEvent: function() {
          var that=this;
					$('.J_SelectBtn').live('click', function() {
						var size = $(this).parent().find('.J_Count').val(),
						index = $(this).closest('.barter_list').index('.barter_list');
						$(this).hide();
						_fn.createSelectDom(this, index, size);
					});
					$('.J_addOne').live('click', function() {
						var size = $(this).siblings('.J_currentSize'),
						s = parseInt(size.val());
						size.val(s + 1);
					});
					$('.J_removeOne').live('click', function() {
						var size = $(this).siblings('.J_currentSize'),
						s = parseInt(size.val());
						if (s - 1 > 0) size.val(s - 1);
					});
        $('input[name="reasonTitle"]').live('click',function(){
            $('#J_reasonList').html(that._listobj[this.value]);
          });
				}
			};

			return {
				init: function() {
					this._bindEvent();
				},
        _listobj:{},
        _bindEvent:_fn.bindEvent,
        bulidReason:_fn.createReasonDom
			}
		} ();
		//<input type="hidden" value="<%=goods.getGoodsCount()%>" class="J_Count">
		dshopmods.mods['toback'] = toback;
	});
})(window, jQuery);

