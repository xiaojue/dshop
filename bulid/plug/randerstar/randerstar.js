/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111026
 * @fileoverview 星打分类，产生一个radio组
 */
(function(W, $) {
	dshop.add('randerstar', function() {
		var randerstar = function(cg) {
			var _cg = {
				radioname: '',
				starsrc: {
					full: 'http://s1.ifiter.com/dianshang/static/images/xing1.png',
					empty: 'http://s1.ifiter.com/dianshang/static/images/xing2.png'
				},
				size: 5,
				//一共几个星
				msg: ['一星', '二星', '三星', '四星', '五星'],
				hasmsg: true,
				target: '',
        eventcallback:function(){

        },
				current: 0 //初始化几分
			};
			$.extend(_cg, cg);
			this.cg = _cg;
		};

		var _fn = {
			createstardom: function(cg) {
				var html = '';
				for (var i = 1; i <= cg.size; i++) {
					var src = cg.starsrc.empty;
					if (i <= cg.current) src = cg.starsrc.full;
					var star = '<img src="' + src + '" style="cursor:pointer;">',
					radiotmp = '<input type="radio" name="' + cg.radioname + '" value="' + i + '" style="display:none;">';
					html += radiotmp + star;
				}
				if (cg.hasmsg) html += '<span class="J_StarMsg">' + (cg.msg[cg.current - 1] || '') + '</span>';
				$(cg.target).html(html);
			}
		};

		randerstar.prototype = {
			init: function() {
				var that = this,
				cg = that.cg;
				_fn.createstardom(cg);
				that._bindevent();
			},
			_bindevent: function() {
				var that = this,
				cg = that.cg;
				function rander(index) {
					$(cg.target + '>img').slice(0, index).attr('src', cg.starsrc.full);
					$(cg.target + '>img').slice(index, cg.size).attr('src', cg.starsrc.empty);
					$(cg.target + '>.J_StarMsg').text(cg.msg[index - 1]);
				}
				$(cg.target + '>img').live('click', function() {
					var index = $(this).index(cg.target + '>img');
					$(cg.target + '>input[type="radio"]').eq(index).attr('checked', 'checked');
					rander(index + 1);
					cg.current = index + 1;
          cg.eventcallback($(cg.target));
				}).live('mouseover', function() {
					var index = $(this).index(cg.target + '>img');
					rander(index + 1);
           cg.eventcallback($(cg.target));
				}).live('mouseout', function() {
					rander(cg.current);
					if (cg.current == 0) $(cg.target + '>.J_StarMsg').text('');
           cg.eventcallback($(cg.target));
				});
			}
		};
		dshop.mods['randerstar'] = randerstar;
	});
})(window, jQuery);

