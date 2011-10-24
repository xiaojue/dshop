/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111024
 * @fileoverview 业务层组件，生成一个切换滚动的box
 */
(function(W, $) {

	dshopmods.add('scrollbox', function() {
		var scrollbox = function(wrap, data , size) {
			this.data = data;
			this.wrap = wrap;
      this.size = size || 4;
      this.scrollid='#J_SCROLLBOX'+new Date().valueOf();
      this.scrollwrap='#J_SCROLLWRAP'+new Date().valueOf();
      this.item='.J_Item'+new Date().valueOf();
		};

		var _fn = {
			batchdata: function(data,size) {
      //增加前后ul标志
      $.each(data['data'],function(index,val){
          if(index%size==0) val['separate_front']=true;
          if(index%size==size-1) val['separate_behind']=true;
      });

      //增加active标志
      data['actived']=[];
      for(var i=0;i<Math.ceil(data['data'].length/size);i++){
        data['actived'].push(i);
      };
      return data;
			}
		}

		scrollbox.prototype = {
			init: function() {
				var that = this;
				that.createhtml(that.data, that.wrap);
			},
      createhtml: function(data, wrap) {
        var that=this;
				dshop.use('carousel', function() {
				    var data = _fn.batchdata(that.data,that.size),
            templatebox = '<div class="list_odds">' + '<div class="ls_title1 ks_clear">' + '<p id="'+that.scrollid.slice(1)+'">' + '{{#actived}}<span></span>{{/actived}}' + '</p>' + '{{title}}' + '</div>' + '<div class="odds_txt ks_clear"><div id="'+that.scrollwrap.slice(1)+'">' + '{{#data}}' + '{{#separate_front}}<ul class="'+that.item.slice(1)+'">{{/separate_front}}' + '<li>' + '<div class="odds_img"><a href="{{url}}"><img src="{{pic}}"></a></div>' + '<p><a href="{{url}}">{{title}}</a></p>' + '<span>&yen;<b class="red">{{price}}</b></span>' + '</li>' + '{{#separate_behind}}</ul>{{/separate_behind}}' + '{{/data}}' + '</div></div>' + '</div>';
            var html=dshop.mods.template.to_html(templatebox,data);
            $(wrap).html(html);
            $(that.scrollid).find('span:first').addClass('active');
            if($(that.scrollwrap+'>ul:last>li').length!=that.size){
              var fixsize=that.size-($(that.scrollwrap+'>ul:last>li').length%that.size),
              fixlis=$(that.scrollwrap+'>ul:first>li').slice(0,fixsize).clone();
              $(that.scrollwrap+'>ul:last').append(fixlis);
            }
            that.bindevent();
				},
        ['template']);
			},
			bindevent: function() {
        var that=this;
        var scrollbox=new dshop.mods.carousel({
            wrap:that.scrollwrap,
            wrapitem:that.item,
            direction:'top'
          });
        $(that.scrollid).find('span').live('click',function(e){
            var index=$(this).index(that.scrollid+'>span');
            $(that.scrollid).find('span').removeClass('active');
            $(this).addClass('active')
            scrollbox.to(index);
        });
			}
		};

		dshopmods.mods['scrollbox'] = scrollbox;

	});
})(window, jQuery)

