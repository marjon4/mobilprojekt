uniChat.factory('ChatService', function ($resource) {

var uni = "Start";
var courses =[];


var myFirebaseRef = new Firebase("https://mobunichat.firebaseio.com/");
	myFirebaseRef.on("value", function(snapshot) {
  	data = snapshot.val().uni;
  	courses = [];

  	for(i in data){
  		courses.push(data[i])
  		}
	});

	this.addData = function(Sname, Sid){
		var postsRef = myFirebaseRef.child("uni");

		var newPostRef = postsRef.push();
		newPostRef.set(
				{
				id: Sid,
				name: Sname,
				status: 0
				});
	}


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

    this.setSelectedUni = function(Suni){
    	uni = Suni;
    };

    this.getSelectedUni = function(){
    	return uni;
    };

return this;
});
