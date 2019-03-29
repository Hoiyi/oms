var prefix = ctx + "sys/settings"

/**
 * 基本信息提交
 */
$("#sysSettings_save").click(function () {

    if($("#sysSettingsForm").valid()){
            $.ajax({
                cache : true,
                type : "POST",
                url :prefix + "/updateSysSettings",
                data : $('#sysSettingsForm').serialize(),
                async : false,
                error : function(request) {
                    laryer.alert("网络错误");
                	},
                success : function(data) {
                	 parent.layer.msg(data.msg);
	               if (data.code == 0) {
	        				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	        				parent.layer.close(index);
	        				parent.reLoad();
	                    } 
	                 
                }
            });
        }

});
$("#emailSettings_save").click(function () {
    if($("#emailSettingsForm").valid()){
        $.ajax({
            cache : true,
            type : "POST",
            url :prefix + "/updateEmailSettings",
            data : $('#emailSettingsForm').serialize(),
            async : false,
            error : function(request) {
                parent.laryer.alert("网络错误");
            },
            success : function(data) {
            	parent.layer.msg(data.msg);
                if (data.code == 0) {
		    				//取到父元素索引
		    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
		    				//关闭弹出层
		    				parent.layer.close(index);
		    				//刷新父页面
		    				parent.reLoad();
                		} 
                
            }
        });
    }
});
