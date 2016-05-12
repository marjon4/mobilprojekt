
var KTHcoords= {lat:59.349249, lng:18.071340};

var array = [];

    function getPosition () {
    navigator.geolocation.getCurrentPosition(function(position) {
       var lat = position.coords.latitude;
       var lon = position.coords.longitude;
       array.push(lat, lon); 
       console.log(array);
    });}

(function() {
getPosition();

 var output = document.querySelector('#output'),
 input = document.querySelector('#input'),
 button = document.querySelector('#button'),
 avatar = document.querySelector('#avatar'),
 master = document.querySelector('#master'),
 presence = document.querySelector('#presence');
 
 
var channel = 'my_giphy';
  // Assign a random avatar in random color
  avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

 
 // Hey, when you fork this and try by yourself, please use your own keys! Get your keys at http://admin.pubnub.com
 var p = PUBNUB.init({
                     subscribe_key: 'sub-c-74fa7090-11dc-11e6-858f-02ee2ddab7fe',
                     publish_key: 'pub-c-cf7ca2d3-31fd-4e14-a057-9a11853be1b8'
                     });

  // PubNub Subscribe API
  // with Presence API to see how many people are online
  function start(){

 var position = document.querySelector('#channel');
 position.innerHTML = 'Your current heading is ' + channel;
 
 var actionUser = '';
 
 
  p.subscribe({
    channel: channel,
    callback: function(m, e, c) {
      actionUser = m.avatar;
      var content = '<p><i class="' + m.avatar + '"></i><span>';

      if (m.text) {
              console.log('text added...');
        content += m.text.replace(/[<>]/ig, '');
      }
      if (m.gif) {
        console.log('giphy added...');
        content += '<img src="' + m.gif + '">'
      }
      content += '</span></p>';

      output.innerHTML = content + output.innerHTML;
    },
    presence: function(m) {
      console.log(m);
      if (m.occupancy > 1) {
        presence.textContent = m.occupancy + ' people online';
      } else {
        presence.textContent = 'Only you are online';
      }
    }
  });
 
  p.bind('keyup', input, function(e) {
    if ((e.keyCode || e.charCode) === 13) {
      publish();
    }
  });


  p.bind('click', button, publish);
  }

  function publish() {
    var text = input.value;

    if (!text) return;

     // PubNub Publish API
    p.publish({
      channel: channel,
      message: {
        avatar: avatar.className,
        text: text
      },
      callback: function(m) {
        input.value = '';
        if (['\giphy'].some(function(v) {
            return text.toLowerCase().indexOf(v) > 0;
          })) {
          var query = text.replace('\\giphy ', '').split(' ').join('+');
          getGiphy(query);
        }
      }
    });
  }


 function unsub(){
 output.innerHTML = '';
 p.unsubscribe({
    channel: channel
               });
 };

  window.addEventListener('deviceorientation', function(data) {
      if (data.alpha >= 0 && data.alpha <=90){
        if (channel === 'north'){
        	return}
        else {
        unsub();
        channel = 'north';
        start();
        }
      }

      if (data.alpha > 90 && data.alpha <=180){
        if (channel === 'east'){
        	return}
        else {
        unsub();
        channel = 'east';
        start();
        }
      }

      if (data.alpha > 180 && data.alpha <270){
      	if (channel === 'south'){
        	return}
        else {
        unsub();
       	channel = 'south';
        start();
		}	
      }

      if (data.alpha >= 270 && data.alpha <=360){
      	if (channel === 'west'){
        	return}
        else {
        unsub();
        channel = 'west';
        start();
        }
      }
    });
 
 // PubNub Playback to fetch past messages

  function publishGif(gif) {
    p.publish({
      channel: channel,
      message: {
        avatar: avatar.className,
        gif: gif
      }
    });
  }

  // Giphy API
  function getGiphy(q) {
    var url = 'http://api.giphy.com/v1/gifs/translate?api_key=dc6zaTOxFJmzC&s=' + q;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      var json = JSON.parse(xhr.response);
      var gif = json.data.images.fixed_height.url;
      console.log(gif);
      publishGif(gif);
    };
    xhr.onerror = function() {
      console.log(e);
    };
    xhr.send();
  }

})();