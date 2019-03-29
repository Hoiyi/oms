var prefix = "/operation/customermanage";
var inputId;
var inputName;
var validator;
var plats;
var gassyss;
var customerSys;
var users;
var responPersonId;
var stateChoose;
var stateValue;
var propertyChoose;
var propertyValue;
var districts;
var autoCustomers = [];
var customers;
var option;
$(function() {
	platSelect();
	gassysSelect();
	usersSelect();
	districtsSelect();
	customersSelect();
	validateRule();
	customersyssSelect();
	
	
	$(window).bind("load resize", function () {
		$(".list-content").css("min-height",(document.body.clientHeight-120)+'px');
		$(".ibox-content").css("min-height",(document.body.clientHeight-110)+'px');
	});
	// 搜索响应回车事件
	$(".enterSearch").on('keydown', function() {
		if (event.keyCode == 13) {
			reLoad();
		}
	});
	
	$("#platId").change(function(){
		$('#sysId').html('');
		for(var i = 0 ; i < gassyss.length ; i++){
			if($("#platId").val() == gassyss[i].platId){
				$('#sysId').append("<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
			}
		}
	});
	
	laydate.render({
		  elem: '#trainerTime' ,//指定元素
		  theme: '#2f4050',
		  type:'datetime',
		  format:'yyyy-MM-dd HH:mm:ss',
//		  done: function(value, date){
//			  console.log(value)
//			  $('#startLoginTime').val(value.trim());
//			  loginTimeChange()
//		   }
	});
	
	$("#giveupbtn").on("click",function(){
		layer.confirm('确定要放弃？', {
			btn : [ '确定', '取消' ]
		}, function() {
			layer.closeAll('dialog');
			reLoad();
		})
	});
	
	platChange();
	addressChange();
	
	// 将所有.ui-choose实例化
	$('.ui-choose').ui_choose();
	//select 多选
	stateChoose = $('#stateSearch').ui_choose();
	propertyChoose = $('#propertySearch').ui_choose();

	stateChoose.click = function(values, item) {
		var filters = $(".filter-item");
		filters.each(function(){
			var filter = $(this);
			if(filter.attr('data-name') == 'sex' && filter.attr('data-value') == item.attr('data-value')){
				filter.remove();
			}
			
		});
		$.checkCondition();
		if(stateChoose.selected().indexOf(",") == 1){
			stateValue = "";
		}else{
			stateValue = stateChoose.selected();
		}
		reLoad();
	};
	
	propertyChoose.click = function(values, item) {
		var filters = $(".filter-item");
		filters.each(function(){
			var filter = $(this);
			if(filter.attr('data-name') == 'property' && filter.attr('data-value') == item.attr('data-value')){
				filter.remove();
			}
			
		});
		$.checkCondition();
		if(propertyChoose.selected().indexOf(",") == 1){
			propertyValue = "";
		}else{
			propertyValue = propertyChoose.selected();
		}
		reLoad();
	};
	
	load();
	
	jQuery.validator.addMethod("isMobile", function(value, element) {
	    var length = value.length;
	    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
	    return this.optional(element) || (length == 11 && mobile.test(value));
	}, "请正确填写您的手机号码");
	
	
	
	$('#customerName').blur(function(){
		var flag = true;
		for(var i = 0 ; i < customers.length ; i++){
			if($('#customerName').val() == customers[i].customerName){
				$("#customerId").val(customers[i].customerId);
				$('#adress-distpicker').distpicker('destroy');
				$('#adress-distpicker').distpicker({
					province: customers[i].customerAddressP,
					city: customers[i].customerAddressC
				})
				$("#contact").val(customers[i].contact);
				$("#contactInformation").val(customers[i].contactInformation);
				$("#customerProperty").val(customers[i].customerProperty);
				$("#contact").attr("disabled","disabled");
				$("#contactInformation").attr("disabled","disabled");
				$("#customerProperty").attr("disabled","disabled");
				$("#customerAddressP_").attr("disabled","disabled");
				$("#customerAddressC_").attr("disabled","disabled");
				flag = false;
			}
			if(flag){
				$("#customerId").val('');
				$('#adress-distpicker').distpicker('destroy');
				$('#adress-distpicker').distpicker({
					province: "",
					city: ""
				})
				$("#contact").val("");
				$("#contactInformation").val("");
				$("#customerProperty").val("");
				$("#contact").removeAttr("disabled");
				$("#contactInformation").removeAttr("disabled");
				$("#customerProperty").removeAttr("disabled");
				$("#customerAddressP_").removeAttr("disabled");
				$("#customerAddressC_").removeAttr("disabled");
			}
		}
	});
	
});

function customersyssSelect(){
	$.ajax({
	// get请求地址
	    url: '/operation/customermanage/customerSyslist',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	customerSys = data;
	    	console.log(data);
	    }
	});	
}

function platChange(){
	for (var i = 0; i < plats.length; i++) {
        $('#platIdSearch').append("<option value=" + plats[i].platId + ">" + plats[i].platDes + "</option>");
    }
	
	for (var i = 0; i < gassyss.length; i++) {
        $('#sysIdSearch').append("<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
    }
	
	$('#platIdSearch').change(function(){
		$('#sysIdSearch').html('');
		$('#sysIdSearch').append("<option value='' selected>全部</option>");
		if($("#platIdSearch").val() == ""){
			for (var i = 0; i < gassyss.length; i++) {
		        $('#sysIdSearch').append("<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
		    }
		}
		for(var i = 0 ; i < gassyss.length ; i++){
			if($("#platIdSearch").val() == gassyss[i].platId){
				$('#sysIdSearch').append("<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
			}
		}
		reLoad();
	});
}

function addressChange(){
	$('#pAddressSearch').val('');
	$('#cAddressSearch').val('');
	$('#pAddressSearch').change(function(){
		$('#cAddressSearch').val('');
		reLoad();
	});
}

function platSelect(){
	$.ajax({
	// get请求地址
	    url: '/common/platform/list',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	plats = data.rows;
	        for (var i = 0; i < plats.length; i++) {
	            $('#platId').append("<option value=" + plats[i].platId + ">" + plats[i].platDes + "</option>");
	        }
	        //$('#platId').selectpicker('refresh');
	        //$('#platId').selectpicker('render');
	        $('#platId').attr("readOnly", "readOnly");
	    }
	});
}

function customersSelect(){
	$.ajax({
	// get请求地址
	    url: '/operation/customermanage/customerlist',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	customers = data;
	    	for(var i=0; i<data.length; i++){
				autoCustomers.push({id :data[i].customerId, label: data[i].customerName });
			}

	    }
	});
}

function districtsSelect(){
	$.ajax({
	// get请求地址
	    url: '/common/district/list',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	districts = data.rows;
	        for (var i = 0; i < districts.length; i++) {
	            $('#districtIdSearch').append("<option value=" + districts[i].principalId + ">" + districts[i].distName + "</option>");
	        }
	        //$('#platId').selectpicker('refresh');
	        //$('#platId').selectpicker('render');
	        $('#platId').attr("readOnly", "readOnly");
	    }
	});
}

function usersSelect(){
	$.ajax({
	// get请求地址
	    url: '/sys/user/list',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	users = data.rows;
	        for (var i = 0; i < users.length; i++) {
	            $('#trainer').append("<option value=" + users[i].userId + ">" + users[i].name + "</option>");
	        }
	        //$('#platId').selectpicker('refresh');
	        //$('#platId').selectpicker('render');
	        $('#trainer').attr("readOnly", "readOnly");
	    }
	});
}
function gassysSelect(){
	$.ajax({
	// get请求地址
	    url: '/common/gasSystem/list',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	gassyss = data.rows;
	        for (var i = 0; i < data.length; i++) {
	            $('#sysId').append("<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
	        }
	        //$('#sysId').selectpicker('refresh');
	        //$('#sysId').selectpicker('render');
	        $('#sysId').attr("readOnly", "readOnly");
	    }
	});
}



$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});



function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	validator = $("#signupForm").validate({
		rules : {
			customerName : {
				required : true
			},
			customerAddressP_ : {
				required : true
			},
			customerAddressC_ : {
				required : true
			},
			contact : {
				required : true
			},
			contactInformation : {
				required : true,
	            minlength : 11,
	            isMobile : true
			},
			customerProperty : {
				required : true
			},
			platId : {
				required : true
			},
			sysId : {
				required : true,
				isExisted : true
			},
			sysUrl : {
				required : true
			}
		},
		messages : {
			contactInformation : {
	            required : "请输入手机号",
	            minlength : "确认手机不能小于11个字符",
	            isMobile : "请正确填写您的手机号码"
	        },
	        sysId : {
				required : "请选择系统",
				isExisted : "该客户该系统已被创建"
	        }
		}
	})
}

function load() {
	$('#exampleTable').bootstrapTable({
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
		sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
		queryParams : function(params) {
			return {
				// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
				limit : params.limit,
				offset : params.offset,
				customerName : $('#customerNameSearch').val(),
				state : stateValue,
				customerProperty : propertyValue,
				platId : $('#platIdSearch').val(),
				sysId : $('#sysIdSearch').val(),
				responsiblePerson : $('#districtIdSearch').val(),
				customerAddressP : $('#pAddressSearch').val(),
				customerAddressC : $('#cAddressSearch').val()
			};
		},
		// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
		// queryParamsType = 'limit' ,返回参数必须包含
		// limit, offset, search, sort, order 否则, 需要包含:
		// pageSize, pageNumber, searchText, sortName,
		// sortOrder.
		// 返回false将会终止请求
		columns : [ {
			checkbox : true
		},{
            title: '序号',
            align:'center',
            width:'10%',
            formatter:function(value,row,index){
                //return index+1; //序号正序排序从1开始
                var pageSize=$('#exampleTable').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#exampleTable').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return pageSize * (pageNumber - 1) + index + 1;    //返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
            }
		}, {
			field : 'customerName',
			title : '客户名称'
		}, {
			field : 'sysName',
			title : '使用系统'
		} , {
			field : 'contact',
			title : '联系人'
		} , {
			field : 'contactInformation',
			title : '联系方式'
		}],
		// 行点击事件
		onClickRow : function(row) {
			readOnly();
			//validator.resetForm();
			fillForm(row);
		},
		onLoadSuccess : function(e, data) {
			readOnly();
			if ($('#exampleTable').bootstrapTable('getData').length > 0) {
				$('#exampleTable').bootstrapTable('check', 0);
				var rows = $('#exampleTable').bootstrapTable('getSelections');
				if (rows.length > 0) {
					fillForm(rows[0]);
				}
			}
		}
	});
}
function reLoad() {
	customersyssSelect();
	$('#exampleTable').bootstrapTable('refresh');

}

function add() {
	option = {
		max: 3,    //列表里的条目数
		minChars: 0,    //自动完成激活之前填入的最小字符
		width: 400,     //提示的宽度，溢出隐藏
		scrollHeight: 10,   //提示的高度，溢出显示滚动条
		matchContains: false,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
		autoFill: true,    //自动填充
		minLength: 0,
		select: function (event, ui) {
//		        $("#autoByAjax").val(ui.item.label); // display the selected text
//		        $("#autoByAjaxVal").val(ui.item.id); // save selected id to hidden input
			for(var i = 0 ; i < customers.length ; i++){
				if(ui.item.id == customers[i].customerId){
					$("#customerId").val(customers[i].customerId);
					$('#adress-distpicker').distpicker('destroy');
					$('#adress-distpicker').distpicker({
						province: customers[i].customerAddressP,
						city: customers[i].customerAddressC
					})
					$("#contact").val(customers[i].contact);
					$("#contactInformation").val(customers[i].contactInformation);
					$("#customerProperty").val(customers[i].customerProperty);
					$("#contact").attr("disabled","disabled");
					$("#contactInformation").attr("disabled","disabled");
					$("#customerProperty").attr("disabled","disabled");
					$("#customerAddressP_").attr("disabled","disabled");
					$("#customerAddressC_").attr("disabled","disabled");
				}
			}
		}
	};
	$('#customerName').autocomplete({source: autoCustomers},option);
	$('#customerName').blur(function(){
		var flag = true;
		for(var i = 0 ; i < customers.length ; i++){
			if($('#customerName').val() == customers[i].customerName){
				$("#customerId").val(customers[i].customerId);
				$('#adress-distpicker').distpicker('destroy');
				$('#adress-distpicker').distpicker({
					province: customers[i].customerAddressP,
					city: customers[i].customerAddressC
				})
				$("#contact").val(customers[i].contact);
				$("#contactInformation").val(customers[i].contactInformation);
				$("#customerProperty").val(customers[i].customerProperty);
				$("#contact").attr("disabled","disabled");
				$("#contactInformation").attr("disabled","disabled");
				$("#customerProperty").attr("disabled","disabled");
				$("#customerAddressP_").attr("disabled","disabled");
				$("#customerAddressC_").attr("disabled","disabled");
				flag = false;
			}
			if(flag){
				$("#customerId").val('');
				$('#adress-distpicker').distpicker('destroy');
				$('#adress-distpicker').distpicker({
					province: "",
					city: ""
				})
				$("#contact").val("");
				$("#contactInformation").val("");
				$("#customerProperty").val("");
				$("#contact").removeAttr("disabled");
				$("#contactInformation").removeAttr("disabled");
				$("#customerProperty").removeAttr("disabled");
				$("#customerAddressP_").removeAttr("disabled");
				$("#customerAddressC_").removeAttr("disabled");
			}
		}
	});
	jQuery.validator.addMethod("isExisted", function(value, element) {
	    var customer_id = $('#customerId').val();
	    var sys_id = $('#sysId').val();
	    if(customer_id != null && customer_id != ""){
	    	for(var i = 0 ; i < customerSys.length ; i++){
	    		if(customerSys[i].customerId == customer_id && customerSys[i].sysId == sys_id){
	    			return false;
	    		}
	    	}
	    }
	    return true;
	}, "该用户该系统已经被创建");
	$("#opt").val("save");
	writeAble();
	clear();
	$('#adress-distpicker').distpicker({
		province: '',
		city: ''
	})
}

function save() {
	var opt = $("#opt").val();
	$('#customerAddressP').val($('#customerAddressP_').find('option:selected').attr('data-code'));
	$('#customerAddressC').val($('#customerAddressC_').find('option:selected').attr('data-code'));
	find();
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
			if (data.code == 0) {
				reLoad();
				autoCustomers = [];
				customersSelect();
				$('#customerName').autocomplete('destroy');
				$('#customerName').autocomplete({source: autoCustomers},option);
				layer.msg("操作成功");
			} else {
				layer.msg(data.msg)
			}
		}
	});
}

function find(){
	$.ajax({
		type : "POST",
		url : prefix + "/find/"+$('#customerAddressP_').find('option:selected').attr('data-code'),
		async : false,
		success : function(data) {
			$('#responsiblePerson').val(data);
		}
	});
}

function edit() {
	jQuery.validator.addMethod("isExisted", function(value, element) {
	    return true;
	});
	$('#customerName').unbind();
	$("#opt").val("update");
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要编辑的数据")
		return;
	}
	clear();
	var row = rows[0];
	fillForm(row);
	writeAble();
}

function remove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据")
		return;
	}
	var csId = rows[0].csId;
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/delete/" + csId,
			type : "Post",
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}

function clear() {
	$("#csId").val('');
	$("#customerId").val('');
	$("#customerName").val('');
	$("#createTime").val('');
	$("#createTime").parent().parent().hide();
	$("#customerAddressP").val('');
	$("#customerAddressC").val('');
	$("#contact").val('');
	$("#contactInformation").val('');
	$("#state").val('1');
	$("#state").parent().parent().hide();
	$("#updateReason").val('');
	$("#updateReason").parent().parent().hide();
	$("#trainer").val('');
	$("#trainerTime").val('');
	$("#trainerMode").val('');
	$("#responsiblePerson").val('');
	$("#responsiblePerson").parent().parent().hide();
	$("#customerProperty").val('');
	$("#platId").val('');
	$("#sysId").val('');
	$("#sysId").html('');
	$("#sysUrl").val('');
	$("#remark").val('');
}

function writeAble() {
	$("#customerName").removeAttr("readOnly");
	$("#customerAddressP_").removeAttr("readOnly");
	$("#customerAddressC_").removeAttr("readOnly");
	$('#customerAddressP_').removeAttr("disabled");
	$('#customerAddressC_').removeAttr("disabled");
	$("#contact").removeAttr("readOnly");
	$("#contact").removeAttr("disabled");
	$("#contactInformation").removeAttr("readOnly");
	$("#contactInformation").removeAttr("disabled");
	$("#state").removeAttr("disabled");
	$("#updateReason").removeAttr("readOnly");
	$("#trainer").removeAttr("readOnly");
	$("#trainer").removeAttr("disabled");
	$("#trainerTime").removeAttr("readOnly");
	$("#trainerTime").removeAttr("disabled");
	$("#trainerMode").removeAttr("readOnly");
	$("#customerProperty").removeAttr("readOnly");
	$("#customerProperty").removeAttr("disabled");
	$('#platId').removeAttr("readOnly");
	$('#sysId').removeAttr("readOnly");
	$('#platId').removeAttr("disabled");
	$('#sysId').removeAttr("disabled");
	$("#sysUrl").removeAttr("readOnly");
	$("#remark").removeAttr("readOnly");
	$("#savebtn").removeClass("hidden");
	$("#giveupbtn").removeClass("hidden");
}
function readOnly() {
	$("#customerName").attr("readOnly", "readOnly");
	$("#createTime").attr("readOnly", "readOnly");
	$("#customerAddressP_").attr("readOnly", "readOnly");
	$("#customerAddressC_").attr("readOnly", "readOnly");
	$("#contact").attr("readOnly", "readOnly");
	$("#contactInformation").attr("readOnly", "readOnly");
	$("#state").attr("disabled","disabled");
	$("#updateReason").attr("readOnly", "readOnly");
	$("#trainer").attr("readOnly", "readOnly");
	$("#trainer").attr("disabled", "disabled");
	$("#trainerTime").attr("readOnly", "readOnly");
	$("#trainerTime").attr("disabled","disabled");
	$("#trainerMode").attr("readOnly", "readOnly");
	$("#responsiblePerson").attr("readOnly", "readOnly");
	$("#customerProperty").attr("readOnly", "readOnly");
	$("#customerProperty").attr("disabled","disabled");
	$('#platId').attr("readOnly", "readOnly");
	$('#sysId').attr("readOnly", "readOnly");
	$('#platId').attr("disabled", "disabled");
	$('#sysId').attr("disabled", "disabled");
	$("#sysUrl").attr("readOnly", "readOnly");
	$("#remark").attr("readOnly", "readOnly");
	$("#savebtn").addClass("hidden");
	$("#giveupbtn").addClass("hidden");
}

function fillForm(customer) {
	$("#signupForm").data('validator').resetForm();
	$("#sysId").html('');
	for (var i = 0; i < gassyss.length; i++) {
        $('#sysId').append("<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
    }
	$("#csId").val(customer.csId);
	$("#customerId").val(customer.customerId);
	$("#customerName").val(customer.customerName);
	$("#createTime").parent().parent().show();
	$("#createTime").val(customer.createTime);
	$('#adress-distpicker').distpicker('destroy');
	$('#adress-distpicker').distpicker({
		province: customer.customerAddressP,
		city: customer.customerAddressC
	})
	$("#customerAddressP_").attr("disabled","disabled");
	$("#customerAddressC_").attr("disabled","disabled");
	$("#contact").val(customer.contact);
	$("#contactInformation").val(customer.contactInformation);
	$("#state").parent().parent().show();
	$("#state").val(customer.state);
	$("#updateReason").parent().parent().show();
	$("#updateReason").val(customer.updateReason);
	$("#trainer").val(customer.trainer);
	$("#trainer").attr("disabled","disabled");
	$("#trainerTime").val(customer.trainerTime);
	$("#trainerMode").val(customer.trainerMode);
	$("#responsiblePerson").val(customer.responsiblePerson);
	$("#responsiblePerson").parent().parent().show();
	$("#responsiblePerson_").val(customer.responsiblePerson_Name);
	$("#customerProperty").val(customer.customerProperty);
	$("#platId").val(customer.platId);
	$("#sysId").val(customer.sysId);
	$("#platId").attr("disabled","disabled");
	$("#sysId").attr("disabled","disabled");
	$("#sysUrl").val(customer.sysUrl);
	$("#remark").val(customer.remark);
}

function panelResize(panelId,btnId){
	$.panelResize(panelId,btnId);
}
