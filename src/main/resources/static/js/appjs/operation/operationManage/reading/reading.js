var prefix = "/operation/reading";
var validator;
var statusChoose;
var inputId;
var inputName;
var gassyss;
var users;
$(function() {
	gassysSelect();
	validateRule();
	userList();

	// 时间控件
	laydate.render({
		elem : '#startWriteTime',// 指定元素
		theme : '#2f4050',
		type : 'datetime',
		format : 'yyyy-MM-dd HH:mm:ss',
		done : function(value, date) {
			$('#startWriteTime').val(value.trim());
			writeTimeChange()
		}
	});
	laydate.render({
		elem : '#endWriteTime',// 指定元素
		theme : '#2f4050',
		type : 'datetime',
		format : 'yyyy-MM-dd HH:mm:ss',
		done : function(value, date) {
			$('#endWriteTime').val(value);
			writeTimeChange()
		}
	});

	$(window).bind(
			"load resize",
			function() {
				$(".ibox-content").css("min-height",
						(document.body.clientHeight - 100) + 'px');
				$(".list-content").css("min-height",
						(document.body.clientHeight - 100) + 'px');
			});

	// search start
	// 搜索响应回车事件
	$(".onblurSearch")
			.on(
					'blur',
					function() {
						var input = $(this).attr('name');
						var val = $(this).val();
						var filters = $(".filter-item");
						var exits = false;
						filters.each(function() {
							var filter = $(this);
							if (filter.attr('input-name') == input) {
								exits = true;
								if (val != '') {
									filter.text(val);
								} else {
									filter.remove();
								}
								return;
							}
						});

						if (!exits) {
							if (val != '') {
								var li = '<li class="filter-item selected" data-name="input" input-name="'
										+ input
										+ '" title="'
										+ val
										+ '">'
										+ val + '</li>';
								$(".filter-header").append(li);
							} else {
								return;
							}
						}
						$.checkCondition();
						reLoad();
					});

	// 用的时候可以开启
	$("#giveupbtn").on("click", function() {
		layer.confirm('确定要放弃？', {
			btn : [ '确定', '取消' ]
		}, function() {
			layer.closeAll('dialog');
			reLoad();
		})
	});

	// 将所有.ui-choose实例化
	$('.ui-choose').ui_choose();
	// select 多选
	statusChoose = $('#executeStateSearch').ui_choose();
	statusChoose.click = function(value, item) {
		 var filters = $(".filter-item");
		 filters.each(function(){
				var filter = $(this);
				if(filter.attr('data-name') == 'executeState' && filter.attr('data-value') == item.attr('data-value')){
					filter.remove();
				}
			});
			if(item.hasClass('selected')){
				var li = '<li class="filter-item selected" data-name=\"executeState\" data-value="'+item.attr('data-value')+'" title="'+item.text()+'">'+item.text()+'</li>';
				$(".filter-header").append(li);
			}
		 $.checkCondition();
		 reLoad();
	};

	$(document).on("click", '.filter-item', function(e) {
		var data_name = $(this).attr('data-name');
		var data_value = $(this).attr('data-value');
		var input_name = $(this).attr('input-name');
		if (data_name == 'noCondition') {
			return;
		} else if (data_name == 'input') {
			$('#' + input_name).val('');
			reLoad({
				pageNumber : 1
			});
		} else if (data_name == 'writeTime') {
			$("#startWriteTime").val('');
			$("#endWriteTime").val('');
		} else if (data_name == 'readingValue') {
			$("#startReadingValue").val('');
			$("#endReadingValue").val('');
		} else if (data_name == 'name') {
			$("#trainerSearch").val('');
		} else {
			$(this).hide(200, function() {
				if (data_name == 'executeState') {
					statusChoose.unSelect(data_value);
				}
				reLoad({
					pageNumber : 1
				});
			});
		}
		$(this).remove();
		$.checkCondition();
		reLoad();
	});
	load();
});

// 屏蔽回车键提交表单
document.onkeydown = function() {
	var event = event || window.event;
	if (event.keyCode == 13) {
		event.returnValue = false;
		event.cancelBubble = true;
		return false;
	}
}

// 设置默认属性
$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});

// 已点检人员获取
function userList() {
	$.ajax({
		// get请求地址
		url : '/operation/reading/userList',
		dataType : "json",
		async : false,
		success : function(data) {
			users = data.rows
			console.log(data);
			for (var i = 0; i < users.length; i++) {
				$('#trainerSearch').append(
						"<option value=" + users[i].userId + ">"
								+ users[i].name + "</option>");
			}
		}
	});
};

// 系统类型获取
function gassysSelect() {
	$.ajax({
		// get请求地址
		url : '/common/gasSystem/list',
		dataType : "json",
		async : false,
		success : function(data) {
			gassyss = data.rows;
			console.log(gassyss);
			for (var i = 0; i < gassyss.length; i++) {
				$('#sysId').append(
						"<option value=" + gassyss[i].sysId + ">"
								+ gassyss[i].sysName + "</option>");
			}
			for (var i = 0; i < gassyss.length; i++) {
				$('#sysIdSearch').append(
						"<option value=" + gassyss[i].sysId + ">"
								+ gassyss[i].sysName + "</option>");
			}
		}
	});
};

// 时间筛选校验
function writeTimeChange() {
	var writeTimeItem = $("[data-name='writeTime']");
	var startTime = $("#startWriteTime").val();
	var endTime = $("#endWriteTime").val();
	console.log(startTime);
	console.log(endTime);
	if (startTime != '' && endTime != '') {
		startTime += " - ";
	}
	var value = startTime + endTime;
	var li = '<li class="filter-item selected" data-name="writeTime" >' + value
			+ '</li>';
	if (value == '') {
		writeTimeItem.remove();
	} else {
		if (writeTimeItem.length > 0) {
			writeTimeItem.text(value);
		} else {
			$(".filter-header").append(li);
		}
	}

	$.checkCondition();
	reLoad();

	// 结束日期不能早于开始日期
	if (startTime != null && endTime != "") {
		var startTmp = startTime.replace(" ", ":").replace(/\:/g, "-").split(
				"-");
		var endTmp = endTime.replace(" ", ":").replace(/\:/g, "-").split("-");
		var sd = new Date(startTmp[0], startTmp[1], startTmp[2], startTmp[3],
				startTmp[4], startTmp[5]);
		var ed = new Date(endTmp[0], endTmp[1], endTmp[2], endTmp[3],
				endTmp[4], endTmp[5]);
		console.log(sd);
		console.log(ed);
		if (sd.getTime() > ed.getTime()) {
			alert("结束日期不能早于开始日期！");
			return false;
		}
	}

};

// 控制抄表率检索按整数输入
function inputChange(ele) {
	// 只能输入两个小数
	ele.value = ele.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
	// 控制输入百分比数值范围（0.0-100）
	ele.value = ele.value.replace(/(^\.|[^\d\.])/g, '').replace('.', '$#$')
			.replace(/\./g, '').replace('$#$', '.').replace(/^([^1])(\d)\d*/,
					'$1$2').replace(/^1\d{2,}.*/, '100');
	// 有值时末尾自动加%
	if (ele.value.length > 0) {
		ele.value = ele.value + '%';
	}
	;
	var readingValueItem = $("[data-name='readingValue']");
	var startValue = $("#startReadingValue").val();
	var endValue = $("#endReadingValue").val();
	console.log(startValue);
	console.log(endValue);

	// 判断抄表率输入时‘-’的位置
	var value = startValue + endValue;
	if (startValue != '' && endValue != '') {
		startValue += " - ";
		var value = startValue + endValue;
	}

	var li = '<li class="filter-item selected" data-name="readingValue" >'
			+ value + '</li>';
	if (value == '') {
		readingValueItem.remove();
	} else {
		if (readingValueItem.length > 0) {
			readingValueItem.text(value);
		} else {
			$(".filter-header").append(li);
		}
	}
	$.checkCondition();
	reLoad();
};

// 控制抄表率检索条件
function compare() {
	// 获取输入框的值
	var input1 = document.getElementById('startReadingValue');
	var input2 = document.getElementById('endReadingValue');
	// 输入框的值转为Number类型
	var num1 = parseFloat(input1.value);
	var num2 = parseFloat(input2.value);
	// 如果第二个值小于第一个则互换
	if (num2 != 0 && num1 > num2) {
		alert("后段抄表率不得小于前段抄表率！");
		
		return false;
	}
	$.checkCondition();
	reLoad();
};

// 点击退格实现删除右侧抄表率文本框的字符文字
function keyRemove() {
	if (event.keyCode == 8) {
		var s2 = $("#readingValue").val();
		s2 = s2.substring("", s2.length - 1);
		s2 = (s2 == "" ? "" : s2);
		$("#readingValue").val(s2);
	}
};

// 点击退格实现删除抄表率起检索的文本框的字符文字
function keyDelete1() {
	if (event.keyCode == 8) {
		var s2 = $("#startReadingValue").val();
		s2 = s2.substring("", s2.length - 1);
		s2 = (s2 == "" ? "" : s2);
		$("#startReadingValue").val(s2);
	}
};

// 点击退格实现删除抄表率始检索的文本框的字符文字
function keyDelete2() {
	if (event.keyCode == 8) {
		var s2 = $("#endReadingValue").val();
		s2 = s2.substring("", s2.length - 1);
		s2 = (s2 == "" ? "" : s2);
		$("#endReadingValue").val(s2);
	}
};

// 控制添加或修改时抄表率输入
function valueChange(obj) {

	// 先把非数字的都替换掉，除了数字和.
	obj.value = obj.value.replace(/[^\d.]/g, "");
	// 必须保证第一个为数字而不是.
	obj.value = obj.value.replace(/^\./g, "");
	// 保证只有出现一个.而没有多个.
	obj.value = obj.value.replace(/\.{2,}/g, ".");
	// 只能输入两个小数
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
	// 保证.只出现一次，而不能出现两次以上
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$",
			".");

	// 控制输入百分比数值范围（0.0-100）
	obj.value = obj.value.replace(/(^\.|[^\d\.])/g, '').replace('.', '$#$')
			.replace(/\./g, '').replace('$#$', '.').replace(/^([^1])(\d)\d*/,
					'$1$2').replace(/^1\d{2,}.*/, '100');
	if (obj.value.length > 0) {
		obj.value = obj.value + '%';
	}

};

// 控制添加或修改时用气量只能按数字带小数点输入
function dailyChange(obj) {
	// 先把非数字的都替换掉，除了数字和.
	obj.value = obj.value.replace(/[^\d.]/g, "");
	// 必须保证第一个为数字而不是.
	obj.value = obj.value.replace(/^\./g, "");
	// 保证只有出现一个.而没有多个.
	obj.value = obj.value.replace(/\.{2,}/g, ".");
	// 保证.只出现一次，而不能出现两次以上
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$",
			".");

};

function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	validator = $("#signupForm").validate({
		rules : {
			dailyQuantity : {
				required : false,
				maxlength : 16
			},
			sysName : {
				required : true
			},
			executeState : {
				required : true
			},
			name : {
				required : true
			}
		}
	})
}

function load() {
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/list", // 服务器数据的加载地址
						// showRefresh : true,
						// showToggle : true,
						// showColumns : true,
						iconSize : 'outline',
						toolbar : '#exampleToolbar',
						striped : true, // 设置为true会有隔行变色效果
						dataType : "json", // 服务器返回的数据类型
						pagination : true, // 设置为true会在底部显示分页条
						// queryParamsType : "limit",
						// //设置为limit则会发送符合RESTFull格式的参数
						singleSelect : true, // 设置为true将禁止多选
						// contentType : "application/x-www-form-urlencoded",
						// //发送到服务器的数据编码类型
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						// search : true, // 是否显示搜索框
						clickToSelect : true, // 点击选中
						showColumns : false, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
						// "server"
						queryParams : function(params) {
							return {
								// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit : params.limit,
								offset : params.offset,
								executeState : statusChoose.selected(),
								userId : $('#trainerSearch').val(),
								sysId : $('#sysIdSearch').val(),
								startWriteTime : $("#startWriteTime").val(),
								endWriteTime : $("#endWriteTime").val(),
								startReadingValue : $("#startReadingValue")
										.val(),
								endReadingValue : $("#endReadingValue").val(),
								sort : params.sort,
								order : params.order
							};
						},
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
								{
									checkbox : true
								},
								{
									title : '序号',
									align : 'center',
									width : '10%',
									formatter : function(value, row, index) {
										// return index+1; //序号正序排序从1开始
										var pageSize = $('#exampleTable')
												.bootstrapTable('getOptions').pageSize;// 通过表的#id
										// 可以得到每页多少条
										var pageNumber = $('#exampleTable')
												.bootstrapTable('getOptions').pageNumber;// 通过表的#id
										// 可以得到当前第几页
										return pageSize * (pageNumber - 1)
												+ index + 1; // 返回每条的序号： 每页条数
										// * （当前页 - 1 ）+
										// 序号
									}
								},
								{
									field : 'sysName',
									title : '系统类型',
									align : 'center',
									width : '20%'
								},
								{
									field : 'dailyQuantity',
									title : '用气量',
									align : 'center',
									width : '17%',
									sortable : true,
								},
								{
									field : 'readingValue',
									title : '抄表率',
									align : 'center',
									width : '16%',
									sortable : true,
									formatter : function(value, row, index) {
										if (value >= 0 && value <= 50) {
											return '<span style="color:red;font-weight:bold;">'
													+ value + '%' + '</span>';
										} else if (value > 50) {
											return '<span style="color:black;">'
													+ value + '%' + '</span>';
										} else if (value == '') {
											return ' ';
										}
									}
								},
								{
									field : 'executeState',
									title : '调价状态',
									align : 'center',
									width : '18%',
									formatter : function(value, row, index) {
										if (value == '0') {
											return '<span class="label label-danger">失败</span>';
										} else if (value == '1') {
											return '<span class="label label-primary">成功</span>';
										}
									}
								}, {
									field : 'writeTime',
									title : '点检时间',
									width : '28%',
									align : 'center',
									sortable : true
								} ],
						// 行点击事件
						onClickRow : function(row) {
							readOnly();
							$("#updateTime").attr("readOnly", "readOnly");
							validator.resetForm();
							fillForm(row);
							console.log(row)
						},
						onLoadSuccess : function(e, data) {
							readOnly();
							$("#updateTime").attr("readOnly", "readOnly");
							if ($('#exampleTable').bootstrapTable('getData').length > 0) {
								$('#exampleTable').bootstrapTable('check', 0);
								var rows = $('#exampleTable').bootstrapTable(
										'getSelections');
								if (rows.length > 0) {
									fillForm(rows[0]);
								}
							}
						}
					});
};

function reLoad(params) {
	if (params) {
		$('#exampleTable').bootstrapTable('refreshOptions', params);
		$('#exampleTable').bootstrapTable('refresh');
	} else {
		$('#exampleTable').bootstrapTable('refresh');
	}
};

function add() {
	clear();
	$("#opt").val("save");
	writeAble();
	for (var i = 0; i < gassyss.length; i++) {
		$('#sysId').append(
				"<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName
						+ "</option>");
	}
	$("#userId").val(userId);
	$("#name").val(name);

};

function save() {
	var opt = $("#opt").val();
	console.log(($('#signupForm').serialize()));
	if (readingValue >= '0%') {
		$("#readingValue").val(readingValue.value.replace(/\%+/, ''));
	} else {
		$("#readingValue").val(readingValue);
	}
	$.ajax({
		cache : true,
		type : "POST",
		url : prefix + "/" + opt,
		data : $('#signupForm').serialize(), // 你的formid
		async : false,
		error : function(request) {
			layer.alert("网络超时");
		},
		success : function(data) {
			console.log(data);
			if (data.code == 0) {
				reLoad({
					pageNumber : 1
				});
				layer.msg("操作成功");
			} else {
				layer.msg(data.msg)
			}
		}
	});

};

function edit(reading) {
	$("#opt").val("update");
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要编辑的数据")
		return;
	}

	//userId：当前登陆的账号ID    checkId：当前行的点检人ID
	if (userId != checkId) {
	      alert("不能编辑别人点检的哦！");	    
			return false;
		} else {
			clear();
//			$("updateTime").val('');
			var row = rows[0];
			fillForm(row);
			writeAble();
//			$('#updatTime').removeAttr("readOnly");
			$("#name").val(name);
	}
	
};

//// 用时可启用 删除数据
//function remove() {
//	var rows = $('#exampleTable').bootstrapTable('getSelections');
//	if (rows.length == 0) {
//		layer.msg("请选择要删除的数据")
//		return;
//	}
//	var rId = rows[0].rId;
//	layer.confirm('确定要删除选中的记录？', {
//		btn : [ '确定', '取消' ]
//	}, function() {
//		$.ajax({
//			url : prefix + "/remove/" + rId,
//			type : "POST",
//			success : function(r) {
//				if (r.code == 0) {
//					layer.msg(r.msg);
//					reLoad({
//						pageNumber : 1
//					});
//				} else {
//					layer.msg(r.msg);
//				}
//			}
//		});
//	})
//};

function clear() {
	$("#sysName").val('');
	$("#readingValue").val('');
	$("#dailyQuantity").val('');
	$("#executeState").val('1');
	$("#executeState").parent().parent();
	$("#writeTime").val('');
	$("#remarks").val('');
	$("#sysId").val('');
	$("#sysId").html('');
	$("#name").val('');
};

function writeAble() {
	$("#savebtn").removeClass("hidden");
	$("#giveupbtn").removeClass("hidden");
	$("#sysId").removeAttr("readOnly");
	$('#sysId').removeAttr("disabled");
	$("#sysName").removeAttr("readOnly");
	$("#dailyQuantity").removeAttr("readOnly");
	$("#executeState").removeAttr("readOnly");
	$("#executeState").removeAttr("disabled");
	$("#readingValue").removeAttr("readOnly");
	$('#writeTime').removeAttr("readOnly");
	$('#remarks').removeAttr("readOnly");
	$("#name").val('');
};

function readOnly() {
	$("#savebtn").addClass("hidden");
	$("#giveupbtn").addClass("hidden");
	$("#sysId").attr("readOnly", "readOnly");
	$("#sysName").attr("readOnly", "readOnly");
	$("#dailyQuantity").attr("readOnly", "readOnly");
	$("#readingValue").attr("readOnly", "readOnly");
	$("#executeState").attr("readOnly", "readOnly");
	$("#executeState").attr("disabled", "disabled");
	$("#name").attr("readOnly", "readOnly");
	$("#writeTime").attr("readOnly", "readOnly");

	$("#remarks").attr("readOnly", "readOnly");
};

function fillForm(reading) {
	$("#sysId").html('');
	for (var i = 0; i < gassyss.length; i++) {
		$('#sysId').append(
				"<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName
						+ "</option>");
	}

	$("#sysId").val(reading.sysId);
	$("#sysId").attr("disabled", "disabled");
	$("#rId").val(reading.rId);
	$("#dailyQuantity").val(reading.dailyQuantity);
	if (reading.readingValue >= 0) {
		$("#readingValue").val(reading.readingValue + "%");
	} else {
		$("#readingValue").val(reading.readingValue);
	}
	$("#executeState").attr("disabled", "disabled");
	$("#executeState").val(reading.executeState);
	$("#name").val(reading.name);
	$("#userId").val(reading.userId);
	//获取行点检人员的ID
	checkId = reading.userId;
	$("#name").attr("disabled", "disabled");
	$("#writeTime").val(reading.writeTime);
//	$("#updateTime").val(reading.updateTime);
	$("#remarks").val(reading.remarks);
};

function resize(panelId, btnId) {
	$.panelResize(panelId, btnId);
};
