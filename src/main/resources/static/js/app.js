//自定义js

//公共配置
$(document).ready(function () {

    // MetsiMenu
    $('#side-menu').metisMenu();

    // 打开右侧边栏
    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // 右侧边栏使用slimscroll
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });


    // 菜单切换,logo也要切换
    $('.navbar-minimalize').click(function () {
    	SmoothlyMenu();
       
        if($(".logo-min").hasClass('hidden')){
        	$(".logo-min").removeClass('hidden')
        	$(".logo-max").addClass('hidden')
        }else{
        	$(".logo-min").addClass('hidden')
        	$(".logo-max").removeClass('hidden')
        }
        $("body").toggleClass("mini-navbar");
    });


    // 侧边栏高度
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    }
    fix_height();

    $(window).bind("load resize click scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    //侧边栏滚动
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $('.full-height-scroll').slimScroll({
        height: '100%'
    });

    $('#side-menu>li').click(function () {
        if ($('body').hasClass('mini-navbar')) {
            NavToggle();
        }
    });
    $('#side-menu>li li a').click(function () {
        if ($(window).width() < 769) {
            NavToggle();
        }
    });

    $('.nav-close').click(NavToggle);

    //ios浏览器兼容性处理
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $('#content-main').css('overflow-y', 'auto');
    }
    
	
});

//$(window).load(function () {
//	if($('body').hasClass('mini-navbar')){
//		
//    }else{
//    	
//    }
//}); 
function calSumWidth(elements) {
    var width = 0;
    $(elements).each(function () {
        width += $(this).outerWidth(true);
    });
    return width;
}



$(window).bind("load resize", function () {
    if ($(this).width() < 769) {
    	$(".logo-min").removeClass('hidden');
    	$(".logo-max").addClass('hidden');
      $('body').addClass('mini-navbar');
      $('.navbar-static-side').fadeIn();
    }else{
    	$(".logo-min").addClass('hidden');
    	$('body').removeClass('mini-navbar');
    	$(".logo-max").removeClass('hidden');
    	
    	 
    }
    
    // 可视区域非tab宽度
    var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
    //可视区域tab宽度
    var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;

    if ($(".page-tabs-content").width() > visibleWidth) {
    	$(".J_tabLeft").removeClass("hidden");
    	$(".J_tabRight").removeClass("hidden");
    }else{
    	$(".J_tabLeft").addClass("hidden");
    	$(".J_tabRight").addClass("hidden");
    }
    
    
});

function NavToggle() {
    $('.navbar-minimalize').trigger('click');
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        $('#side-menu').removeAttr('style');
    }
}


//判断浏览器是否支持html5本地存储
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

