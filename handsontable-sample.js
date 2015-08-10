if (Meteor.isClient) {
	Template.handsontable.onCreated(function (){
		var self = this;
		self.autorun(function(){
				self.subscribe("h_data",Session.get('rows'));//since Session is a reactive variable any change in its value, trigger subscription.
		});
	});
  Template.handsontable.rendered = function () {
	//	console.log(Template.instance().subscriptionsReady());	
		var self = this;
   var myData = [];  // Need this to create instance
   var myTable = $('#hot');
   myTable.handsontable({
    data: myData,
    colHeaders: ["Sl No","First Name","Last Name",
	    	"Data Column 1","Data Column 2"],
    colWidths:[100,150,150,120,150],
      columns: [
		    {data: "sl_no"},{data: "first_name"},{data: "last_name"},
		    {data: "col_1"},{data: "col_2"}
	  	],
     startRows: 5,
     startCols: 5,
     // colHeaders: true,
     rowHeaders: true,
     minSpareRows: 80,
     contextMenu: true,
     afterChange: function (change, source) {  // "change" is an array of arrays.
       if (source !== "loadData") {  // Don't need to run this when data is loaded
         for (i = 0; i < change.length; i++) {   // For each change, get the change info and update the record
             var rowNum = change[i][0]; // Which row it appears on Handsontable
             var row = myData[rowNum];  // Now we have the whole row of data, including _id
             var key = change[i][1];  // Handsontable docs calls this "prop"
             var oldVal = change[i][2];
             var newVal = change[i][3];
             var setModifier = {$set: {}};   // Need to build $set object
             setModifier.$set[key] = newVal; // So that we can assign 'key' dynamically using bracket notation of JavaScript object
             if(row._id){
               MyCollection.update(row._id,setModifier);
             }else {
              row["_id"] = Random.id();
              row.rowIndex = rowNum;
               MyCollection.insert(row);
             }
//
         }
       }
     }
   });

		self.autorun(function(){  // Tracker function for reactivity
			//console.log("subs ready",myTable);
       myData = MyCollection.find({}, {sort: {rowIndex: 1}}).fetch();  // Tie in our data
			 var hot = myTable.handsontable('getInstance');
       hot.loadData(myData);
		});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if(MyCollection.find().count()==0){
			
    }
  });
}
