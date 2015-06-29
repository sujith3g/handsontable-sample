if (Meteor.isClient) {
  Template.handsontable.rendered = function () {
   var myData = [];  // Need this to create instance
   var myTable = $("#hot");
   myTable.handsontable({  // Create Handsontable instance
     data: myData,
     colHeaders: ["input","Crawling status","CC",
	    	"Patent/Pub Number","KC"],
      colWidths:[100,150,50,120,50],
      columns: [
		    {data: "input"},{data: "crawlStatus"},{data: "cc"},
		    {data: "number"},{data: "kc"}
	  	],
     startRows: 5,
     startCols: 5,
    //  colHeaders: true,
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

         }
       }
     }
   });

   Tracker.autorun( function () {  // Tracker function for reactivity
       myData = MyCollection.find().fetch();  // Tie in our data
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
