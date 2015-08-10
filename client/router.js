Router.route('/',{
		name:"home",
		layoutTemplate : "layout",
		template : "handsontable",
		waitOn : function() {
			//console.log(this.params.query);
			Session.set('rows',this.params.query.rows);
		},
		data : function (){
			return this.params.query;
		}
});
