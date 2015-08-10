Router.route('/',{
		name:"home",
		template : "handsontable",
		waitOn : function() {
			console.log(this.params.query);
			Session.set('rows',this.params.query.rows);
		},
		data : function (){
			return this.params.query;
		}
	  //this.render('handsontable',{
		//	data : function(){
		//		console.log(this.params.query);
		//		return this.params.query;
		//	}
	//	});
});
