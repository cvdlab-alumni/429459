var riga= "";

for (var i = 1; i < 11; i++) {

for (var j = 1; j < 10; j++) {

	riga = riga + i*j + "," + "\t";


};

riga = riga + i*j + "\t";
console.log(riga);
riga="";

};
console.log("\n");
