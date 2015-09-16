$(document).ready(function(){
	
	document.addEventListener('deviceready',onDeviceReady,false);
	
	
	
})

//function onDeviceReady(){
//
//	// Check LocalStorage for channel
//	if(localStorage.channel == null || localStorage.channel == ''){
//		// Ask User for Channel
//		$('#popupDialog').popup("open");
//	} else {
//		var channel = localStorage.getItem('channel');
//	}
//
//	getPlaylist(channel);
//
//	$(document).on('click','#vidlist li', function(){
//		showVideo($(this).attr('videoid'));
//	});
//
//	$('#channelBtnOK').click(function(){
//		var channel = $('#channelName').val();
//		setChannel(channel);
//		getPlaylist(channel);
//	});
//
//	$('#saveOptions').click(function(){
//		saveOptions();
//	});
//
//	$('#clearChannel').click(function(){
//		clearChannel();
//	});
//
//	$(document).on('pageinit', '#options', function(e){
//		var channel = localStorage.getItem('channel');
//		var maxResults = localStorage.getItem('maxresults');
//		$('#channelNameOptions').attr('value', channel);
//		$('#maxResultsOptions').attr('value', maxResults);
//	});
//}
//
//function onDeviceReady(){
//
//	// Check LocalStorage for channel
//	if(localStorage.channel == null || localStorage.channel == ''){
//		// Ask User for Channel
//		$('#popupDialog').popup("open");
//	} else {
//		var channel = localStorage.getItem('channel');
//	}
//
//	getPlaylist(channel);
//
//	$(document).on('click','#vidlist li', function(){
//		showVideo($(this).attr('videoid'));
//	});
//
//	$('#channelBtnOK').click(function(){
//		var channel = $('#channelName').val();
//		setChannel(channel);
//		getPlaylist(channel);
//	});
//
//}
//
function onDeviceReady(){
	if(localStorage.channel == null || localStorage.channel==''){
		//Ask user for chanel
		$('#popupDialog').popup("open");
	}else{
		var channel = localStorage.getItem('channel');
	}
	getPlaylist(channel);
	
	
	$(document).on('click','#vidlist li',function(){
		showVideo($(this).attr('videoid'));
	});
	
	$('#channelBtnOK').click(function(){
		var channel = $('#channelName').val();
		setchannel(channel);
		getPlaylist(channel);

	});
	
	$('#saveOptions').click(function(){
		saveOptions();
		
	});
	
	$('clearChannel').click(function(){
		
	});
	
}



function getPlaylist(channel){
	
	$('#vidlist').html('');
	$.get(
		"https://www.googleapis.com/youtube/v3/channels",
		{
			part: 'contentDetails',
			forUsername: channel,
			//need to enable API before using the following key
			key: 'AIzaSyDTrgEWliZAbhR8uX7V1IKZwLar4K6atsA'
				//AIzaSyDTrgEWliZAbhR8uX7V1IKZwLar4K6atsA
		},
		
		function(data){
			$.each(data.items,function(i,item){
				console.log(item);
				playlistId = item.contentDetails.relatedPlaylists.uploads;
				getVideos(playlistId,10);
				
			})
		}
	
	);
	
}


function getVideos(playlistId, maxResults){
	$.get(
			"https://www.googleapis.com/youtube/v3/playlistItems",
			{
				part:'snippet',
				maxResults: maxResults,
				playlistId: playlistId,
				key:'AIzaSyDTrgEWliZAbhR8uX7V1IKZwLar4K6atsA'
			}, function(data){
				var output;
				$.each(data.items, function(i,item){
					id = item.snippet.resourceId.videoId;
					title = item.snippet.title;
					thumb = item.snippet.thumbnails.default.url;
					$('#vidlist').append('<li videoId="'+id+'"><img src="'+thumb+'"><h3>'+title+'</h3></li>');
					$('#vidlist').listview('refresh');
				});
				
			}
			);
	
}

function showVideo(id){
	console.log('Showing video '+id);
	$('#logo').hide();
	var output = '<iframe width="100%" height="315" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>'
	$('#ShowVideo').html(output);
}

function setchannel(channel){
	localStorage.setItem('channel',channel);
	console.log('channel set'+channel);
	
}

function setMaxResults(channel){
	localStorage.setItem('maxresults',maxResults);
	console.log('Max Results changesd'+maxResults);
	
}

function saveOptions(){
	var channel = $('#channelNameOptions').val();
	setChannel(channel);
	car maxResults = $('#maxResultsOptions');
	setMaxResults(maxResults);
	$('body').pagecontainer('change','#main');
	getPlaylist(channel);
	
}



