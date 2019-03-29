var prefix = ctx + "common/dict"
var validator;
var optVisible = true;
var validUrl = prefix + "/exist";
$(function() {
	validateRule();
	if(s_add_h == 'hidden'){
		optVisible = false;
	}
	load();
});
function selectLoad() {
	var html = "";
	$.ajax({
		url : ctx + 'common/dict/type',
		success : function(data) {
			//加载数据
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].type + '">' + data[i].description + '</option>'
			}
			$(".chosen-select").append(html);
			$(".chosen-select").chosen({
				maxHeight : 200
			});
			//点击事件
			$('.chosen-select').on('change', function(e, params) {
				reLoad({pageNumber:1});
			});
		}
	});
}
function load() {
	selectLoad();
	$('#exampleTable')
		.bootstrapTable(
			{
				method : 'get', // 服务器数据的请求方式 get or post
				url : prefix + "/list", // 服务器数据的加载地址
				//	showRefresh : true,
				//	showToggle : true,
				//	showColumns : true,
				iconSize : 'outline',
				toolbar : '#exampleToolbar',
				resizable: true,
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				// queryParamsType : "limit",
				// //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : false, // 设置为true将禁止多选
				clickToSelect: true, //点击选中
				singleSelect : true, // 设置为true将禁止多选
				// contentType : "application/x-www-form-urlencoded",
				// //发送到服务器的数据编码类型
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageList:[5 , 10, 25, 50, 100],
				pageNumber : 1, // 如果设置了分布，首页页码
				//search : true, // 是否显示搜索框
				showColumns : false, // 是否显示内容下拉框（选择显示的列）
				sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
				queryParams : function(params) {
					return {
						//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
						limit : params.limit,
						offset : params.offset,
						sort: params.sort,
						order: params.order,
						type : $('.chosen-select').val()
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
						width:'5%',
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
						title : '标签名',
						width:'15%',
						sortable:true
					},
					{
						field : 'value',
						title : '数据值',
						 width:'15%',
						sortable:true
					},
					{
						field : 'type',
						title : '类型',
						 width:'20%',
						sortable:true
					},
					{
						field : 'description',
						title : '描述',
						 width:'20%',
						sortable:true
					},
					{
						visible : false,
						field : 'sort',
						title : '排序（升序）'
					},
					{
						visible : false,
						field : 'parentId',
						title : '父级编号'
					},
					{
						visible : false,
						field : 'createBy',
						title : '创建者'
					},
					{
						visible : false,
						field : 'createDate',
						title : '创建时间'
					},
					{
						visible : false,
						field : 'updateBy',
						title : '更新者'
					},
					{
						visible : false,
						field : 'updateDate',
						title : '更新时间'
					},
					{
						visible : false,
						field : 'remarks',
						title : '备注信息'
					},
					{
						visible : false,
						field : 'delFlag',
						title : '删除标记'
					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
						visible : optVisible,
						 width:'10%',
						formatter : function(value, row, index) {
							var f = '<a class="btn btn-success btn-sm ' + s_add_h + '" href="#" title="增加"  mce_href="#" onclick="addD(\''
								+ row.type +'\',\''+row.description
								+ '\')"><i class="fa fa-plus"></i></a> ';
							return f;
						}
					} ],
					// 行点击事件
					onClickRow : function(row) {
						readOnly();
						clear() ;
						validator.resetForm();
						fillForm(row);
					},
					onLoadSuccess : function(e, data) {
						validator.resetForm();
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
				maxlength:50  
			},
			value : {
				required : true,
				maxlength:100  
			},
			type : {
				required : true,
				maxlength:100  
			},
			description : {
				required : true,
				maxlength:100  
			},
			remarks : {
				maxlength:100  
			}
		},
		messages : {
			name : {
				required : icon + "请输入标签名称"
			},
			value : {
				required : icon + "请输入标签值"
			},
			type : {
				required : icon + "请输入类型"
			},
			description : {
				required : icon + "请输入描述"
			}
		}
	})
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
	$("#opt").val("save");
	writeAble();
}

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
function remove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据")
		return;
	}
	readOnly();
	validator.resetForm();
	var dictId = rows[0].id;
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove/" + dictId,
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


function addD(type,description) {
	
	$.stopBubbling(event);
	validator.resetForm();
	clear();
	$("#opt").val("save");
	$("#type").val(type);
	$("#description").val(description);
	writeAble();
	$("#type").attr("readOnly","readOnly");
	$("#description").attr("readOnly","readOnly");

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
				writeAble();
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

function clear() {
	$("#id").val('');
	$("#name").val('');
	$("#value").val('');
	$("#type").val('');
	$("#description").val('');
	$("#remarks").val('');
}

function writeAble() {
	$("#cancelbtn").removeClass("hidden");
	$("#savebtn").removeClass("hidden");
	$("#name").removeAttr("readOnly");
	$("#value").removeAttr("readOnly");
	$("#type").removeAttr("readOnly");
	$("#description").removeAttr("readOnly");
	$("#remarks").removeAttr("readOnly");

}
function readOnly() {
	$("#cancelbtn").addClass("hidden");
	$("#savebtn").addClass("hidden");
	$("#name").attr("readOnly","readOnly");
	$("#value").attr("readOnly","readOnly");
	$("#type").attr("readOnly","readOnly");
	$("#description").attr("readOnly","readOnly");
	$("#remarks").attr("readOnly","readOnly");
}

function fillForm(dict) {
	$("#id").val(dict.id);
	$("#name").val(dict.name);
	$("#value").val(dict.value);
	$("#type").val(dict.type);
	$("#description").val(dict.description);
	$("#remarks").val(dict.remarks);
}
function resize(panelId,btnId){
	$.panelResize(panelId,btnId);
}