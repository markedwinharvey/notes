function print(msg){$('#msgbox_messages').append(msg+'<br>');}	//print function
//---------------------
$(document).ready(function(){
	send_ajax({'py_msg':'get_data'});
});
//---------------------
function append_db_data(data){
	for (i=0;i<data.length;i++){
		var new_entry = "<div class='data_list_entry border'>"+
							"<div class='notes data_column'>"+data[i][1]+"</div>"+
							"<div class='titles data_column'>"+data[i][2]+"</div>"+
							"<div class='urls data_column'>"+data[i][3]+"</div>"+
							"<div class='open_link '>open</div>"+
						"</div>";
		$('#data_list').append(new_entry);
	}	
}	
//---------------------
$(document).on('click','.data_list_entry',function(){
	$('.data_column').css({'background-color':'white'});
	//$(this).children.css({'background-color':'yellow'});
	$(this).children().each(function(){
		if (!$(this).hasClass('open_link')){
			$(this).css({'background-color':'rgb(255,255,202)'});
		}
	});
});
//---------------------
$(document).on('click','.open_link',function(){
	var link = $(this).parent().children().filter(function(){
		return $(this).hasClass('urls');
	}).html();
	window.open(link);
});
//---------------------
function send_ajax(params){
	$.ajax({
		method:'post',
		url:'/cgi-bin/notes.py',
		data:{'package':JSON.stringify(params)},
		success:function(result){
			if (params.py_msg == 'add_url'){		//result is confirmation message (string)				
				result = JSON.parse(result);
				print(result.msg);
				if(result.msg.substring(0,5)!='Error'){
					append_db_data(result.data);
				}
			}
			else if (params.py_msg == 'get_data'){	//result is database json object
				result = JSON.parse(result);
				if (result.length != 0){
					append_db_data(result);
				}
				else{
					print('No data found');
				}
			}
		}
	});
}
//---------------------
$(document).on('click','#add_url',function(){
	var url = $('#url').val();
	var note = $('#note').val();
	var folder = $('.folder').filter(function(){
		return $(this).hasClass('folder_highlight');
	}).html();
	if (note == ''){	//if no note, prompt for note
		var dict = {
			input_msg	:'enter a note?',
			el			:'',
			callback	:send_ajax,				
			params		:		
				{
					py_msg	:'add_url',
					url		:url,
					folder	:folder
				}
		}
		js_input(dict);
	}
	
	else{
		send_ajax({'py_msg':'add_url','url':url,'user_input':note,'folder':folder});
	}			
});
//---------------------
var notes = angular.module('notes',[]);
notes.controller('main',['$scope',function($scope){
	$scope.greeting ='yes';
}]);
//---------------------
$(document).on('click','.folder',function(){
	$('.folder').removeClass('folder_highlight');
	$(this).addClass('folder_highlight');
});