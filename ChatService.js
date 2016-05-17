uniChat.factory('ChatService', function ($resource) {

this.uni = "Start";

this.courses = [
		{
            name:"Algebra och geometri",
			id : "SF1624",
			comment : [],
			status : 0,
	},
	{
            name:"Envariabelanalys",
			id : "SF1625",
			comment : [],
			status : 0,
	},
		{
            name:"Flervariabelanalys",
			id : "SF1626",
			comment : [],
			status : 0,
	},
		{
            name:"Programmeringsteknik",
			id : "DD1310",
			comment : [],
			status : 0,
	},
		{
            name:"Sannolikhetsteori och statistik",
			id : "SF1901",
			comment : [],
			status : 0,
	},
		{
            name:"Tillämpad datalogi",
			id : "DD1320",
			comment : [],
			status : 0,
	},
		{
            name:"Databasteknik",
			id : "DD1334",
			comment : [],
			status : 0,
	},
		{
            name:"XML för publicering",
			id : "DM2517",
			comment : [],
			status : 0,
	},
		{
            name:"Mobilutveckling med webbteknologier",
			id : "DM2518",
			comment : [],
			status : 0,
	},
		{
            name:"Interaktionsprogrammering och dynamiska webben",
			id : "DH2642",
			comment : [],
			status : 0,
	},
		{
			name : "Other courses",
			id : "XXXX",
			comment : [],
			status : 0,
	}
                    ];

    this.getCourses = function(){
    	return this.courses;
    };

    this.setSelectedCourse = function(id){
    	for(i in this.courses){
		this.courses[i].status = 0
    		if(this.courses[i].id === id){
    			this.courses[i].status = 1;
    		}
    	}
    };

    this.getSelectedCourse = function(){
    	for(i in this.courses){
    		if(this.courses[i].status === 1){
    			return this.courses[i].name;
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
