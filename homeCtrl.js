uniChat.controller('homeCtrl', function($scope, ChatService) {

	$scope.courses = function(){
		return ChatService.getCourses();		
	}

});
