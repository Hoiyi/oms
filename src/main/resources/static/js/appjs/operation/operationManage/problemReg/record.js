var prefix = "/operation/record";
var  inputId;
var inputName;
var validator;
var gassyss;
var knowledge;
var customer;
var stateChoose;
var stateValue;
var propertyChoose;
var propertyValue;
var autoCustomers = [];
var autoDescribes = [];
var customers;
var describes;

$(function() {
	validateRule();
	keyProblem();
	proState();
	waste();
	wasteTimeSearch();
	customersSelect();
	describeSelect()
	area();
	proTypeSearch();
	proType();
	userSearch();
	gasSystem();
	load();
     
	//筛选客户名称和问题描述
	var option = {
			max: 3,    //列表里的条目数
			minChars: 0,    //自动完成激活之前填入的最小字符
			width: 400,     //提示的宽度，溢出隐藏
			scrollHeight: 10,   //提示的高度，溢出显示滚动条
			matchContains: false,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
			autoFill: true,    //自动填充
			minLength: 0,
			select: function (event, ui) {
				for(var i = 0 ; i < customers.length ; i++){
					if(customers[i].customerId == ui.item.id){
						$('#customerId').val(customers[i].customerId);
						$('#responsiblePerson').val(customers[i].responsiblePerson);
					}
				} 
			}
	};
	$('#customerName').autocomplete({source: autoCustomers},option);
	$('#proDescribe').autocomplete({source: autoDescribes},option);
	
	//bind() 方法为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数
	$(window).bind("load resize", function () {
		$(".list-content").css("min-height",(document.body.clientHeight-100)+'px');
		$(".ibox-content").css("min-height",(document.body.clientHeight-100)+'px');
	});
	
	//搜索回车相应事件
	$(".enterSearch").on('keydown', function() {
		if (event.keyCode == 13) {
			reLoad();
		}
	});
		
	//根据客户选择系统
	$("#customerName").change(function(){
		$("#sysName").removeAttr("disabled");
		$("#sysName").removeAttr("readOnly");
		$('#sysName').html('');
		for(var i = 0 ; i < gassyss.length ; i++){
			if($("#customerId").val() == gassyss[i].customerId){
				$('#sysName').append("<option value=" +gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
			}
		}
	});
	
	//根据选择系统存入ID
	 $("#sysName").on("change",function(){
		 console.log(gassyss);
		for(var i = 0 ; i < gassyss.length ; i++){
			if($("#sysName").val() == gassyss[i].sysId){
				//alert(gassyss[i].sysId);
				$('#sysId').val($("#sysName").val());
			}
		}
	});
	

//将所有.ui-choose实例化
$('.ui-choose').ui_choose();
//select 多选
stateChoose = $('#stateSearch').ui_choose();
propertyChoose = $('#problemSearch').ui_choose();

stateChoose.click = function(values, item) {
	var filters = $(".filter-item");
	filters.each(function(){
		var filter = $(this);
		if(filter.attr('data-name') == 'state' && filter.attr('data-value') == item.attr('data-value')){
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
		if(filter.attr('data-name') == 'problem' && filter.attr('data-value') == item.attr('data-value')){
			filter.remove();
		}	
	});
	$.checkCondition();
	if(propertyChoose.selected().indexOf(",") == 1){
		propertyValue = "";
		console.log(propertyValue);
	}else{
		propertyValue = propertyChoose.selected();
	}
	reLoad();
};
load();
});

//设置默认属性
$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});


//查询客户列表
function customersSelect(){
	$.ajax({
	    url:'/operation/customermanage/customerlist',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	customers = data;
	    	console.log(customers);
	    	for(var i=0; i<data.length; i++){
				autoCustomers.push({id :data[i].customerId,label: data[i].customerName});
			}

	    }
	});
}

//查询问题列表
function describeSelect(){
	$.ajax({
	    url:'/knowledge/knowledgeStore/list',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	describes = data.rows;
	    	for(var i=0; i<describes.length; i++){
	    		autoDescribes.push({id :describes[i].klId, label: describes[i].describe });
			}

	    }
	});
}

//查询系统列表
function gasSystem(){
$.ajax({
	// get请求地址
	    url: '/operation/record/gaslist',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	gassyss = data.rows;
	    }
	});
}

/*function gasSystem(){
	//使用系统
	$.ajax({
		// get请求地址
		    url: '/common/gasSystem/list',
		    dataType: "json",
		    async:false,
		    success: function (data) {
		    	gassyss = data.rows;
		        for (var i = 0; i < gassyss.length; i++) {
		        	$('#sysId').append("<option value=" + gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
		        }
		    }
		});
	}*/

//登记人员查询
function userSearch(){	
	$.ajax({
		    url: '/sys/user/list',
		    dataType: "json",
		    async:false,
		    success: function (data) {
		    	user = data.rows;
		        for (var i = 0; i < user.length; i++) {
		            $('#userSearch').append("<option value=" + user[i].userId + ">" + user[i].name + "</option>");
		        }
		    }
		});
}

//问题类型列表查询
function proType(){
	$.ajax({
		    url: '/common/dict/list/pro_type',
		    dataType: "json",
		    async:false,
		    success: function (data) {
		    	$(data).each(function(){
		    		$('#proType').append("<option value=" + this.value+ ">" + this.name + "</option>");
		    	});
		    }
		});
}

//问题类型列表查询
function proTypeSearch(){
	$.ajax({
		    url: '/common/dict/list/pro_type',
		    dataType: "json",
		    async:false,
		    success: function (data) {
		    	$(data).each(function(){
		    		$('#proTypeSearch').append("<option value=" + this.value+ ">" + this.name + "</option>");
		    	});
		    }
		});
}

//所属片区列表查询
function area(){
	$.ajax({
	    url: '/common/district/list',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    	districts = data.rows;
	        for (var i = 0; i < districts.length; i++) {
	            $('#districtIdSearch').append("<option value=" + districts[i].principalId + ">" + districts[i].distName + "</option>");
	        }
	    }
	});

}

//耗时填写
function waste(){
	$.ajax({
		    url: '/common/dict/list/waste_time',
		    dataType: "json",
		    async:false,
		    success: function (data) {
		    	$(data).each(function(){
		    		$('#wasteTime').append("<option value=" + this.value+ ">" + this.name + "</option>");
		    	});
		    }
		});
}

//耗时筛选
function wasteTimeSearch(){
	$.ajax({
		    url: '/common/dict/list/waste_time',
		    dataType: "json",
		    async:false,
		    success: function (data) {
		    	$(data).each(function(){
		    		$('#wasteTimeSearch').append("<option value=" + this.value+ ">" + this.name + "</option>");
		    	});
		    }
		});
}

//问题状态列表查询
function proState(){
	$.ajax({
		    url: '/common/dict/list/pro_state',
		    dataType: "json",
		    async:false,
		    success: function (data) {
		    	$(data).each(function(){
		    		$('#proState').append("<option value=" + this.value+ ">" + this.name + "</option>");
		    	});
		    }
		});
}

//重点问题列表查询
function keyProblem(){
	$.ajax({
		    url: '/common/dict/list/key_problem',
		    dataType: "json",
		    async:false,
		    success: function (data) {
		    	$(data).each(function(){
		    		$('#keyProblem').append("<option value=" + this.value+ ">" + this.name + "</option>");
		    	});
		    }
		});
}

//放弃按钮
$("#giveupbtn").on("click",function(){
	layer.confirm('确定要放弃？', {
		btn : [ '确定', '取消' ]
	}, function() {
		layer.closeAll('dialog');
		reLoad();
	})
});

//验证必填
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	validator = $("#signupForm").validate({
		rules : {
			keyProblem : {
				required : true
			},
			proState : {
				required : true
			},
			wasteTime : {
				required : true
			},
			proType : {
				required : true
			}
		}
	
	})
}

//表格及数据
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
		//设置为limit则会发送符合RESTFull格式的参数
		singleSelect : true, // 设置为true将禁止多选
		// contentType : "application/x-www-form-urlencoded",
		//发送到服务器的数据编码类型
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
				proDescribe : $('#proDescribeSearch').val(),
				proState : stateValue,
				keyProblem : propertyValue,
				proType : $('#proTypeSearch').val(),
				ResponsiblePerson : $('#districtIdSearch').val(),
				userId : $('#userSearch').val(),
				wasteTime : $('#wasteTimeSearch').val(),
			};
		},
		// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
		// queryParamsType = 'limit' ,返回参数必须包含
		// limit, offset, search, sort, order 否则, 需要包含:
		// pageSize, pageNumber, searchText, sortName,
		// sortOrder.
		// 返回false将会终止请求
		columns : [ {
			checkbox :true
		},{
            title: '序号',
            align:'center',
            width:'50px',
            formatter:function(value,row,index){
                //return index+1; //序号正序排序从1开始
                var pageSize=$('#exampleTable').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#exampleTable').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return pageSize * (pageNumber - 1) + index + 1;    //返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
            }
		}, {
			field : 'proDescribe',
			title : '问题描述'
		}, {
			field : 'customerName',
			title : '客户名称'
		} , {
			field : 'proStateName',
			title : '问题状态'
		} , {
			field : 'keyProblemName',
			title : '重点问题'
		}],
					
		// 行点击事件
		onClickRow : function(row) {
			readOnly();
			validator.resetForm();
			fillForm(row);
		},
		onLoadSuccess : function(e, data) {
			readOnly();
			if ($('#exampleTable').bootstrapTable('getData').length > 0) {
				$('#exampleTable').bootstrapTable('check', 0);
				var rows = $('#exampleTable').bootstrapTable('getSelections');
				console.log($('#exampleTable').bootstrapTable('getData' ));
				if (rows.length > 0) {
					fillForm(rows[0]);
					
				}
			}
		}
	});
}


//重新加载
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}

//添加
function add() {
	clear();
	$("#opt").val("save");
	writeAble();
}

//保存
function save() {
	var opt = $("#opt").val();
	console.log(($('#signupForm').serialize()));
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
				layer.msg("操作成功");
			} else {
				layer.msg(data.msg)
			}
		}
	});
}

//编辑
function edit() {
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

//移除
function remove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据")
		return;
	}
	var reId = rows[0].reId;
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove/" + reId,
			type : "GET",
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

//清空文本
function clear(record) {
	$("#reId").val('');
	$('#customerName').val('');
	$("#customerId").val('');
	$("#sysName").val('');
	$("#sysId").val('21');
	$("#proTypeName").val('');
	$("#proType").val('1');
	$("#proDescribe").val('');
	$("#wasteTimeName").val('');
	$("#wasteTime").val('1');
	$("#proStateName").val('');
	$("#proState").val('1');
	$("#keyProblemName").val('');
	$("#keyProblem").val('0');
	$("#updateTime").val('');
	$("#updateTime").parent().parent().hide();
	$("#message").val('');	
	$("#userId").val('');	
	$("#userName").val('');	
	$("#responsiblePerson").val('');	
	$("#serchCname").val('');	
}

function writeAble() {
	$("#reId").removeAttr("disabled");
	$('#customerId').removeAttr('disabled');
	$('#customerId').removeAttr('readOnly');
	$('#customerName').removeAttr('disabled');
	$('#customerName').removeAttr('readOnly');
	$("#sysId").removeAttr("disabled");
	$("#sysId").removeAttr("readOnly");
	$("#sysName").parent().parent().show();
	//$("#sysName").removeAttr("disabled");
    //$("#sysName").removeAttr("readOnly");
	$("#describe").removeAttr("disabled");
	$("#proType").removeAttr("disabled");
	$("#proDescribe").removeAttr("readOnly");
	$("#wasteTime").removeAttr("disabled");
	$("#proState").removeAttr("disabled");
	$("#keyProblem").removeAttr("disabled");
	$("#proType").removeAttr("readOnly");
	$("#wasteTime").removeAttr("readOnly");
	$("#proState").removeAttr("readOnly");
	$("#keyProblem").removeAttr("readOnly");
	$("#message").removeAttr("readOnly");
	$("#savebtn").removeClass("hidden");
	$("#giveupbtn").removeClass("hidden");
	$("#userId").removeAttr("disabled");
	$("#userName").removeAttr("disabled");
	$("#responsiblePerson").removeAttr("disabled");
	$("#serchCname").removeAttr("disabled");
}

function readOnly() {
	$("#reId").attr("disabled","disabled");
	$("#customerId").attr("readOnly","readOnly");
	$("#customerId").attr("disabled","disabled");
	$("#customerName").attr("readOnly","readOnly");
	$("#customerName").attr("disabled","disabled");
	$("#sysId").attr("readOnly","readOnly");
	$("#sysId").attr("disabled","disabled");
	$("#sysName").attr("readOnly","readOnly");
	$("#sysName").attr("disabled","disabled");
	$("#proDescribe").attr("readOnly","readOnly");
	$("#updateTime").attr("readOnly","readOnly");
	$("#message").attr("readOnly","readOnly");	
	$("#proType").attr("readOnly","readOnly");
	$("#wasteTime").attr("readOnly","readOnly");
	$("#proState").attr("readOnly","readOnly");
	$("#keyProblem").attr("readOnly","readOnly");
	$("#proType").attr("disabled","disabled");
	$("#wasteTime").attr("disabled","disabled");
	$("#proState").attr("disabled","disabled");
	$("#keyProblem").attr("disabled","disabled");
	$("#savebtn").addClass("hidden");
	$("#giveupbtn").addClass("hidden");
	$("#userId").attr("disabled","disabled");
	$("#userName").attr("disabled","disabled");
	$("#responsiblePerson").attr("disabled","disabled");
	$("#serchCname").attr("disabled","disabled");
}

function fillForm(record) {
	$("#reId").val(record.reId);
//	$('#sysName').html('');
//	for(var i = 0 ; i < gassyss.length ; i++){
//		console.log(gassyss[i].sysId+gassyss[i].sysName);
//		$('#sysName').append("<option value=" +gassyss[i].sysId + ">" + gassyss[i].sysName + "</option>");
//	}
	$("#reId").attr("disabled","disabled");
	$("#customerName").val(record.customerName);
	$("#customerId").val(record.customerId);
//	$("#sysName").val(record.Name);
	//$("#sysName").parent().parent().hide();
	//alert(record.sysName);
	$('#sysName').append("<option selected='selected' value=" +record.sysId + ">" + record.sysName + "</option>");
	$("#sysId").val(record.sysId);
	$("#proTypeName").val(record.proTypeName);
	$("#proType").val(record.proType);
	$("#proDescribe").val(record.proDescribe);
	$("#wasteTimeName").val(record.wasteTimeName);
	$("#wasteTime").val(record.wasteTime);
	$("#proStateName").val(record.proStateName);
	$("#proState").val(record.proState);
	$("#keyProblemName").val(record.KeyProblemName);
	$("#keyProblem").val(record.keyProblem);
	$("#updateTime").val(record.updateTime);
	$("#updateTime").parent().parent().show();
	$("#message").val(record.message);
	$("#userId").val(record.userId);
	$("#userName").val(record.userName);
	$("#responsiblePerson").val(record.responsiblePerson);	
}  

function resize(panelId,btnId){
	$.panelResize(panelId,btnId);
}
