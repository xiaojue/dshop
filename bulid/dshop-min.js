(function(a,f){var b=(a.location.href.indexOf("debug")==-1)?false:true;var h=function(i){this._queue=[];this._queuefn={};this.mods={};this.host=i;this.debug=b;this.KISSYLOAD=false};h.prototype={add:function(i,j){var k=this;if(k._queuefn.hasOwnProperty(i)){return}k._queuefn[i]=j},use:function(l,u,s){var q=this,k=[],o=[];var r=[l];if(s){r=r.concat(s)}for(var n=0;n<r.length;n++){var p=r[n],j=q.debug?".js":"-min.js",m=q.host+p+"/"+p+j;if(q._queuefn.hasOwnProperty(p)||q.mods.hasOwnProperty(p)){k.push(p);o.push(p);if(o.length==r.length){function t(){for(var v=0;v<r.length;v++){if(typeof q.mods[r[v]]=="string"){setTimeout(t,500);break}else{if(v==r.length-1){u()}}}}t()}continue}(function(v,i){if(!q.mods.hasOwnProperty(v)){q.mods[v]=v}f.getScript(m,function(){k.push(v);q._queue[i]=q._queuefn[v];if(k.length==r.length){for(var w=0;w<q._queue.length;w++){if(!q._queue[w]){q._queue[w]=q._queuefn[r[w]]}if(q._queue[w]){q._queue[w]()}}function x(){for(var y=0;y<r.length;y++){if(typeof q.mods[r[y]]=="string"){setTimeout(x,500);break}else{if(y==r.length-1){u()}}}}x();q._queue=[]}})})(p,n)}}};var e=b?"http://localhost/idmstatic/js/dshop/src/":"http://s1.ifiter.com/idmstatic/js/dshop/bulid/",d=new h(e+"plug/"),c=new h(e+"mods/");a.dshop=d;a.dshopmods=c;a.idmjsonp={};f.ajaxSetup({cache:true});if(f.browser.msie){var g="http://a.tbcdn.cn/p/fp/2011a/html5.js";f.getScript(g)}})(window,jQuery);