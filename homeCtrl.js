uniChat.controller('homeCtrl', function($scope, ChatService) {

	$scope.courses = function(){
		return ChatService.getCourses();		
	}

	$scope.startCC = function(course){
		ChatService.setSelectedCourse(course);
	}


	//get uni

	var KTHcoords= {lat:59.349249, lng:18.071340};


	$scope.getPosition = function() {
	    navigator.geolocation.getCurrentPosition(function(position) {
	       var lat = position.coords.latitude; 
	       var lon = position.coords.longitude;
	       //array.push(lat, lon); 

	       if (lat <= 59.355717 && lat >=59.343750 && lon >= 18.053783 && lon <= 18.085455){
	        //unsub();
	        var channel = 'KTH';
	        $scope.setPosition(channel)
	      }
	  });
	}

	$scope.getUni = function() {
  		return ChatService.getSelectedUni();
	}

	$scope.setPosition = function(Uni){
		ChatService.setSelectedUni(Uni);
	}

$scope.getPosition();

});
