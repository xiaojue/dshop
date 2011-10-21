/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111020
 * @fileoverview 自动生成一个定制化的ajax提交表单，可选是否带字数统计校验，属于我说，评论之类的基类
 */
(function(W,$){
    dshop.add('putfield',function(){
      
      var putfield=function(cg){
          this.targetfrom=cg.targetfrom;
          this.template=cg.template || '';
          this.postdata={};
          this.beforepost=cg.beforepost || function(){}; //return t/f
          this.successCallback=cg.successCallback || function(){};
          this.errorCallback=cg.errorCallback || function(){};
          this.uri=cg.uri || '';
      };

      putfield.prototype={
        init:function(){
          var that=this; 
          if(!that.targetfrom) return;
          $(that.targetfrom).html(that.template).live('submit',function(){
              if(that.beforepost()) that._fetchpost();
              return false;
          });
        },
        _fetchpost:function(){
          var that=this;
          $.ajax({
              url:that.uri,
              type:'POST',
              data:that.postdata,
              success:successCallback,
              error:errorCallback
          });
        },
        setpostdata:function(data){
          this.postdata=data;
        }
      };

      dshop.mods['putfield']=putfield;
      });
})(window,jQuery);
