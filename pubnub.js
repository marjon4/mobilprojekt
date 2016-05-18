uniChat.controller('ChatController', function ($scope, ChatService) {


var array = [];

$scope.channel = 'SF1624';
$scope.channel_group = 'KTH';

$scope.positionC = function() {
      return $scope.channel;
  }

$scope.positionU = function() {
      return $scope.channel_group;
  }

$scope.send = function(query) {
return $scope.publish(query);
}

$scope.getAvatar = function() {
  return avatar.className
} 


$scope.content = '';


 var actionUser = '';
 
 // Hey, when you fork this and try by yourself, please use your own keys! Get your keys at http://admin.pubnub.com
 var p = PUBNUB.init({
                     subscribe_key: 'sub-c-5d2a3b16-107a-11e6-a6c8-0619f8945a4f',
                     publish_key: 'pub-c-529993d2-89cb-4121-9e4b-1fed47b1b19d'
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
        $scope.$apply();
        $scope.query = '';
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

  p.history({
    channel : channel,
    callback : function(m){
        for (i in JSON.stringify(m)) {
        $scope.content += '<p><i class="'+m[i].avatar+'"></i><span>'+(m[i].text)+'</span></p>';}
        $scope.$apply();
    },
    count : 100, // 100 is the default
    reverse : false // false is the default
});

 $scope.unsub = function(){
 p.unsubscribe({
    channel: channel
    });
 };

};

  $scope.getPosition = function(){
    channel = ChatService.getSelectedCourse();
    $scope.channel=channel;
    channel_group = ChatService.getSelectedUni();
    $scope.channel_group=channel_group;
    $scope.$apply();
    $scope.start();
  }


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
