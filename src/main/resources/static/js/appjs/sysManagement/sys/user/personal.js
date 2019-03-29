var prefix = ctx + "sys/user"
$(function () {
   /* laydate({
        elem : '#birth'
    });*/
	laydate.render({
		  elem: '#birth' ,//指定元素
		  theme: '#2f4050',
		  type:'date'
	});
	  $('#distpicker-address').distpicker({
		  province: user.province,
		  city:user.city,
		  district:user.district
	  });
		
		//生成邮箱
		$("#userName").on("change", function() {
			if ($(this).val()) {
				var pinyin = $(this).toPinyin();
				var pinyins = pinyin.split(" ");
				var email = '';
				for (var i = 0; i < pinyins.length; i++) {
					if (i == 0) {
						email += pinyins[i]
					} else {
						if(generateMode == 1){
							email += pinyins[i]
						}else{
							email += pinyins[i].substr(0, 1);
						}
					}
				}
				$("#email").val(email.toLowerCase() + "@" + suffix);
			} else {
				$("#email").val("");
			}
		});	
});
/**
 * 基本信息提交
 */
$("#base_save").click(function () {

    if($("#basicInfoForm").valid()){
            $.ajax({
                cache : true,
                type : "POST",
                url :prefix + "/updatePeronal",
                data : $('#basicInfoForm').serialize(),
                async : false,
                error : function(request) {
                    laryer.alert("Connection error");
                },
                success : function(data) {
                    if (data.code == 0) {
                        parent.layer.msg("更新成功");
                       
        				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
        				parent.layer.close(index);
        				parent.reLoad();
                    } else {
                        parent.layer.alert(data.msg)
                    }
                }
            });
        }

});
$("#pwd_save").click(function () {
    if($("#modifyPwd").valid()){
        $.ajax({
            cache : true,
            type : "POST",
            url :prefix + "/resetPwd",
            data : $('#modifyPwd').serialize(),
            async : false,
            error : function(request) {
                parent.laryer.alert("网络错误");
            },
            success : function(data) {
                if (data.code == 0) {
                    parent.layer.alert("更新密码成功");
    				//取到父元素索引
    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
    				//关闭弹出层
    				parent.layer.close(index);
    				//刷新父页面
    				parent.reLoad();
                } else {
                    parent.layer.alert(data.msg)
                }
            }
        });
    }
});
