var prefix = ctx + "common/knowledgeClass";
var  inputId;
var inputName;
var validator;
$(function() {
	load();
	platformSelect();
	validateRule();
	// 搜索响应回车事件
	$(".enterSearch").on('keydown', function() {
		if (event.keyCode == 13) {
			reLoad({pageNumber:1});
		}
	});
});

function platformSelect(){
	$.ajax({
	// get请求地址
	    url: ctx + 'common/platform/platList',
	    dataType: "json",
	    async:false,
	    success: function (data) {
	    var optArr = [];
	        for (var i = 0; i < data.length; i++) {
	            $('#platId').append("<option value=" + data[i].platId + ">" + data[i].platDes + "</option>");
	        }
	        $('#platId').selectpicker('render');
	        $('#platId').prop('disabled', true);
	    }
	});
	$('#platId').on('change',function(e){
		$("#platId").valid();
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
			platId : {
				required : true
			},
			klClassName : {
				required : true,
				remote : {
					url : prefix + "/exist", // 后台处理程序
					type : "post", // 数据发送方式
					dataType : "json", // 接受数据格式
					cache: false,
					data : { // 要传递的数据
						validateKlClassName : function() {
							return $("#klClassName").val();
						},
						validateKlClassId: function() {
							return $("#klClassId").val();
						}
					}
				},
				maxlength:200
			},
			remark:{
				maxlength:255
			}
		},
		
		messages : {
			platId : {
				required : icon + "请选择所属平台"
				
			},
			klClassName : {
				required : icon + "请输入类型描述",
				remote : icon + "类型描述已存在"
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
		resizable: true,
		striped : true, // 设置为true会有隔行变色效果
		dataType : "json", // 服务器返回的数据类型
		pagination : true, // 设置为true会在底部显示分页条
		// queryParamsType : "limit",
		// //设置为limit则会发送符合RESTFull格式的参数
		singleSelect : true, // 设置为true将禁止多选
		// contentType : "application/x-www-form-urlencoded",
		// //发送到服务器的数据编码类型
		pageSize : 10, // 如果设置了分页，每页数据条数
		pageList:[5 , 10, 25, 50, 100],
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
				klClassName : $('#searchName').val(),
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
		columns : [ {
			checkbox : true,
			 width:'5%',
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
			field : 'klClassName',
			title : '类型描述',
			width:'30%',
			sortable:true
		}, {
			field : 'createrName',
			title : '创建人',
			width:'15%',
			sortable:true
		} , {
			field : 'createTime',
			title : '创建时间',
			width:'20%',
			sortable:true
		}, {
			field : 'platDes',
			title : '所属平台',
			width:'20%',
			sortable:true
		}],
		// 行点击事件
		onClickRow : function(row) {
			readOnly();
			validator.resetForm();
			fillForm(row);
			console.log(row)
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

function save() {
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
				readOnly();
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
	var klClassId = rows[0].klClassId;
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove/" + klClassId,
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
	$('#platId').selectpicker('val', '');
	$("#klClassId").val('');
	$("#klClassName").val('');
	$("#remark").val('');
}

function writeAble() {
	$("#cancelbtn").removeClass("hidden");
	$("#savebtn").removeClass("hidden");
	$('#platId').prop('disabled', false);
	$("#klClassName").removeAttr("readOnly");
	$("#remark").removeAttr("readOnly");

}
function readOnly() {
	$("#cancelbtn").addClass("hidden");
	$("#savebtn").addClass("hidden");
	$('#platId').prop('disabled', true);
	$("#klClassName").attr("readOnly", "readOnly");
	$("#remark").attr("readOnly", "readOnly");
}

function fillForm(knowledgeClass) {
	$('#platId').selectpicker('val', knowledgeClass.platId);
	$("#klClassId").val(knowledgeClass.klClassId);
	$("#klClassName").val(knowledgeClass.klClassName);
	$("#remark").val(knowledgeClass.remark);

}
function resize(panelId,btnId){
	$.panelResize(panelId,btnId);
}