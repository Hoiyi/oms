/*******************************************************************************
 * 全局函数
 * 
 ******************************************************************************/
$(function(){
	$(window).bind("load resize", function () {
		$(".ibox-content").css("min-height",(document.body.clientHeight-95)+'px');
		$(".list-content").css("min-height",(document.body.clientHeight-95)+'px');
		$(".ibox-content").css("max-height",(document.body.clientHeight-95)+'px');
		$(".list-content").css("max-height",(document.body.clientHeight-95)+'px');
		

		
		
		 var id = "#exampleTable";
		 var options = $(id).bootstrapTable('getOptions');
		    if ($(window).width() < 500) {
		        if (options.cardView === false) {
		            $(id).bootstrapTable('toggleView');
		        }
		    } else {
		        if (options.cardView === true) {
		            $(id).bootstrapTable('toggleView');
		        }
		    }
	});
	
	$("#signupForm").keydown(function(key){
		if(key.keyCode == 13){
			return false;
		}
	});
	
	
});
jQuery.extend({
	panelResize : function(panelId, btnId) {
		var panel = $('#' + panelId);
		var btn = $('#' + btnId);
		if (btn.hasClass('fa-expand')) {
			btn.removeClass('fa-expand');
			$(".cpanel").addClass("hidden");
			panel.removeClass('hidden');
			panel.attr('classTemp', panel.attr('class'));
			panel.attr('class', 'col-sm-12');
			btn.addClass('fa-compress');
		} else if (btn.hasClass('fa-compress')) {

			btn.removeClass('fa-compress');
			panel.attr('class', panel.attr('classTemp'))
			$(".cpanel").removeClass("hidden");
			btn.addClass('fa-expand');
		}
	},
	closePanel : function(panelId) {
		var panels = $("div[id^='panel']");
		panels.each(function() {
			$(this).attr("class", $(this).attr('classtemp'));
		});
		var panel = $('#' + panelId);
		panel.addClass('hidden');
	},
	openPanel : function(panelId) {
		var panels = $("div[id^='panel']");
		panels.each(function() {
			$(this).attr("classtemp", $(this).attr('class'));
			$(this).attr("class", 'hidden');
		});
		var panel = $('#' + panelId);
		panel.attr('class', 'col-sm-12');
		panel.removeClass('hidden');
	},
	stopBubbling : function(e) {
		e = window.event || e;
		if (e.stopPropagation) {
			e.stopPropagation(); // 阻止事件 冒泡传播
		} else {
			e.cancelBubble = true; // ie兼容
		}
	},
	checkCondition : function() {
		var filter_length = $(".filter-item").length;
		if (filter_length == 1) {
			$("[data-name='noCondition']").show(200);
		} else {
			$("[data-name='noCondition']").hide(200);
		}
	},
	switcher : function() {
		var btn = $("#switch");
		var area = $("#search");
		var condition = $("#condition");
		if (btn.hasClass("fa-angle-up")) {
			btn.removeClass("fa-angle-up");
			btn.addClass("fa-angle-down");
			area.slideUp(300);
			if ($(".filter-item").length == 1) {
				$("#condition").slideUp(300);
			}
		} else {
			btn.removeClass("fa-angle-down");
			btn.addClass("fa-angle-up");
			area.slideDown(300);
			condition.slideDown(300);
			$("#condition").slideDown(300);
			this.checkCondition();
		}
	}
});
