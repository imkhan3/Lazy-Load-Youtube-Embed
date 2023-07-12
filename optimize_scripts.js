function optimizeYouTubeIframeEmbeds() {
    // Get iframe
    var frames = document.getElementsByTagName("iframe");

    for ( var i = 0; i < frames.length; i++ ) {

        // Find out youtube embed iframes.
        if ( frames[i].src && frames[i].src.length > 0 && frames[i].src.match(/http(s)?:\/\/www\.youtube\.com/) ) {

            // For Youtube iframe, extract src and id.
            var src = frames[i].src;
            var p =
                /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            var id = src.match(p) ? RegExp.$1 : false;
            
            //php variables
            let play_color = frames[i].getAttribute('data-color');
            var start_time = "0";
            var end_time = "0"; 
            if(frames[i].getAttribute('data-start') != ""){ start_time = frames[i].getAttribute('data-start').toString();}
            if(frames[i].getAttribute('data-end') != ""){ end_time = frames[i].getAttribute('data-end').toString();}
            var loop = frames[i].getAttribute('data-loop');
            var thumbnail = frames[i].getAttribute('data-thumbnail');
            if (thumbnail == ""){ thumbnail = 'https://i.ytimg.com/vi/'+id+'/maxresdefault.jpg';}

            //thumbnail picture            
            var code='<div class="optimize-container"><div id="favicontech-youtubevideo-'+id+'"><a href="#" style="position:relative;" onclick="LoadYoutubeVideoOnClick(\''+id+'\','+start_time+','+end_time+',\''+loop+'\');return false;" ><img style="aspect-ratio:16/9;background: radial-gradient(circle at 18.7% 37.8%, rgb(240, 240, 240) 0%, rgb(225, 234, 238) 90%);" class="ytp-cued-thumbnail-overlay-image" src="'+thumbnail+'" /></a><div style="pointer-events:none; width:68px;position:absolute; left:50%; top:50%; -webkit-transform:translate(-50%, -50%); transform: translate(-50%, -50%);" class="ytp-large-play-button ytp-button play-button"><svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="'+play_color+'"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg></div></div></div>';				

            // Replace the iframe with a the image+button code.
            var div = document.createElement("div");
            div.innerHTML = code;
            div = div.firstChild;
            frames[i].parentNode.replaceChild(div, frames[i]);
            i--;
        }
    }
}

// Replace preview image of a video with it's iframe.
function LoadYoutubeVideoOnClick(id, start, end, loop) {
    //php variables
    if(start != 0){ start = '&start='+start;} else {start = '';}
    if(end != 0){ end = '&end='+end;} else {end='';}
    if(loop == "On"){ loop = '&loop=1&playlist='+id; } else { loop='';}

    //iframe generated on click
    var code='<iframe style="aspect-ratio:16/9; background: radial-gradient(circle at 18.7% 37.8%, rgb(240, 240, 240) 0%, rgb(225, 234, 238) 90%);" class="ytp-cued-thumbnail-overlay-image" src="https://www.youtube.com/embed/'+id+'/?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1'+start+end+loop+'" frameborder=0  allow="autoplay;" allowfullscreen></iframe>';
    var iframe = document.createElement("div");
    iframe.innerHTML = code;
    iframe = iframe.firstChild;
    var div = document.getElementById("favicontech-youtubevideo-" + id);
    div.parentNode.replaceChild(iframe, div);
}

//call function
optimizeYouTubeIframeEmbeds(); 