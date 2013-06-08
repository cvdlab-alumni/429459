//Utilities

//Funzione che mi permette di inserire i colori in rgb con range [0,255]
  function rgb(color){
  return [color[0]/255, color[1]/255, color[2]/255];
  }

  //Funzione che mi permette di inserire i colori in rgba con range [0,255]
  function rgba(color){
  return [color[0]/255, color[1]/255, color[2]/255, color[3]/100];
  }

  
// function x(u,v){
// 	return u+v;
// }

// function y(u.v){
// 	return u-v;
// }
 
var base_width = -50;
var base_height = 50;
var h_media = 10;
var definition = 16;
var dom3D = DOMAIN([[base_width, base_height], [base_width, base_height]])([base_height,base_height]);
var dom2D = PROD1x1([INTERVALS(1)(definition),INTERVALS(1)(definition)]);


function randomAltitude(point){
	var u = point[0];
	var v = point[1];

	var centro = [11.0, 17.0];
	var raggio = 9;

	var distanzaPunto = Math.sqrt((centro[0]-point[0])*(centro[0]-point[0]) + (centro[1]-point[1])*(centro[1]-point[1]))


	if(distanzaPunto<9){
		var a = 5
		var b = 5
		//var h = ((u/a)*(u/a) + (v/b)*(v/b))/(-2.0)
		var h = -2
		return [u, v, h]
	}

	if((u>20 && v>25)||((u<15 && v>10)))
		return[u, v, Math.random()*h_media/10];
	return [u, v, Math.random()*h_media];
}


var model = MAP(randomAltitude)(dom3D);
model = COLOR([160/255.0, 82/255.0, 45/255.0])(model);
DRAW(model);

var base_cuboid = CUBOID([100, 100, 4.2]);
base_cuboid = T([0,1,2])([-50, -50, -4])(base_cuboid);
base_cuboid = COLOR([160/255.0, 82/255.0, 45/255.0])(base_cuboid);
DRAW(base_cuboid);


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////ESERCIZIO 2////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

var lago = DOMAIN([[2,20],[7,27],[-1,0.3]])([1,1,1]);
lago = COLOR(rgb([70, 130, 180]))(lago);
DRAW(lago);

