var riga= "";

for (var i = 1; i < 11; i++) {

for (var j = 1; j < 10; j++) {
	if(i===j){
	riga = riga + "1," + "\t";
	}else
	riga = riga + "0," + "\t";


};
	if(i===j){
	riga = riga + "1" + "\t";
	}else
	riga = riga + "0" + "\t";
console.log(riga);
riga="";

};
console.log("\n");
