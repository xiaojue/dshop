/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111027
 * @fileoverview 订单核对页面的交互，包含收获地址的局部保存，整个订单的确认提交动作
 */
(function(W, $) {
	dshopmods.add('orderinfo', function() {
		var orderinfo = function() {
			
      var isInitaddress,actionstatus,verifyform;

      var inputtips={
        '#J_Name':'请准确填写真实姓名',
        '#J_Address':'请详细填写区或者镇以及路名和门牌号',
        '#J_CellPhone':'手机和座机必须填一个',
        '#J_Camera':'手机和座机必须填一个'
      };


      var newonehtml=function(cg){
        return '<div class="adress">'+
                            '<label data-phone="'+cg.phone+'" data-mobile="'+cg.mobile+'" data-zip="'+cg.zip+'" data-adress="'+cg.address+'" data-city="'+cg.city+'" data-province="'+cg.province+'" data-name="'+cg.name+'" data-id="'+cg.id+'"><input type="radio" name="address" class="J_ChooseAdr" checked="checked"><span>'+cg.name+'</span><span>'+cg.province+'-'+cg.city+'-'+cg.address+'</span><span>'+cg.zip+'</span></label>'+
                            '<span>'+(cg.mobile || '')+'</span><span>'+(cg.phone || '')+'</span><span></span>'+
                            '[<a class="yellow J_editAdr" href="javascript:void(0);">编辑</a>|<a class="yellow J_delAder" href="javascript:void(0);">删除</a>]'+
                          '</div>';
      }

      var htmltemp=function(id){
              return '<div class="new_adress" id="'+id+'">'+
                                '<div class="newAdress_list ks_clear">'+
                                   '<span><font class="yellow">*</font><label for="J_Name">收货人：</label></span>'+
                                   '<p><input type="text" id="J_Name" value="" data-v="empty:名字不能为空|same:名字不能为空:'+inputtips['#J_Name']+'|l:名字不能超过6个字:0,6|sp:名字不能含有特殊字符" class="box1 J_verify"></p>'+
                                '</div>'+
                                '<div class="newAdress_list ks_clear">'+
                                    '<span><font class="yellow">*</font><label for="J_City">地区：</label></span>'+
                                    '<p>'+
                                        '<select id="J_City" class="J_verify" data-v="selected:省份/直辖市不能为空"></select>'+
                                        '<select id="J_Zone" class="J_verify" data-v="selected:市/区不能为空"></select>'+
                                    '</p>'+
                                '</div>'+
                                '<div class="newAdress_list ks_clear">'+
                                    '<span><font class="yellow">*</font><label for="J_Address">详细地址：</label></span>'+
                                    '<p><input type="text" id="J_Address" value="" data-v="empty:地址不能为空|same:地址不能为空:'+inputtips['#J_Address']+'|l:详细地址不能超过30个字:0,30|sp:地址不能含有特殊字符" class="box2 J_verify"></p>'+
                                '</div>'+
                                '<div class="newAdress_list ks_clear">'+
                                    '<span><font class="yellow">*</font><label for="J_Zip">邮政编码：</label></span>'+
                                    '<p><input type="text" id="J_Zip" value="" data-v="zip:邮编格式不正确" class="box1 J_verify"></p>'+
                                '</div>'+
                                '<div class="newAdress_list ks_clear">'+
                                    '<span><font class="yellow">*</font><label for="J_CellPhone">手机：</label></span>'+
                                    '<p><input type="text" id="J_CellPhone" value="" class="box1">'+
                                    '<font><label for="J_Camera">座机：</label><input id="J_Camera" type="text" value="" class="box1"></font>'+
                                    '</p>'+
                                '</div>'+
                                '<div class="adress_boutton" style="padding:10px;"><a href="javascript:void(0);" style="margin-left:5px;" id="J_SaveAddress">保存</a> <a href="javascript:void(0);" style="margin-left:5px;" id="J_CancelAddress">取消</a></div>'+
                                '<div id="J_Innererror" class="red"></div>'+
                            '</div>';
                        };


      var _fn = {
        setdefaultinput:function(){
           for(var i in inputtips) $(i).val(inputtips[i]); 
        },
        clearaddress:function(){
          $('#J_Name,#J_Address,#J_Zip,#J_CellPhone,#J_Camera').val("");
        },
        seteditval:function(ele){
          var inputval={
            '#J_Name':ele.attr('data-name'),
            '#J_Address':ele.attr('data-adress'),
            '#J_Zip':ele.attr('data-zip'),
            '#J_CellPhone':ele.attr('data-mobile'),
            '#J_Camera':ele.attr('data-phone')
          };
          for(var i in inputval) $(i).val(inputval[i]);
          var city=ele.attr('data-province'),zone=ele.attr('data-city');
        },
        inputpoint:function(msg,id){
          _fn.setdefaultinput();
          $(id).blur(function(){
              var val=$.trim($(this).val());
              if(val=='' || val ==msg) $(this).val(msg); 
            }).focus(function(){
                var val=$.trim($(this).val());
                if(val==msg) $(this).val('');
            });
        },
        initinput:function(){
          for(var i in inputtips){
            _fn.inputpoint(inputtips[i],i);
          }
        },
				intcityzone: function() {
					dshop.use('cityzone', function() {
						var mycity = new dshop.mods.cityzone({
							datasuccess: function(city, zone) {
                var my39city=['北京','长春','长沙','常州','成都','大连','东莞','佛山','福州','广州','哈尔滨','杭州','呼和浩特','济南','嘉兴','昆明','兰州','南京','南宁','宁波','青岛','上海','深圳','沈阳','石家庄','苏州','太原','唐山','天津','温州','无锡','武汉','西安','厦门','烟台','郑州','重庆','珠海','洛阳'];
								$('#J_City').prepend('<option value="0">省/直辖市</option>');
                $('#J_Zone').append('<option value="0">请选择市/区</option>'); 
								$.each(city, function(k, v) {
									$('#J_City').append('<option value="' + k + '">' + v + '</option>');
								});
                $('#J_City').change(function(){
                    var currnt=$(this).val();
                    $('#J_Zone').html('');
                    if(currnt==0){
                      $('#J_Zone').append('<option value="0">请选择市/区</option>'); 
                      return;
                    }
                    $.each(zone[currnt],function(k,v){
                       if(currnt=='11' || currnt=='12' || currnt=='31' || currnt=='50'){
                          $('#J_Zone').append('<option value="'+k+'">'+v+'</option>');
                          return;
                       }
                       for(var i=0;i<my39city.length;i++){
                         if(my39city[i]==v){ //直辖市
                            $('#J_Zone').append('<option value="'+k+'">'+v+'</option>');
                            break;
                         }
                       };
                    });
                    if($('#J_Zone').children().length==0) $('#J_Zone').append('<option value="0">暂无配送城市</option>');
                });
							}
						});
						mycity.init();
					});
				},
        insertaddress:function(node,callback){
          $('#J_Zone').html("");
          _fn.clearaddress();
          $('#J_City').val(0);
          if(!isInitaddress){
            dshop.use('verify',function(){
              $(node).after(htmltemp('J_AddressWrap'));
              _fn.intcityzone();
              _fn.initinput();
              verifyform=new dshop.mods.verify({
                  target:'#J_SaveAddress',
                  cls:'.J_verify',
                  success:function(){
                    //校验2个可选的值
                    var tel=$('#J_CellPhone').val(),cel=$('#J_Camera').val(),
                        rule=dshop.mods.verify.rule,telisready,celisready;
                        if(rule.phone(tel)) telisready=true;
                        if(rule.tel(cel)) celisready=true; 
                        if(telisready || celisready){
                          if(!telisready) $('#J_CellPhone').val('');
                          if(!celisready) $('#J_Camera').val('');
                           _fn.addressSave();
                           return;
                         };
                        if(!telisready){
                          _fn.showInnererror('手机格式不正确');
                        }else{
                          if(!celisready) _fn.showInnererror('座机电话格式不正确');
                        }
                  },
                  batchcallback:function(val,msg,node){
                     _fn.showInnererror(msg);
                  }
              });
            verifyform.init();
            if(callback) callback();
            });
            isInitaddress=true;   
          }else{
            $('#J_Zone').append('<option value="0">请选择市/区</option>'); 
          }
          $('#J_AddressWrap').insertAfter(node);
          $('#J_AddressWrap').show();
        },
        showInnererror:function(msg){
          $('#J_Innererror').text(msg);
        },
        clearInnererror:function(){
          $('#J_Innererror').text("");
        },
        bindEvent:function(){
          $('.J_ChooseAdr').live('click',function(){
              $('#J_AddressWrap').hide();
          });
          $('#J_CancelAddress').live('click',function(){
              $('#J_AddressWrap').hide();
          });
          $('#J_addDdress').live('click',function(){
              _fn.clearInnererror();
              _fn.insertaddress('#J_addWrap',function(){
                _fn.setdefaultinput();
              });
                _fn.setdefaultinput();
              actionstatus='save';
          });
          $('.J_editAdr').live('click',function(){
              var parent=$(this).closest('.adress');
              _fn.insertaddress(parent,function(){
                _fn.clearInnererror();
                 _fn.seteditval(parent.find('label'));
              });
                _fn.clearInnererror();
                _fn.seteditval(parent.find('label'));
              parent.find('input[type="radio"]').attr('checked','checked');
              actionstatus='update';
          });
          $('.J_delAder').live('click',function(){
              var msg='确认删除该地址吗？',that=this;
              if(confirm(msg)){
                var id=$(that).closest('.adress').find('label').attr('data-id');
                $.ajax({
                  url:'/order/delUserAddress.ajax',
                  data:{
                    id:id
                  },
                  type:'POST',
                  success:function(data){
                    var data=_fn.strtojson(data);
                    if(data.s==1){
                      $(that).closest('.adress').remove();
                    }else{
                      alert(data.msg);
                    }
                  },
                  error:function(){
                    alert('网络超时，请重新删除');
                  }
                });
              }
          });
        },
        strtojson:function(str){
                  try{
                    var data=eval('('+str+')');
                  }catch(e){
                    alert(str);
                    alert(e);
                    return {};
                  }
                  return data;
        },
        addressSave:function(){
              var saveaction={
                save:{
                  url:'/order/addUserAddress.ajax',
                  callback:function(data){
                    var data=_fn.strtojson(data);
                    if(data.s==1){
                      var id=data.id; 
                      $('#J_Adrlist').find('#J_addWrap').before(newonehtml(_fn.getaddressData()));
                      $('#J_AddressWrap').hide();
                    }else{
                      _fn.showInnererror(data.msg);    
                    }
                  }
                },
                update:{
                  url:'',
                  callback:function(){
                    var data=strtojson(data);
                  }
                }
              };
              //这里需要加入统一的校验.update 和save
              $.ajax({
                url:saveaction[actionstatus]['url'],
                type:'POST',
                data:_fn.getaddressData(),
                success:saveaction[actionstatus]['callback'],
                error:function(){
                  alert('网络原因，请再次尝试保存');
                }
              });
        },
        getaddressData:function(){
           var addressData={
             name:$('#J_Name').val(),
             province:$('#J_City').val(),
             city:$('#J_Zone').val(),
             address:$('#J_Address').val(),
             zip:$('#J_Zip').val(),
             mobile:$('#J_CellPhone').val(),
             telephone:$('#J_Camera').val()
           };
           return addressData; 
        }
			};
			return {
				init: function() {
          _fn.bindEvent();
				}
			}
		} ();

		dshopmods.mods['orderinfo'] = orderinfo;
	});
})(window, jQuery);

