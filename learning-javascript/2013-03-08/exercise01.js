function pushNatural(arr, n){
for (var i = 0; i < n; i++) {
	arr.push(i);
};
return arr;
}

function oddNatural(arr, n){
var app = pushNatural(arr, n);

return app.filter(function(item, index, array){return item%2 === 0  });
}

function doubleOddNatural(arr, n){
	var appoggio = oddNatural(arr, n);
	appoggio.map(function(element){return element*2});
	return appoggio;
}

function doAll(arr, n){
	var appoggio = doubleOddNatural(arr, n);
	appoggio.filter(function(element){return element%4===0})
	var sum = appoggio.reduce(function(prev, cur, index, array){return prev + cur;});
	return sum;
}
