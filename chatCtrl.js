uniChat.controller('chatCtrl', function ($scope, ChatService) {


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
    channel_group: channel_group,
    callback: function(m, e, c) {
      actionUser = m.avatar;
      console.log("subscribe");
      //$scope.hist();
      if (m.text) {
        console.log('text added...');
        $scope.content +='<p><i class="'+m.avatar+'"></i><span>'+(m.text.replace(/[<>]/ig, ''))+'</span></p>';
        $scope.query = '';
        $scope.$apply();
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
  console.log("unsub");
 p.unsubscribe({
    channel: channel,
    channel_group: channel_group
    });
 };

};

$scope.hist = function (){
  p.history({
    channel : channel,
    channel_group: channel_group,
    callback : function(m){
      console.log(m);
      //$scope.content = '';
        for (i in m) {
        $scope.content += '<p><i class="'+m[i].avatar+'"></i><span>'+(m[i].text)+'</span></p>';
      }
    },
    count : 100, // 100 is the default
    reverse : false // false is the default

});
}

  $scope.getPosition = function(){
    channel = ChatService.getSelectedCourse();
    $scope.channel=channel;
    channel_group = ChatService.getSelectedUni();
    $scope.channel_group=channel_group;
    $scope.start();
    $scope.hist();
  }


    $scope.publish = function(query){
    var text = query;

    if (!text) return;

     // PubNub Publish API
    p.publish({
      channel: channel,
      channel_group: channel_group,
      message: {
        avatar: avatar.className,
        text: text
      }
    });
  }


  $scope.getPosition();

 });
