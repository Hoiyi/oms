
var prefix = ctx + "sys/loginLog"

$(function() {
	laydate.render({
		  elem: '#startLoginTime' ,//指定元素
		  theme: '#2f4050',
		  type:'datetime',
		  format:'yyyy-MM-dd HH:mm:ss',
		  done: function(value, date){
			  console.log(value)
			  $('#startLoginTime').val(value.trim());
			  loginTimeChange()
		   }
	});
	laydate.render({
		  elem: '#endLoginTime' ,//指定元素
		  theme: '#2f4050',
		  type:'datetime',
		  format:'yyyy-MM-dd HH:mm:ss' ,
		  done: function(value, date){
			  $('#endLoginTime').val(value);
			  loginTimeChange()
		   }
	});
	
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
	

	$(document).on("click",'.filter-item', function(e){
		 var data_name = $(this).attr('data-name');
		 var data_value = $(this).attr('data-value');
		 var input_name = $(this).attr('input-name');
		 if(data_name == 'noCondition'){
			 return;
		 }else if(data_name == 'input'){
			 $('#'+input_name).val('');
			// reLoad({pageNumber:1});
		 }else if(data_name == 'loginTime'){
			 $("#startLoginTime").val('');
			 $("#endLoginTime").val('');
		 }
		 $(this).remove() ;
		 $.checkCondition();
		 reLoad({pageNumber:1});
	}); 
	load();
});

function loginTimeChange(){
	var loginTimeItem = $("[data-name='loginTime']");
	var startTime = $("#startLoginTime").val();
	var endTime = $("#endLoginTime").val();
	console.log(startTime)
	console.log(endTime)
	if(startTime != '' && endTime != ''){
		startTime += " - ";
	}
	var value = startTime + endTime;
	var li = '<li class="filter-item selected" data-name="loginTime" >'+value+'</li>';
	if(value == ''){
		loginTimeItem.remove();
	}else{
		if(loginTimeItem.length > 0){
			loginTimeItem.text(value);
		}else{
			$(".filter-header").append(li);
		}
	}
	 $.checkCondition();
	 reLoad({pageNumber:1});
}



function load() {
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
				singleSelect : false, // 设置为true将禁止多选
				// queryParamsType : "limit",
				// //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : false, // 设置为true将禁止多选
				clickToSelect: true, //点击选中
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
					   name:$('#name').val(),
						username : $('#username').val(),
						startLoginTime:$("#startLoginTime").val(),
						endLoginTime:$("#endLoginTime").val(),
						loginIp:$("#loginIp").val(),
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
						width:'15%',
						sortable:true
					},
					{
						field : 'username',
						title : '用户名',
						width:'10%',
						sortable:true
					},
					{
						field : 'loginIp',
						title : '登录IP',
						width:'15%',
						sortable:true
					},
					{
						field : 'loginTime',
						title : '登录时间',
						width:'15%',
						sortable:true
					},
					{
						field : 'logoutTime',
						title : '登出时间',
						width:'15%',
						sortable:true
					},
					{
						field : 'remark',
						width:'15%',
						title : '备注'
					}]
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


function resize(panelId,btnId){
	$.panelResize(panelId,btnId);
}