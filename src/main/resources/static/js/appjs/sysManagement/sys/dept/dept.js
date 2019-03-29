var prefix = ctx + "sys/dept";
var validator;
$(function() {
	validateRule();
	getTreeData();
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
			name : {
				required : true,
				remote : {
					url : prefix + "/exist", // 后台处理程序
					type : "post", // 数据发送方式
					dataType : "json", // 接受数据格式
					cache: false,
					data : { // 要传递的数据
						validateName : function() {
							return $("#name").val();
						},
						validateDeptId : function() {
							return $("#deptId").val();
						}
					}
				},
				maxlength:50
			},
			orderNum : {
				number : true,
				maxlength:5
			}
		},
		messages : {
			name : {
				required : icon + "请输入部门名称",
				remote : icon + "部门名称已存在"
			},
			orderNum:{
				number : icon + "请输入合法数字"
			}
		
		}
	})
}



function reLoad() {
	$.jstree.destroy ();
	getTreeData();
}
function add() {
	$("#opt").val('save');
	var ref = $('#jstree').jstree(true); // 获得整个树
	var selected = ref.get_selected()[0];
	var node = ref.get_node(selected);
	var pName ;
	if(selected == -1){
		selected = 0;
		pName = topNode;
	}else{
		pName = node.text;
	}
	console.log(node)
	$("#parentId").val(selected);
	$("#pName").val(pName);
	$("#deptId").val("");
	$("#name").val("");
	$("#orderNum").val("");
	writeAble();
}
function edit() {
	var ref = $('#jstree').jstree(true); // 获得整个树
	var selected = ref.get_selected()[0];
	if(selected == -1){
		layer.msg("不可编辑顶级节点");
		return;
	}else{
		onChanged(selected);
		$("#opt").val('update');
		writeAble();
	}
}
function update() {
	readOnly();
	var opt = $("#opt").val();
	$.ajax({
		cache : true,
		type : "POST",
		url : prefix + "/" + opt,
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				readOnly();
				reLoad();
			} else {
				writeAble();
			}
			layer.msg(data.msg)
		}
	});
}
function removeone() {
	var ref = $('#jstree').jstree(true); // 获得整个树
	var selected = ref.get_selected()[0];
	onChanged(selected);
	if(selected == -1){
		layer.msg("不可删除顶级节点");
		return;
	}
	readOnly();
	validator.resetForm();
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove",
			type : "post",
			data : {
				'deptId' : selected
			},
			success : function(r) {
				if (r.code == 0) {
					reLoad();
				} 
				layer.msg(r.msg);
			}
		});
	})
}


function cancel(){
	var ref = $('#jstree').jstree(true); // 获得整个树
	var selected = ref.get_selected()[0];
	onChanged(selected);
	readOnly();
}




function getTreeData() {
	$.ajax({
		type : "GET",
		url : prefix + "/tree",
		success : function(tree) {
			loadTree(tree);
		}
	});
}
function loadTree(tree) {
	$('#jstree').jstree({
		'core' : {
			'data' : tree
		},
		"plugins" : [ "search" ]
	}).on("loaded.jstree", function (event, data) {
		//加载完成后取第一条数据，显示在右侧
		var ref = $('#jstree').jstree(true); // 获得整个树
		var node = ref.get_node(-1);
		ref.select_node(node);
		$("#pName").val("无");
		$("#name").val(node.text);
		$("#orderNum").val(0);
    }).on("changed.jstree", function(e, data) {
//    	console.log(data.selected)
    	readOnly();
    	onChanged(data.selected);
    });

	$('#jstree').jstree().open_all();
}

function onChanged(selected){
	var dept;
	validator.resetForm();
	if (selected == -1) {
		$("#pName").val("无");
		$("#name").val(topNode);
		$("#orderNum").val(0);
	} else {
		$.ajax({
			type : "GET",
			async:false,
			url : prefix + "/getById/" + selected,
			success : function(data) {
				dept = data;
				console.log(data)
			}
		});
		var ref = $('#jstree').jstree(true); // 获得整个树
		$("#parentId").val(dept.parentId);
		var pName = ref.get_node(dept.parentId).text
		if(typeof(pName) == 'undefined'){
			pName = topNode;
		}
		$("#deptId").val(dept.deptId);
    	$("#pName").val(pName);
		$("#name").val(dept.name);
		$("#orderNum").val(dept.orderNum);
	}
	
}



function readOnly(){
	$("#cancelbtn").addClass("hidden");
	$("#savebtn").addClass("hidden");
	$("#name").attr("readOnly","readOnly");
	$("#orderNum").attr("readOnly","readOnly");
}

function writeAble(){
	$("#cancelbtn").removeClass("hidden");
	$("#savebtn").removeClass("hidden");
	$("#name").removeAttr("readOnly");
	$("#orderNum").removeAttr("readOnly");
}



function resize(panelId,btnId){
	$.panelResize(panelId,btnId);
}