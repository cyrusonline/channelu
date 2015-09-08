$(document).ready(function(){
	
	document.addEventListener('deviceready',onDeviceReady,false);
	
	
	
})


function onDeviceReady(){
	var channel='yrmentor';
	
	getPlaylist(channel);
}


function getPlaylist(channel){
	
	$('#vidlist').html('');
	$.get(
		"https://www.googleapis.com/youtube/v3/channels",
		{
			part: 'contentDetails',
			forusername: channel,
			key: 'AIzaSyDTrgEWliZAbhR8uX7V1IKZwLar4K6atsA'
		},
		
		function(data){
			console.log(data);
		}
	
	);
	
}