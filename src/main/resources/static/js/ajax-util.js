//全站ajax加载提示
(function ($) {
    $(document).ajaxStart(function () {
        var index = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
    });
    $(document).ajaxStop(function () {
        layer.closeAll('loading');
    });
    //登录过期，shiro返回登录页面
    $.ajaxSetup({
        complete: function (xhr, status,dataType) {
            if('text/html;charset=UTF-8'==xhr.getResponseHeader('Content-Type')&& xhr.status == 200){
                top.location.href = '/login';
            }
        }
    });
})(jQuery);





