var prefix = ctx + "sys/user";

//搜索选择器
var allConditionChoose;
var conditionSexChoose;
var conditionStatusChoose;
//表单选择器
var statusChoose;
var roleChoose;
var validator;
var validUrl = prefix + "/exist";
var optVisible = true;
$(function() {
	
	if(s_resetPwd_h=='hidden'){
		optVisible = false;
	}

//	var deptId = '';
//	getTreeData();
	
	
//search start	
	//搜索响应回车事件
	  $(".onblurSearch").on('blur',function(){
      		var input = $(this).attr('name');
      		var val = $(this).val();
      		var filters = $(".filter-item");
      		var exits = false;
      		filters.each(function(){
    			var filter = $(this);
	    		if(filter.attr('input-name') == input){
	    			exits = true;
	    				if(val != ''){
	    					filter.text(val);
	    				}else{
	    					filter.remove();
	    				}
	    				return;
	    			}
      			});
      		
      		if(!exits){
      			if(val != ''){
      				var li = '<li class="filter-item selected" data-name="input" input-name="'+ input +'" title="'+val+'">'+val+'</li>';
  						$(".filter-header").append(li);
          		}else{
          				return;
          			}
  					
  				}
      		$.checkCondition();
      		reLoad({pageNumber:1});
  	});

	// 将所有.ui-choose实例化
	$('.ui-choose').ui_choose();
	//select 多选
	allConditionChoose = $('#allCondition').ui_choose();
	conditionSexChoose = $('#condition-sex').ui_choose();
	conditionStatusChoose = $('#condition-status').ui_choose();
	statusChoose = $('#status-select').data('ui-choose');
	roleChoose = $('#role-select').ui_choose();
	statusChoose.disabled();
	roleChoose.disabled();
	statusChoose.selectFirst();
	$("#status").val(statusChoose.selected())
	statusChoose.click = function(values, item){
		$("#status").val(values);
	}
	roleChoose.click = function(values, item){
		//roleChoose.selected()
//		console.log(values);
		$("#roleIds").val(values);
	}
	
	
	conditionSexChoose.click = function(values, item) {
		var filters = $(".filter-item");
		filters.each(function(){
			var filter = $(this);
			if(filter.attr('data-name') == 'sex' ){
				filter.remove();
			}
		});
		if(item.hasClass("selected")){
			var li = '<li class="filter-item selected" data-name=\"sex\" data-value="'+item.attr('data-value')+'" title="'+item.text()+'">'+item.text()+'</li>';
			$(".filter-header").append(li);
			conditionSexChoose.unSelect(values);
			conditionSexChoose.select(item.attr("data-value"));
		}
		
		$.checkCondition();
		reLoad({pageNumber:1});
	};
	conditionStatusChoose.click = function(value, item) {
		
		var filters = $(".filter-item");
		filters.each(function(){
			var filter = $(this);
			if(filter.attr('data-name') == 'status'){
				filter.remove();
			}
		});
		if(item.hasClass('selected')){
			var li = '<li class="filter-item selected" data-name=\"status\" data-value="'+item.attr('data-value')+'" title="'+item.text()+'">'+item.text()+'</li>';
			$(".filter-header").append(li);
			conditionStatusChoose.unSelect(value);
			conditionStatusChoose.select(item.attr("data-value"));
		}
		$.checkCondition();
		reLoad({pageNumber:1});
	};

	$(document).on("click",'.filter-item', function(e){
		 var data_name = $(this).attr('data-name');
		 var data_value = $(this).attr('data-value');
		 var input_name = $(this).attr('input-name');
		 if(data_name == 'noCondition'){
			 return;
		 }else if(data_name == 'input'){
			 $('#'+input_name).val('');
			 reLoad({pageNumber:1});
		 }else{
			 $(this).hide(200, function(){
				 if(data_name == 'sex'){
					 conditionSexChoose.unSelect(data_value);
				 }else if(data_name == 'status'){
					 conditionStatusChoose.unSelect(data_value);
				 }
				 reLoad({pageNumber:1});
			});
		 }
		 $(this).remove() ;
		 $.checkCondition();
	}); 
	load();
	validateRule();
	
	
	//生成邮箱
	$("#name").on("change", function() {
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
//search end


$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});


function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	validator = $("#signupForm").validate({
		rules : {
			name : {
				required : true,
				maxlength:100
			},
			username : {
				required : true,
				remote : {
					url : validUrl, // 后台处理程序
					type : "post", // 数据发送方式
					dataType : "json", // 接受数据格式
					cache: false,
					data : { // 要传递的数据
						validateUserId : function() {
							return $("#userId").val();
						},
						validateUsername : function() {
							return $("#username").val();
						}
					}
				},
				maxlength:50
			},
			deptName : {
				required : true
			},
			email : {
				required : true,
				maxlength:100
			}
		},
		messages : {
			name : {
				required : icon + "请输入姓名"
			},
			username : {
				required : icon + "请输入登录名",
				remote : icon + "登录账号已存在"
			},
			deptName : {
				required : icon + "请选择所属部门"
			},
			email : {
				required : icon + "请输入邮箱"
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
//				 showRefresh : true,
//				 showToggle : true,
//				 showColumns : true,
				iconSize : 'outline',
				resizable: true,
				toolbar : '#exampleToolbar',
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				// queryParamsType : "limit",
				// //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : true, // 设置为true将禁止多选
				clickToSelect: true, //点击选中
				// contentType : "application/x-www-form-urlencoded",
				// //发送到服务器的数据编码类型
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageList:[5 , 10, 25, 50, 100],
				pageNumber : 1, // 如果设置了分布，首页页码
				// search : true, // 是否显示搜索框
				showColumns : false, // 是否显示内容下拉框（选择显示的列）
				sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
				// "server"
				queryParams : function(params) {
					return {
						// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
						limit : params.limit,
						offset : params.offset,
						name : $('#condition-name').val(),
						status: conditionStatusChoose.selected(),
						sex:conditionSexChoose.selected(),
						email: $('#condition-email').val(),
						username:$('#condition-username').val(),
						sort: params.sort,
						order: params.order
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
						checkbox : true,
						width:'5%'
					},
					{
						 title: '序号',
				         align:'center',
				         width:'10%',
				         formatter:function(value,row,index){
				                //return index+1; //序号正序排序从1开始
				                var pageSize=$('#exampleTable').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
				                var pageNumber=$('#exampleTable').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
				                return pageSize * (pageNumber - 1) + index + 1;    //返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
				         }
					},
					{
						field : 'name',
						title : '姓名',
						sortable:true,
						width:'20%'
					},
					{
						field : 'username',
						title : '用户名',
						sortable:true,
						width:'15%'
					},
					{
						field : 'email',
						title : '邮箱',
						sortable:true,
						width:'25%'
					},
					{
						field : 'status',
						title : '状态',
						align : 'center',
						width:'15%',
						sortable:true,
						formatter : function(value, row, index) {
							if (value == '0') {
								return '<span class="label label-danger">禁用</span>';
							} else if (value == '1') {
								return '<span class="label label-primary">正常</span>';
							}
						}
					},
					{
						title : '操作',
						field : 'id',
						visible : optVisible,
						width:'10%',
						align : 'center',
						formatter : function(value, row, index) {
							
							var f = '<a class="btn btn-success btn-sm ' + s_resetPwd_h + '" href="#" title="重置密码"  mce_href="#" onclick="resetPwd(\''
								+ row.userId
								+ '\')"><i class="fa fa-key"></i></a> ';
							return f;
						}
					} ],
					// 行点击事件
					onClickRow : function(row) {
						readOnly();
						clear() ;
						validator.resetForm();
						fillForm(row);
					} ,
					onLoadSuccess : function(e, data) {
						readOnly();
						if ($('#exampleTable').bootstrapTable('getData').length > 0) {
							$('#exampleTable').bootstrapTable('check', 0);
							var rows = $('#exampleTable').bootstrapTable('getSelections');
							if (rows.length > 0) {
								fillForm(rows[0]);
//								loadUsed(rows[0]);
							}
						}
						
					}
			});
}


function reLoad(params) {
	if(params){
		$('#exampleTable').bootstrapTable('refreshOptions',params);
		$('#exampleTable').bootstrapTable('refresh');
	}else{
		$('#exampleTable').bootstrapTable('refresh');
	}
}

function add() {
	clear();
	validator.resetForm();
	$("#opt").val("save");
	statusChoose.selectFirst();
	$("#status").val(statusChoose.selected())
	writeAble();
}


function remove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据")
		return;
	}
	readOnly();
	validator.resetForm();
	var userId = rows[0].userId;
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove/" + userId,
			type : "GET",
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad({pageNumber:1});
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}

function edit() {
	$("#opt").val("update");
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要编辑的数据")
		return;
	}
	validator.resetForm();
	clear();
	var row = rows[0];
	fillForm(row);
	writeAble();
}
function resetPwd(userId) {
	layer.confirm('确定要重置密码？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/adminResetPwd/" + userId,
			type : "GET",
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}


function clear(){
	$("#userId").val('');
	$("#name").val('');
	$("#username").val('');
	$("#deptId").val('');
	$("#deptName").val('');
	$("#dataPerms").val('');
	$("#dataPermsName").val('');
	$("#email").val('');
	$("#roleIds").val('');
	roleChoose.select('');
}

function writeAble(){
	roleChoose.enabled();
	statusChoose.enabled();
	$("#cancelbtn").removeClass("hidden");
	$("#savebtn").removeClass("hidden");
	$("#name").removeAttr("readonly"); 
	$("#username").removeAttr("readonly"); 
	$("#deptName").removeAttr("disabled"); 
	$("#dataPermsName").removeAttr("disabled"); 
	$("#email").removeAttr("readonly"); 
}


function readOnly(){
	$("#cancelbtn").addClass("hidden");
	$("#savebtn").addClass("hidden");
	roleChoose.disabled();
	statusChoose.disabled();
	$("#name").attr("readonly","readonly"); 
	$("#username").attr("readonly","readonly"); 
	$("#deptName").attr("disabled","disabled"); 
	$("#dataPermsName").attr("disabled","disabled"); 
	$("#email").attr("readonly","readonly"); 
}

function fillForm(row){
	$("#userId").val(row.userId);
	$("#name").val(row.name);
	$("#username").val(row.username);
	$("#status").val(row.status);
	$("#deptId").val(row.deptId);
	$("#deptName").val(row.deptName);
	$("#dataPerms").val(row.dataPerms);
	$("#email").val(row.email);
	statusChoose.select(row.status);
	ownRoles(row.userId);
	ownDataPerms(row.userId)
}

function save() {
	readOnly();
	var opt = $("#opt").val();
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
				if(opt == 'update'){
					reLoad();
				}else{
					reLoad({pageNumber:1});
				}
			} else {
				writeAble()
			}
			layer.msg(data.msg)
		}
	});
}

function cancel(){
	validator.resetForm();
	clear();
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if(rows.length == 0){
		if ($('#exampleTable').bootstrapTable('getData').length > 0) {
			$('#exampleTable').bootstrapTable('check', 0);
			rows = $('#exampleTable').bootstrapTable('getSelections');
			if (rows.length > 0) {
				fillForm(rows[0]);
			}
		}
	}else{
		var row = rows[0];
		fillForm(row);
	}
	readOnly();
}

function ownRoles(userId){
	$.ajax({
		type : "GET",
		url : prefix + "/ownRoles/" + userId,
		success : function(roleIds) {
			roleChoose.select(roleIds);
			$("#roleIds").val(roleIds);
		}
	});
}

function ownDataPerms(userId){
	$.ajax({
		type : "GET",
		url : prefix + "/ownDataPerms/" + userId,
		success : function(data) {
			$("#dataPermsName").val(data.dataPermNames);
			$("#dataPerms").val(data.dataPermIds);
		}
	});
}


var openDept = function(){
	layer.open({
		type:2,
		title:"选择部门",
		area : [ '25%', '75%' ],
		content: ctx + "sys/dept/treeView"
	})
}
var openPerms = function(){
	layer.open({
		type:2,
		title:"数据权限",
		area : [ '25%', '75%' ],
		content: ctx + "sys/dept/permsView"
	})
}
function loadDept( deptId,deptName){
	$("#deptId").val(deptId);
	$("#deptName").val(deptName);
	$("#deptName").valid();
}

function loadPerms(ids,names){
	$("#dataPerms").val(ids.split(','));
	$("#dataPermsName").val(names);
}
function getPerms(){
	//console.log($("#dataPerms").val())
	return $("#dataPerms").val();
}
function resize(panelId,btnId){
	$.panelResize(panelId,btnId);
}