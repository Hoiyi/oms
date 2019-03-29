$(function(){
	//初始化icheck插件
	$(".i-checks").iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green'
	});
	$(".gg-faeye").on('mouseover',function(){
		$('#pwdOld').prop('type', 'text'); 
		$('#pwd').prop('type', 'text');
		$('#confirm_password').prop('type', 'text'); 
	});
	$(".gg-faeye").on('mouseout',function(){
		$('#pwdOld').prop('type', 'password');
		$('#pwd').prop('type', 'password'); 
		$('#confirm_password').prop('type', 'password');
	});
});

