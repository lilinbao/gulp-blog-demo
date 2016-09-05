/**
Created at 2016-08-17
Author Linbao
Email linbaolee@gmail.com
*/
$(document).ready(function(){
	$('textarea.form-control').on('keyup', function(){
		$(this).parent().parent().find('span.remainder').text((165 - $(this).val().length)+'/165');
	});

	
});