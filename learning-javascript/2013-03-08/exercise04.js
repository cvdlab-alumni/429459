function select(data, key, values) {
var appoggio = [];

	for (var i=0; i<data.length; i++){
		for (var j=0; j<values.length; j++){
			if (data[i][key]===values[j])
			appoggio.push(data[i]);
	}
}
return appoggio;
}
