function identity(n){
	for (var i = 0; i < n; i++) {
	var riga="";
		for (var j = 0; j < n; j++) {
			if(i===j)
			var riga = riga + "1\t";
			else
			var riga = riga + "0\t";
		};
	console.log(riga);
	};
}
