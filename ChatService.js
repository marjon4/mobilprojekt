uniChat.factory('ChatService', function ($resource) {

this.courses = [
		{
            name:"Algebra och geometri",
			id : "SF1624",
			comment : [],
	},
	{
            name:"Envariabelanalys",
			id : "SF1625",
			comment : [],
	},
		{
            name:"Flervariabelanalys",
			id : "SF1626",
			comment : [],
	},
		{
            name:"Programmeringsteknik",
			id : "DD1310",
			comment : [],
	},
		{
            name:"Sannolikhetsteori och statistik",
			id : "SF1901",
			comment : [],
	},
		{
            name:"Tillämpad datalogi",
			id : "DD1320",
			comment : [],
	},
		{
            name:"Databasteknik",
			id : "DD1334",
			comment : [],
	},
		{
            name:"XML för publicering",
			id : "DM2517",
			comment : [],
	},
		{
            name:"Mobilutveckling med webbteknologier",
			id : "DM2518",
			comment : [],
	},
		{
            name:"Interaktionsprogrammering och dynamiska webben",
			id : "DH2642",
			comment : [],
	}
                    ];

    this.getCourses = function(){
    	return this.courses;
    };

return this;
});
