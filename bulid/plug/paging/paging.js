/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111020
 * @fileoverview 通用的分页渲染类
 */
(function(W, $) {
	dshop.add('paging', function() {
		var paging = function(cg) {
			var _cg = {
				count: null,
				current: 1,
				clsname: 'page',
				currentcls: 'active',
				dotcls: 'none',
				nodecls: 'J_N',
				inlinestyletext: 'margin-top:20px;',
				template: '<span>' + '{{#prev}}<a class="J_prev" href="javascript:void(0);">{{text}}</a>{{/prev}}' + '{{#n}}<a class="{{currentcls}} {{dotclscls}} {{cls}}" href="javascript:void(0);">{{text}}</a>{{/n}}' + '{{#next}}<a class="J_next" href="javascript:void(0);">{{text}}</a>{{/next}}' + '</span>',
				viewsize: 5,
				//下面3个函数参数分别为当前的current和当前的node,
				prevfn: null,
				nextfn: null,
				sizeclick: null,
				wrap: null,
				wrapid: '#J_Page' + new Date().valueOf() //创建的分页覆层div的id->只有get方法么有set方法 
			}
			$.extend(_cg, cg);
			this.cg = _cg;
		};

		//私有的方法，可以在prototype里调用，但是不对外开放
		var _fn = {
			createdigit: function(count, current, viewsize, currentcls, dotcls, nodecls) {
				var arr = [],
				startsize = current - Math.floor(viewsize / 2);
				//生成一个数码渲染数组对象
				if (startsize <= 0) startsize = 1;
				for (var i = 0; i < viewsize; i++) {
					if (startsize + i > count) break;
					var temp = {
						text: startsize + i,
						cls: nodecls
					};
					if (current == startsize + i) temp.currentcls = currentcls;
					arr.push(temp);
				}

				if (arr[0].text != 1) {
					if (arr[0].text - 1 > 1) arr.unshift({
						text: '..',
						cls: dotcls
					});
					arr.unshift({
						text: 1,
						cls: nodecls
					});
				}
				if (arr[arr.length - 1].text != count) {
					if (arr[arr.length - 1].text + 1 != count) arr.push({
						text: '..',
						cls: dotcls
					});
					arr.push({
						text: count,
						cls: nodecls
					});
				}
				return arr;
			},
			createtempobject: function(count, current, cg) {
				var returnobject = {},
				n = _fn.createdigit(count, current, cg.viewsize, cg.currentcls, cg.dotcls, cg.nodecls),
				next = {
					text: '下一页'
				},
				prev = {
					text: '上一页'
				};
				if (n[1]['text'] == '..') {
					returnobject['prev'] = prev;
				}
				if (n[n.length - 2]['text'] == '..') {
					returnobject['next'] = next;
				}
				returnobject.n = n;
				return returnobject;
			},

		};
		//公开函数
		paging.prototype = {
			_initevent: function(wrap, prevfn, nextfn, sizeclick) {
				var host = this;
				$(wrap).find('.J_prev').live('click', function() {
					var that = $(this);
					host.cg.current = host.cg.current - 1;
					if (prevfn) prevfn(host.cg.current, that);
					return false;
				});
				$(wrap).find('.J_next').live('click', function() {
					var that = $(this);
					host.cg.current = host.cg.current + 1;
					if (nextfn) nextfn(host.cg.current, that);
					return false;
				});
				$(wrap).find('.J_N').live('click', function() {
					var that = $(this);
					host.cg.current = that.text();
					if (sizeclick) sizeclick(host.cg.current, that);
					return false;
				});
			},
			rebulid: function(count, current) {
				var that = this,
				pagobject = _fn.createtempobject(count, current, that.cg),
				paghtml = dshop.mods.template.to_html(that.cg.template, pagobject);
				$(that.cg.wrapid).html(paghtml);
			},
			init: function() {
				var that = this,
				cg = that.cg,
				pagobject = _fn.createtempobject(cg.count, cg.current, cg),
				paghtml = dshop.mods.template.to_html(cg.template, pagobject);
				$(cg.wrap).html('<div id="' + cg.wrapid.slice(1) + '" class="'+cg.clsname+'" style="'+cg.inlinestyletext+'"></div>');
				$(cg.wrapid).html(paghtml);
				that._initevent(cg.wrapid, cg.prevfn, cg.nextfn, cg.sizeclick);
			},
			getattr: function(name) {
				return this.cg[name];
			},
			setattr: function(name, val) {
				this.cg[name] = val;
			}
		};

		dshop.mods['paging'] = paging;
	});
})(window, jQuery)

