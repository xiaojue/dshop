(function(a,b){dshop.add("randerstar",function(){var c=function(f){var e={radioname:"",starsrc:{full:"http://s1.ifiter.com/dianshang/static/images/xing1.png",empty:"http://s1.ifiter.com/dianshang/static/images/xing2.png"},size:5,msg:["差","一般","好","很好","特别好"],hasmsg:true,target:"",current:0};b.extend(e,f);this.cg=e};var d={createstardom:function(h){var g="";for(var f=1;f<=h.size;f++){var k=h.starsrc.empty;if(f<=h.current){k=h.starsrc.full}var j='<img src="'+k+'" style="cursor:pointer;">',e='<input type="radio" name="'+h.radioname+'" value="'+f+'" style="display:none;">';g+=e+j}if(h.hasmsg){g+='<span class="J_StarMsg">'+(h.msg[h.current-1]||"")+"</span>"}b(h.target).html(g)}};c.prototype={init:function(){var f=this,e=f.cg;d.createstardom(e);f._bindevent()},_bindevent:function(){var g=this,f=g.cg;function e(h){b(f.target+'>input[type="radio"]').eq(h).attr("checked","checked");b(f.target+">img").slice(0,h).attr("src",f.starsrc.full);b(f.target+">img").slice(h,f.size).attr("src",f.starsrc.empty);b(f.target+">.J_StarMsg").text(f.msg[h-1])}b(f.target+">img").live("click",function(){var h=b(this).index(f.target+">img");e(h+1);f.current=h+1}).live("mouseover",function(){var h=b(this).index(f.target+">img");e(h+1)}).live("mouseout",function(){e(f.current);if(f.current==0){b(f.target+">.J_StarMsg").text("")}})}};dshop.mods.randerstar=c})})(window,jQuery);