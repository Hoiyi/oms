var prefix = ctx + "common/district";
var validator;
var principalChoose;
var provinceChoose;
var used;
var validUrl = prefix + "/exist";
$(function() {
	$('#condition-distpicker-province').distpicker({
		  province: ''
	  });
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
	principalChoose = $('#condition-principal').ui_choose();
	provinceChoose = $('#province').ui_choose();
	provinceChoose.removeNode(0);
	provinceChoose.disabled();

	
	principalChoose.click = function(values, item) {
		var filters = $(".filter-item");
		filters.each(function(){
			var filter = $(this);
			if(filter.attr('data-name') == 'principal' && filter.attr('data-value') == item.attr('data-value')){
				filter.remove();
			}
		});
		if(item.hasClass('selected')){
			var li = '<li class="filter-item selected" data-name=\"principal\" data-value="'+item.attr('data-value')+'" title="'+item.text()+'">'+item.text()+'</li>';
			$(".filter-header").append(li);
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
			 $('#condition-'+input_name).val('');
			 
			 reLoad({pageNumber:1});
		 }else if (data_name == 'condition-province'){
			
			 $('#condition-distpicker-province').distpicker({
				  province: ''
			  });
			 $("#condition-province").selectpicker('val', "");
			 reLoad({pageNumber:1});
		 }else{
			 $(this).hide(200, function(){
				 if(data_name == 'principal'){
					 principalChoose.unSelect(data_value);
				 }
				 reLoad({pageNumber:1});
			});
		 }
		 $(this).remove() ;
		 $.checkCondition();
	}); 
	
	load();
	validateRule();
	
	$("#condition-province").on('change',function(){
		
		var province = $("#condition-province").find("option:selected").text();
		var filters = $(".filter-item");
		filters.each(function(){
			var filter = $(this);
			if(filter.attr('data-name') == 'condition-province'){
				filter.remove();
			}
		});
		if(province != '—— 省 ——'){
			var li = '<li class="filter-item selected" data-name=\"condition-province\" data-value="'+province+'" title="'+province+'">'+province+'</li>';
			$(".filter-header").append(li);
		}
		$.checkCondition();
		reLoad({pageNumber:1});
		
	});
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});

function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	validator = $("#signupForm").validate({
		rules : {
			distName : {
				required : true,
				remote : {
					url : validUrl, // 后台处理程序
					type : "post", // 数据发送方式
					dataType : "json", // 接受数据格式
					cache: false,
					data : { // 要传递的数据
						validateId : function() {
							return $("#distId").val();
						},
						validateDistName : function() {
							return $("#distName").val();
						}
					}
				},
				maxlength:30
			},
			
			principal:{
				required : true
			},
			distDes:{
				maxlength:255
			}
		},
		messages : {
			distName : {
				required : icon + "请输入区域名称",
				remote : icon + "区域名称已存在"
			},
			principal:{
				required : icon + "请选择负责人"
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
			console.log($('#condition-distName').val())
			return {
				// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
				limit : params.limit,
				offset : params.offset,
				distName : $('#condition-distName').val(),
				distDes : $('#condition-distDes').val(),
				principalId: principalChoose.selected(),
				sort: params.sort,
				order: params.order,
				prefecture:$("#condition-province").val()
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
		}, {
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
			field : 'distName',
			title : '区域名称',
			 width:'30%',
			sortable:true
		}, {
			field : 'distDes',
			title : '区域描述',
			 width:'30%',
			sortable:true
		} , {
			field : 'principal',
			title : '负责人',
			 width:'25%',
			sortable:true
		}] ,
		// 行点击事件
		onClickRow : function(row) {
			readOnly();
			clear() ;
			validator.resetForm();
			fillForm(row);
			loadUsed(row.distId);
			provinceChoose.disableNodes([]);
		} ,
		onLoadSuccess : function(e, data) {
			readOnly();
			if ($('#exampleTable').bootstrapTable('getData').length > 0) {
				$('#exampleTable').bootstrapTable('check', 0);
				var rows = $('#exampleTable').bootstrapTable('getSelections');
				if (rows.length > 0) {
					fillForm(rows[0]);
					loadUsed(rows[0].distId);
					provinceChoose.disableNodes([]);
				}
			}
			
		}
	});
}


function loadUsed(distId){
//	var distId = row.distId
//	if(typeof(row) == 'undefined'){
//		distId = -1;
//	}
	$.ajax({
		cache : true,
		type : "GET",
		url : prefix + "/used/" + distId,
		async : false,
		error : function(request) {
			layer.alert("网络超时");
		},
		success : function(data) {
			used = data;
		}
	});
}


var openUserTree = function(){
	layer.open({
		type:2,
		title:"选择负责人",
		area : [ '25%', '75%' ],
		content: ctx + "sys/user/treeView"
	})
}

function loadUser(id,name){
	$("#principalId").val(id);
	$("#principal").val(name);
	$("#principal").valid();
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
	writeAble();
	loadUsed(-1);
	provinceChoose.disableNodes(used);
}

function save() {
	readOnly();
	var opt = $("#opt").val();
	$("#prefecture").val(provinceChoose.selected());
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
	loadUsed(row.distId)
	provinceChoose.disableNodes(used);
}

function remove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据")
		return;
	}
	readOnly();
	validator.resetForm();
	provinceChoose.disableNodes([]);
	var distId = rows[0].distId;
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove/" + distId,
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
	provinceChoose.disableNodes([]);
	readOnly();
}

function clear() {
	provinceChoose.select("");
	$("#prefecture").val('');
	$("#distId").val('');
	$("#principalId").val('');
	$("#distDes").val('');
	$("#distName").val('');
	$("#principal").val('');
}

function writeAble() {
	provinceChoose.enabled();
	$("#cancelbtn").removeClass("hidden");
	$("#savebtn").removeClass("hidden");
	$("#distDes").removeAttr("readOnly");
	$("#distName").removeAttr("readOnly");
	$("#principal").removeAttr("disabled");

}
function readOnly() {
	provinceChoose.disabled();
	$("#cancelbtn").addClass("hidden");
	$("#savebtn").addClass("hidden");
	$("#distDes").attr("readOnly", "readOnly");
	$("#distName").attr("readOnly", "readOnly");
	$("#principal").attr("disabled","disabled");
}

function fillForm(district) {
	$("#distId").val(district.distId);
	$("#principalId").val(district.principalId);
	$("#distDes").val(district.distDes);
	$("#distName").val(district.distName);
	$("#remark").val(district.remark);
	$("#principal").val(district.principal);
	if(typeof(district.prefecture) != 'undefined'){
		var provinces = district.prefecture.split(",");
		provinceChoose.select(provinces);
	}
}

function resize(panelId,btnId){
	$.panelResize(panelId,btnId);
}