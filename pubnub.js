uniChat.controller('ChatController', function ($scope, ChatService) {

var KTHcoords= {lat:59.349249, lng:18.071340};

var array = [];

var channel = 'my_giphy';

$scope.send = function(query) {
return $scope.publish(query);
}

$scope.position = function() {
  return channel;
}

$scope.getAvatar = function() {
  return avatar.className
} 

$scope.content = '';

 var actionUser = '';
 
 // Hey, when you fork this and try by yourself, please use your own keys! Get your keys at http://admin.pubnub.com
 var p = PUBNUB.init({
                     subscribe_key: 'sub-c-74fa7090-11dc-11e6-858f-02ee2ddab7fe',
                     publish_key: 'pub-c-cf7ca2d3-31fd-4e14-a057-9a11853be1b8'
                     });

  // PubNub Subscribe API
  // with Presence API to see how many people are online
$scope.start = function(){
    // Assign a random avatar in random color
  avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);
 
  p.subscribe({
    channel: channel,
    callback: function(m, e, c) {
      actionUser = m.avatar;

      if (m.text) {
        console.log('text added...');
        $scope.content +='<p><i class="'+m.avatar+'"></i><span>'+(m.text.replace(/[<>]/ig, ''))+'</span></p>';
      }

      if (m.gif) {
        console.log('giphy added...');
        //content += '<img src="' + m.gif + '">'
      }
    },
    presence: function(m) {
      console.log(m.occupancy);
      if (m.occupancy > 1) {
        console.log(m.occupancy);
        $scope.precense = m.occupancy + ' people online';
      } else {
        $scope.precense = 'Only you are online';
      }
    }
  });


 $scope.unsub = function(){
 p.unsubscribe({
    channel: channel
    });
 };

};

 $scope.getPosition = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
       var lat = position.coords.latitude; 
       var lon = position.coords.longitude;
       array.push(lat, lon); 

       if (lat <= 59.355717 && lat >=59.343750 && lon >= 18.053783 && lon <= 18.085455){
        //unsub();
        channel = 'KTH';
        $scope.start();

      }

    });}

    $scope.publish = function(query){
    var text = query;

    if (!text) return;

     // PubNub Publish API
    p.publish({
      channel: channel,
      message: {
        avatar: avatar.className,
        text: text
      },
      callback: function(m) {
        query = '';
        if (['\giphy'].some(function(v) {
            return text.toLowerCase().indexOf(v) > 0;
          })) {
          var query2 = text.replace('\\giphy ', '').split(' ').join('+');
          getGiphy(query2);
        }
      }
    });
  }
  $scope.getPosition();

 });
