uniChat.factory('ChatService', function ($resource) {

this.uni = "Start";
var courses =[];

var myFirebaseRef = new Firebase("https://mobunichat.firebaseio.com/");


	myFirebaseRef.on("value", function(snapshot) {
  	data = snapshot.val().courses;
  	courses = [];

  	for(i in data){
  		courses.push(data[i])
  		}
	});


    this.getCourses = function(){
    	return courses;
    };

    this.setSelectedCourse = function(id){
    	for(i in courses){
		courses[i].status = 0
    		if(courses[i].id === id){
    			courses[i].status = 1;
    		}
    	}
    };

    this.getSelectedCourse = function(){
    	for(i in courses){
    		if(courses[i].status === 1){
    			return courses[i].name;
    		}
    	}
    };

    this.setSelectedUni = function(uni){
    	this.uni = uni;
    };

    this.getSelectedUni = function(){
    	return this.uni;
    };

return this;
});
