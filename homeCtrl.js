uniChat.controller('homeCtrl', function($scope, ChatService) {

	$scope.courses = function(){
		return ChatService.getCourses();	
	}

	$scope.startCC = function(course){
		ChatService.setSelectedCourse(course);
	}


	$scope.getPosition = function() {
	    navigator.geolocation.getCurrentPosition(function(position) {
	       var lat = position.coords.latitude; 
	       var lon = position.coords.longitude;
	       //array.push(lat, lon); 

	       if (lat <= 59.355717 && lat >=59.343750 && lon >= 18.053783 && lon <= 18.085455){
	        //unsub();
	        var channel = 'KTH';
	        $scope.setPosition(channel);
	        $scope.$apply();
	      }

	      if (lat <= 58.406053 && lat >=58.389277 && lon >= 15.552876 && lon <= 15.605662){
	        //unsub();
	        var channel = 'LiU';
	        $scope.setPosition(channel);
	        $scope.$apply();
	      }
	  });
	}

	$scope.getUni = function() {
  		return ChatService.getSelectedUni();
	}

	$scope.setPosition = function(Uni){
		ChatService.setSelectedUni(Uni);
	}

	$scope.addCourse = function(name, id){
		ChatService.addData(name, id);
		$scope.courseName = '';
		$scope.courseCode = '';
	}

$scope.getPosition();

});
