function allRanD(arr, n){

for (var i = 0; i < n; i++) {
	arr[i]=Math.floor(Math.random()*101);
};

var app = arr.filter(function(item, index, array){return item%2 !== 0  });

app.sort(function(value1, value2){return value1 - value2});

return app;
}
