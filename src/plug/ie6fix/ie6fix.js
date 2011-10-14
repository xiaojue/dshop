/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111014
 * @fileoverview 针对ie6修复png，任意元素hover，不缓存背景图，表格隔行换色
 */
(function(W, $, doc) {
	dshop.add('ie6fix', function() {

		var ie6fix = function() {
			var fn = {
				fixpng: function(range) {
          if(!range) range='body';
					$(range+' img').each(function() {
						var imgName = this.src.toUpperCase();
						if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
							var $img = $('<span>').css({
								width: this.offsetWidth,
								height: this.offsetHeight,
								display: 'inline-block',
								overflow: 'hidden',
								cursor: (this.parentElement.href) ? 'hand': ''
							}).attr({
								'title': this.alt || this.title || '',
								'class': this.className
							});
							$img[0].style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.src + '", sizingMethod="scale")';
							$(this).replaceWith($img);
						}
					});
				},
				addhover: function(target, cls) {
          $(target).hover(function(){
              $(this).addClass(cls);
            },function(){
              $(this).removeClass(cls);
            });
				},
				tabledistance: function(table,clsobj) {
          var _clsobj={
            evencls:'',
            oddcls:''
          };
          $.extend(_clsobj,clsobj);
          $(table+':odd').addClass(_clsobj.oddcls);
          $(table+':even').addClass(_clsobj.evencls);
				}
      };
			doc.execCommand("BackgroundImageCache", false, true); //修复ie6 不缓存背景图 
			return {
				fixpng: fn.fixpng,
				addhover: fn.addhover,
				tabledistance: fn.tabledistance
			}
		} ();

		dshop.mods['ie6fix'] = ie6fix;
	});
})(window, jQuery, document);

