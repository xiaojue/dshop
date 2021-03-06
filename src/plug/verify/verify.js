/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20110905
 * @fileoverview 哥实在扛不住了，所以哥决定写一个校验组件 -_-||
 */
(function($, W) {
	dshop.add('verify', function() {

	/**
   * @name GM.widget.verify
   * @class
   * @description 表单校验组件，包含的校验规则存在rule中，自己查看源文件看吧
   * @param {Object} config 配置，详细看源文件……有默认的都写了。
   * @param {Object} rule [accessLevel] 如果有新增的校验或者独特的校验需求，在这里进行增加 
   */
		var verify = function(config, rule) {

			var _config = {
				form: null,
				target: null,
				//form和target只能写一个
				cls: null,
				success: null,
				blur: false,
				batchcallback: null,
				batchafter: null,
				trim: true,
				checktrue: null,
				focusfn: null,
				attrname: 'data-v' //data-v functionname:msg:arg,arg|functionname:msg:arg,arg
			}

			var _rule = {
				empty: function(val) {
					if (val == "") return false;
					return true;
				},
				num: function(val) {
					if (isNaN(val)) return false;
					return true;
				},
				l: function(val, min, max) {
					if (val.length < min || val.length > max) return false;
					return true;
				},
        selected:function(val){
          if(val==0 || val=="" || val==undefined || val==null) return false;
          return true;
        },
				n: function(val, min, max) {
					if (val < min || val > max) return false;
					return true;
				},
        zip:function(val){
          return (/^\d{6}$/).test(val);
        },
				phone: function(val) {
          return (/^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/).test(val);
				},
        tel:function(val){
          return (/^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/).test(val);
        },
				email: function(val) {
					return (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/).test(val);
				},
				equal: function(val, selected) {
					if (val != $(selected).val()) return false;
					return true;
				},
        same:function(val,sameval){
          if(val == sameval) return false;
          return true;
        },
				checked: function(val, node) {
					if (!$(node).attr('checked')) return false;
					return true;
				},
				sp: function(val) {
					var reg = /[\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\,|\s|\\|\||>|<|\?|\/|\;|\:|\"|\'|\{|\}|\[|\]|\`]/g;
					if (val.match(reg)) return false;
					return true;
				}
			}

			$.extend(_config, config);
			$.extend(_rule, rule);

			this.rule = _rule;
			this.config = _config;
			this.data = {};

      dshop.mods.verify.rule=_rule;
		}

		verify.prototype = {
			/**
     * @name GM.widget.verify#init
     * @description 目前对外的结构就只有一个init方法，所有回调和自定义事件都在cfg里体现
     */
			init: function() {
				var that = this,
				cg = that.config;

				if (!cg.cls) return; //cls 钩子必须写
				if ((!cg.form && ! cg.target) || (cg.form && cg.target)) return; //只能存在一个..
				if (cg.form) {
					that._form(cg.form)
				} else if (cg.target) {
					that._target(cg.target)
				}

				if (cg.blur) {
					$(cg.cls).live('blur', function() {
						var node = $(this);
						that._bacthone(node);
					});
					$(cg.cls).live('focus', function() {
						var node = $(this);
						if (cg.focusfn) cg.focusfn(node);
					})
				}
			},
			_form: function(form) {
				var that = this,
				cg = that.config;
				$(form).live('submit', function() {
					var flg = that._batch(cg.cls);
					if (flg && cg.success) cg.success(that.data);
					return false;
				});
			},
			_target: function(btn) {
				var that = this,
				cg = that.config;
				$(btn).live('click', function() {
					var flg = that._batch(cg.cls);
					if (flg && cg.success) cg.success(that.data);
					return false;
				});
			},
			_translate: function(str) {

				//str=functionname,msg,arg.arg|functionname,msg,arg.arg
				var fnary = str.split('|'),
				returnobj = {};

				for (var i = 0; i < fnary.length; i++) {
					var thisfnary = fnary[i].split(':'),
					name = thisfnary[0],
					msg = thisfnary[1],
					argary = (thisfnary[2]) ? thisfnary[2].split(',') : [];
					returnobj[name] = {
						msg: msg,
						arg: argary
					};
				}

				return returnobj;

			},
			_bacthone: function(node) {
				var that = this,
				cg = that.config,
				val = $.trim(node.val()),
				vstr = node.attr(cg.attrname),
				rulevalobj = that._translate(vstr);
				if (cg.trim) $(node).val(val);
				for (var i in rulevalobj) {
					rulevalobj[i]['arg'].splice(0, 0, val);
					var examine = that.rule[i].apply(this, rulevalobj[i]['arg']);
					if (!examine) {
						if (cg.batchcallback) cg.batchcallback(val, rulevalobj[i]['msg'], node);
						break;
					} else {
						if (cg.checktrue) cg.checktrue(node);
					}
				}
			},
			_batch: function(cls) {
				var that = this,
				cg = that.config,
				flg = true,
				j = 0;

				$(cls).each(function(index, node) {
					var val = $.trim($(this).val()),
					vstr = $(this).attr(cg.attrname),
					rulevalobj = that._translate(vstr);
					if (cg.trim) $(node).val(val);
					j++; //用做data标示，有name用name，没name用j
					/*
					rulevalobj={
						rule:msg
					}
					*/
					for (var i in rulevalobj) {
						rulevalobj[i]['arg'].splice(0, 0, val);
						var examine = that.rule[i].apply(this, rulevalobj[i]['arg']);
						if (!examine) {
							flg = false;
							if (cg.batchcallback) cg.batchcallback(val, rulevalobj[i]['msg'], node);
							break;
						} else {
							var node = $(this);
							if (cg.checktrue) cg.checktrue(node);
						}
					}

					if (!flg) {
						return false; //中断each循环
					} else {
						if ($(this).attr('name')) {
							that.data[$(this).attr('name')] = val;
						} else {
							that.data[j] = val;
						}
					}
				});
				return flg;
			}
		}

		dshop.mods['verify'] = verify;

	});

})(jQuery, window);

