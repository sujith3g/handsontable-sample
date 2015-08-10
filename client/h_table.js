Template.h_table.renedered = function (){
	var myTable = $('#my_table');
	var myData = [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]];
	myTable.handsontable({
		data: myData,
		rowHeaders: true,
		colHeaders: true,
		minSpareRows: 80,
		contextMenu: true
	});
}
