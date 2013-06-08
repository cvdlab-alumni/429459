//function to export a LAR model in the file format OBJ.

function exportLarModel(larModel){
	var vertices = larModel[0];
	var facets = larModel[1];
	var stringaRis = "";

	stringaRis += "# List of Vertices, with (x,y,z[,w]) coordinates, w is optional and defaults to 1.0.\n";
	

	for(var i=0; i<vertices.length; i++){

		stringaRis += "v "
		for(var y=0; y<vertices[i].length; y++)
			stringaRis += vertices[i][y] + " ";
	
		stringaRis += "\n";
	}

	stringaRis += "\n\n# Face Definitions (see below)\n";

	for(var j=0; j<facets.length; j++){
		
		stringaRis += "fv "
		
		for(var k=0; k<facets[j].length; k++)
			 stringaRis += facets[j][k] + " ";

		stringaRis += "\n";
	}

	return stringaRis;

}

//Example

v = [[0,6],
 	[0,0],
 	[3,0],
 	[6,0],
 	[0,3,5],
 	[3,3,4],
 	[6,3],
 	[6,6],
 	[3,6]];

fv = [[5,6,7,8],
	 [0,5,8],
	 [0,4,5],
	 [1,2,4,5],
	 [2,3,5,6],
	 [0,8,7],
	 [3,6,7],
	 [1,2,3],
	 [0,1,4]];

var larModel = [v,fv]; 
var stringa = exportLarModel(larModel);
console.log(stringa);
