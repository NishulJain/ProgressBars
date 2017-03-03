/*BARS JAVASCRIPT 
@ Author NISHUL JAIN
*/


var barData = {"buttons":[25,32,-20,-47],"bars":[49,39,64],"limit":220};
			
	
$(document).ready(function(){
	
	createBars();
	getBars();
	$(document).on("click",".barButton", function(){
		var buttonLimit = parseInt($(this).attr("attr-data"));
		var lBarId = $("#barControl").val();
		var barLimit = parseInt($("#"+lBarId).attr("attr-data"));
		var lBarCount = buttonLimit+barLimit;
		
		setBarsProgress(lBarId,lBarCount);
	});
});
	
createBars = function(){
				
	var lBarHtml = '';
	var lSelectBarHtml = '';

	for(i=0; i<barData.bars.length; i++){
		
		lBarHtml +='<div class="bar-border"><div id="bar'+i+'" attr-data="'+barData.bars[i]+'"></div></div>';
		lSelectBarHtml += '<option value="bar'+i+'">#Progress'+(i+1)+'</option>';
	}
	$("#bars").html(lBarHtml);
	$("#barControl").html(lSelectBarHtml);

	lBarHtml='';
	for(i=0; i<barData.buttons.length; i++){
		lBarHtml += '<input type="button" attr-data="'+barData.buttons[i]+'" value="'+barData.buttons[i]+'" class="barButton">';
	}
	$("#controller").append(lBarHtml);

	for(i=0; i<barData.bars.length; i++){
		setBarsProgress("bar"+i,  barData.bars[i]);
	}
};

setBarsProgress = function(barId, barCount){
				
	if(barCount>100){
		$("#"+barId).css("background","red");
	}
	else{
		$("#"+barId).css("background","#b2e89c");
	}
	if(barCount >= 0 &&  barCount <= barData.limit){
		var lPercentage = (barCount/barData.limit)*100;
		
		$("#"+barId).attr("attr-data",barCount);
		$("#"+barId).html(barCount+'%');
		$("#"+barId).css('width',lPercentage+'%');
	}
	else if(barCount < 0){
		$("#"+barId).attr("attr-data",0);
		$("#"+barId).html('0%');
		$("#"+barId).css('width','0%');
	}
	else if(barCount > barData.limit){
		$("#"+barId).attr("attr-data",barData.limit);
		$("#"+barId).html(barData.limit+'%');
		$("#"+barId).css('width','100%');
	}
	

};

getBars = function(){
	
	$.ajax({
		url:"http://pb-api.herokuapp.com/bars",
		type: "GET",
		dataType: "json",
		cache: false,
		success: function (response) {
			barData = response;
			createBars();
			
		},
		fail: function(response){
			console.log(response);
		}
	});
};