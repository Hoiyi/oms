
var prefix = ctx + "knowledge/knowledgeStore";
var ue ;
$(function() {
	initSelect();
	load();
	ue = UE.getEditor('editor');
	initUeditor();
	$(window).bind("load resize", function () {
		$(".ibox-content").css("min-height",(document.body.clientHeight-110)+'px');
		$(".ibox-content").css("max-height",(document.body.clientHeight-110)+'px');
		$("#preview").css("min-height",(document.body.clientHeight-48)+'px');
		$("#preview").css("max-height",(document.body.clientHeight-48)+'px');
	});
	 validateRule();
	 knowledgeAutoComplate();
	 
	 
	 $("#chooseClassBtn").on('click',function(){
		 layer.open({
		        type: 2,
		        title: '选择大类',
		        maxmin: true,
		        shadeClose: false, // 点击遮罩关闭层
		        area: ['80%', '80%'],
		        content:ctx + 'common/knowledgeClass/knowledgeClassWindow/' + platId// iframe的url
		    });
	 });
	 
});

function knowledgeAutoComplate(){
	$("#klClass").autocomplete({source:ctx + "common/knowledgeClass/autoComplate?limit=50&platId="+platId},{
		minLength: 0,
		select: function (event, ui) {
			$("#klClassId").val(ui.item.kcId);
		}
	});
	
	$("#klClass").blur(function(){
		if($("#klClass").val().trim()){
			$.ajax({
				cache : true,
				type : "GET",
				url : ctx + "common/knowledgeClass/autoComplate",
				data : {validateKlClassName:$("#klClass").val()}, // 你的formid
				async : false,
				error : function(request) {
					layer.alert("网络超时");
				},
				success : function(data) {
					if(data.length == 0){
						$("#klClassId").val('');
						if(hasAddKlClassPerm){
					        layer.confirm('问题类型不存在，是否添加此问题类型？', {
					             btn : [ '确定添加', '重新输入' ],//按钮
					             cancel:function(index){ 
					            	 $("#klClass").val('')
						              }
					         }, function(index) {
					        	 	layer.close(index);
					        	 	quickSave();
					         }, function(index) {
					        	  $("#klClass").val('')
					         }); 
						}else{
							layer.alert("问题类型不存在,请联系管理员添加" ,{icon: 2,closeBtn: 0 },function(index){
								layer.close(index);
								 $("#klClass").val('')
							});
						}
					}else{
						$("#klClassId").val(data[0].kcId);
					}
				}
			});
		}

	});
}


function quickSave(){
	$.ajax({
		type : "POST",
		url : ctx + "common/knowledgeClass/quickSave",
		data : {'klClassName':$("#klClass").val(),'platId':platId}, // 你的formid
		async : false,
		error : function(request) {
			layer.alert("网络超时");
		},
		success : function(kcId) {
			layer.msg("添加成功");
			$("#klClassId").val(kcId);
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
			describe : {
				required : true,
				maxlength:200,
				remote : {
					url : prefix + "/exist", // 后台处理程序
					type : "post", // 数据发送方式
					dataType : "json", // 接受数据格式
					cache: false,
					data : { // 要传递的数据
						validateKlId : function() {
							return $("#klId").val();
						},
						validateDescribe: function() {
							return $("#describe").val();
						}
					}
				}
			},
			klClass: {
				maxlength:200,
				required : true
			}
		},
		messages : {
		
			describe : {
				required : icon + "请输入描述",
				remote: icon + "问题名称已存在"
			},
			klClass: {
				required : icon + "请输入问题类型"
			}
		}
	})
}


function initSelect(){
	$('#js-select-describe').select2({
	 	 placeholder: "描述",
	    minimumInputLength: 1,
	    maximumSelectionSize:20,
	    allowClear: true,
	    multiple : false,
        ajax: {
            url: prefix + "/list",
            dataType: 'json',
            delay: 150,
            data: function (params) {
                return {
                	describe: params.term ,
                  sysId: sysId
                };
            },
            processResults: function (res) {
                return {
                    results: $.map(res.rows, function (item) {
                        return {
                    			 id: item.klId,
                            text: item.describe.substring(0,20)
                        }
                    })
                };
            },
            cache: true
        }
});


$('#js-select-describe').on('select2:select', function (evt) {
	reLoad({pageNumber:1});
});
$('#js-select-describe').on('select2:clear', function (evt) {
	//$("#js-select-describe").select2("val", ""); 
	reLoad({pageNumber:1});
});
	
}






function load() {
	$('#exampleTable').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : prefix + "/list", // 服务器数据的加载地址
		// showRefresh : true,
		// showToggle : true,
		// showColumns : true,
		iconSize : 'outline',
		resizable: true,
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
				sysId: sysId,
				describe : $('#js-select-describe  option:checked').text(),
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
			checkbox : true
		},{
            title: '序号',
            align:'center',
            width:'5%',
            formatter:function(value,row,index){
                //return index+1; //序号正序排序从1开始
                var pageSize=$('#exampleTable').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#exampleTable').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return pageSize * (pageNumber - 1) + index + 1;    //返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
            }
		}, {
			field : 'describe',
			title : '描述',
			width:'31%'
			
		}, {
			field : 'klClass',
			title : '问题类型',
			width:'15%'
			
		},{
			field : 'gmtCreate',
			title : '创建时间',
			sortable:true,
			width:'12%'
		} , {
			field : 'gmtModified',
			title : '修改时间',
			sortable:true,
			width:'12%'
		}, {
			title : '查看',
			field : 'id',
			width:'5%',
			align : 'center',
			formatter : function(value, row, index) {
				return '<a class="btn btn-primary btn-sm" href="#" mce_href="#" title="查看" onclick="detail(\''
					+ row.klId
					+ '\')"><i class="fa fa-search"></i></a> ';
				
			}
		} ],
		onLoadSuccess : function(e, data) {
			if ($('#exampleTable').bootstrapTable('getData').length > 0) {
				$('#exampleTable').bootstrapTable('check', 0);
				var rows = $('#exampleTable').bootstrapTable('getSelections');
	
			}
		}
	});
}

function detail(klId){
	
	$.ajax({
		url : prefix + "/getById/" + klId,
		type : "GET",
		success : function(knowledge) {
			open("panel-3");
			$("#klTitle").text(knowledge.describe);
			$("#preview").html(knowledge.content);
		}
	});
	
}

function open(panelId){
	$.openPanel(panelId);
	
}
function turnoff(panelId){
	$.closePanel(panelId);
}

function initUeditor(){

    //实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    ue.ready(function() {
    	   ue.setHeight(document.body.clientHeight-185);
    	   $(window).bind("load resize", function () {
    			ue.setHeight(document.body.clientHeight-178);
    		});
//    	   ue.setDisabled();
   });
//  setTimeout(function () {
//        ue.execCommand('drafts');
//    }, 500);
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
	validator.resetForm();
	open("panel-2");
	$("#opt").val('add');
	clear();
}


function edit(id) {
	validator.resetForm();
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要编辑的数据")
		return;
	}
	var knowledge = rows[0];
	$("#opt").val('update');
	open("panel-2");
	fillForm(knowledge);
	
}


function save() {
	console.log($('#signupForm').serialize());
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
				turnoff('panel-2');
				if(opt == 'update'){
					reLoad();
				}else{
					reLoad({pageNumber:1});
				}
				layer.msg("操作成功");
			} else {
				layer.msg(data.msg)
			}
		}
	});
}



function remove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据")
		return;
	}
	var knowledge = rows[0];
	
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + "/remove",
			type : "post",
			data : {
				'klId' : knowledge.klId
			},
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


function clear(){
	$("#klId").val('');
	$("#klClassId").val('');
	$("#klClass").val('');
	$("#describe").val('');
	ue.setContent('');
}

function fillForm(knowledge){
	$("#klId").val(knowledge.klId);
	$("#klClassId").val(knowledge.klClassId);
	$("#klClass").val(knowledge.klClass);
	$("#describe").val(knowledge.describe);
	if(knowledge.content){
		ue.setContent(knowledge.content);
	}
}

function cancel(){
	turnoff('panel-2');
}

function setClass(klClassId,klClass){
	$("#klClassId").val(klClassId);
	$("#klClass").val(klClass);
}
