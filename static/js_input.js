//	js_input.js
//	custom javascript prompt-style input function
//		appends prompt to html, receives user data, 
//		passes data to callback function, and removes itself
//	js_input.js requires jquery to be loaded in the html document!!
function js_input(dict){
	//	dictionary object is key:value pairs, which may include the following keys:
	//	input_msg: 	message to display in prompt to user
	//	el: 		append input_box to this html element; when no el is specified, input_box is appended to <body> as first child
	//	callback: 	function to call on completion of prompt
	//	params:		arguments to pass with function call, as a {key:value} object 

	//--------------js_input_box html to append----------------------
		var input_html = function(){/*
		<div id='js_input_windowcover'>
			<div id='js_input_box'>
				<div id='js_input_msg'>add input:</div>
				<textarea id='js_input_text'></textarea>
				<br>
				<button class='js_input_button js_input_cancel'>cancel</button>
				<button class='js_input_button js_input_ok'>ok</button>
	
				<style>
					#js_input_windowcover{
						position:fixed;
						z-index:99;	
					}
					#js_input_box{		
						background-color:rgb(240,240,240);
						border-style:solid;
						border-color:rgb(160,160,160);
						border-width:2px;
						border-radius:2px;
						text-align:center;
						position:fixed;
						z-index:100;
						padding:4px;	
					}
					#js_input_text{
						margin:2px;
						height:140px;
						width:260px;
					}
					#js_input_msg{
						margin:2px;
					}
				</style>
			</div>
		</div>
		*/}.toString().slice(15,-4);
	//---------------------------end html---------------------------
	
	//----------extract dictionary content and append html---------
		//$('*').attr('disabled','disabled');		//disable html on page before prompt

		if(!dict.el || dict.el.length == 0){	//append prompt content
			$('body').children().first().before(input_html);
		}
		else{
			$(dict.el).append(input_html);
		}
	
		if (dict.input_msg){					//add custom message if available
			$('#js_input_msg').html(dict.input_msg);	
		}
	//--------------------end extract dict---------------------------
	
	//---------adjust windowcover and position prompt in center of window----------
		$('#js_input_windowcover').css({
			'height':$(window).height()+'px',
			'width':$(window).width()+'px'
		});
		var margin_top =   $(window).height()/2 - $('#js_input_box').height()/2;
		var margin_left = $(window).width()/2 - $('#js_input_box').width()/2;
		$('#js_input_box').css({
			'margin-left':margin_left+'px',
			'margin-top':margin_top+'px'
		});
	//--------------------end position prompt------------------------
	
	//---------------button listeners and callback-----------------------------
		$(document).on('click','.js_input_button',function(){
			if ( $(this).hasClass('js_input_ok') ) {
				var user_input = $('#js_input_text').val();
				try{
					dict.params.user_input = user_input;	//append user_input to params
					dict.callback(dict.params);				//callback
				}
				catch(err){
					console.log('Something went wrong. Check callback and params.');
				}
			}
			$('#js_input_windowcover').remove();		//remove input box
			//$('*').removeAttr('disabled');		//enable all html elements
		});
	//----------------------end button listeners-------------------------
}