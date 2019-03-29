var prefix = ctx + "sys/role";
var validator;
$(function() {
	load();
	//搜索响应回车事件
	  $(".enterSearch").on('keydown',function(){
    	if(event.keyCode==13){
    		reLoad({pageNumber:1});
    	}
	});
	validateRule();
});



$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});


function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	validator = $("#signupForm").validate({
		rules : {
			roleName : {
				required : true,
				remote : {
					url : prefix + "/exist", // 后台处理程序
					type : "post", // 数据发送方式
					dataType : "json", // 接受数据格式
					cache: false,
					data : { // 要传递的数据
						validateRoleName : function() {
							return $("#roleName").val();
						},
						validateRoleId : function() {
							return $("#roleId").val();
						}
					}
				},
				maxlength:100
			},
			remark:{
				maxlength:100
			}
		},
		messages : {
			roleName : {
				required : icon + "请输入角色名称",
				remote : icon + "角色名称已存在"
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
						striped : true, // 设置为true会有隔行变色效果
						dataType : "json", // 服务器返回的数据类型
						pagination : true, // 设置为true会在底部显示分页条
						// queryParamsType : "limit",
						// //设置为limit则会发送符合RESTFull格式的参数
						singleSelect : true, // 设置为true将禁止多选
						clickToSelect: true, //点击选中
						iconSize : 'outline',
						toolbar : '#exampleToolbar',
						resizable: true,
						// contentType : "application/x-www-form-urlencoded",
						// //发送到服务器的数据编码类型
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageList:[5 , 10, 25, 50, 100],
						pageNumber : 1, // 如果设置了分布，首页页码
//						search : true, // 是否显示搜索框
						showColumns : false, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
						queryParams : function(params) {
							return {
								// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit : params.limit,
								offset : params.offset,
								roleName : $('#searchName').val(),
								sort: params.sort,
								order: params.order
							};
						},
						// "server"
						// queryParams : queryParams,
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
								{ // 列配置项
									// 数据类型，详细参数配置参见文档http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/
									checkbox : true,
									 width:'5%',
								// 列表中显示复选框
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
									field : 'roleName',
									title : '角色名',
									 width:'40%',
									sortable:true
								},
								{
									field : 'remark',
									 width:'45%',
									title : '备注'
								}],
								//行点击事件
								onClickRow:function (row) {
//									$('#exampleTable').bootstrapTable('uncheckAll');
									readOnly();
									validator.resetForm();
									reloadTree(row,true);
								},
								onLoadSuccess:function(e, data){
									readOnly();
									if($('#exampleTable').bootstrapTable('getData').length > 0){
										$('#exampleTable').bootstrapTable('check',0);
										var rows = $('#exampleTable').bootstrapTable('getSelections'); 
										if(rows.length > 0){
											reloadTree(rows[0],true);
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
	$("#opt").val("save");
	clear();
	writeAble();
	$.jstree.destroy ();
	getMenuTreeData();

}

function edit() {
	$("#opt").val("update");
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要修改的数据");
		return;
	}
	
	var role = rows[0];
	reloadTree(role,false);
	writeAble();
//	$.jstree.destroy ();
//	getPermTreeData(role.roleId,false);

}

function remove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据")
		return;
	}
	readOnly();
	validator.resetForm();
	var roleId = rows[0].roleId;
	reloadTree(rows[0],true)
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove/" + roleId,
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


function loadPermTree(permTree) {
	$('#permTree').jstree({
		"plugins" : [  "checkbox","themes" ],
		'core' : {
			'data' : permTree
		},
		"checkbox" : {
		}
	});
	$('#permTree').jstree('open_all');
}

function getPermTreeData(roleId,disabled) {
	var mode = "tree";
	if(disabled){
		mode = "disableTree";
	}

	$.ajax({
		type : "GET",
		url : ctx + "sys/menu/"+mode+"/" + roleId,
		success : function(data) {
			loadPermTree(data);
		}
	});
}


function getMenuTreeData() {
	$.ajax({
		type : "GET",
		url : ctx + "sys/menu/tree",
		success : function(menuTree) {
			loadPermTree(menuTree);
		}
	});
}


function reloadTree(row,disabled){
	$("#roleId").val(row.roleId);
	$("#roleName").val(row.roleName);
	$("#remark").val(row.remark);
	$.jstree.destroy();
	getPermTreeData(row.roleId,disabled);
}

function update(){
	readOnly();
	var ref = $('#permTree').jstree(true); // 获得整个树
	menuIds = ref.get_selected(); // 获得所有选中节点的，返回值为数组
	//半选状态
	$("#permTree").find(".jstree-undetermined").each(function(i, element) {
		menuIds.push($(element).closest('.jstree-node').attr("id"));
	});

	$('#menuIds').val(menuIds);
	var role = $('#signupForm').serialize();
	var opt = $("#opt").val();
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "sys/role/" + opt,
		data : role, // 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(r) {
			if (r.code == 0) {
				if(opt == 'update'){
					reLoad();
				}else{
					reLoad({pageNumber:1});
				}
			} else{
				writeAble()
			}
			layer.msg(r.msg);
		}
	});
}

function cancel(){
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if(rows.length == 0){
		if ($('#exampleTable').bootstrapTable('getData').length > 0) {
			$('#exampleTable').bootstrapTable('check', 0);
			rows = $('#exampleTable').bootstrapTable('getSelections');
			if (rows.length > 0) {
				reloadTree(rows[0],true);
			}
		}
	}else{
		reloadTree(rows[0],true);
	}
	readOnly();
	validator.resetForm();
}

function readOnly(){
	$("#cancelbtn").addClass("hidden");
	$("#savebtn").addClass("hidden");
	$("#roleName").attr("readonly","readonly");
	$("#remark").attr("readonly","readonly");
}


function writeAble(){
	$("#cancelbtn").removeClass("hidden");
	$("#savebtn").removeClass("hidden");
	$("#roleName").removeAttr("readonly"); 
	$("#remark").removeAttr("readonly"); 
}

function clear(){
	var ref = $('#permTree').jstree(true); // 获得整个树
	ref.deselect_all();
	$("#menuIds").val('');
	$("#roleId").val('');
	$("#roleName").val('');
	$("#remark").val('');
}

function resize(panelId,btnId){
	$.panelResize(panelId,btnId);
}