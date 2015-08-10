Meteor.publish("h_data", function (rows){
	if(rows){
		console.log((typeof rows), MyCollection.find({}, { limit : parseInt(rows, 10)}).fetch().length);
		return MyCollection.find({}, { limit : parseInt(rows, 10) });
	}else{
		return MyCollection.find();
	}
});
