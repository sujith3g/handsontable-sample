Meteor.publish("h_data", function (rows){
	if(rows){
		return MyCollection.find({}, { limit : parseInt(rows, 10) });
	}else{
		return MyCollection.find();
	}
});
