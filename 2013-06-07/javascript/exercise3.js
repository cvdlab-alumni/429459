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



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////ESERCIZIO 3////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

var scalePoints = function(points,values) {
  return points.map(function(item){
    return item.map(function(elem){
      return elem*values;
    });
  });
}

function bezier_circle_map(r,selector){ 
  if (selector === undefined) 
    selector = S0 
    var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];
    var circle_points = scalePoints(base_points,r);
    return BEZIER(selector)(circle_points);
}


function randomValue(max){
	var sign = Math.random();
	if(sign > 0.5)
		return Math.random()*max;
	else
		return -Math.random()*max;
}

function drawATree(h_foliage, position){
	var definitionTree = 16;
	var treeTrunk = CYL_SURFACE([0.5-Math.random()*0.2, 1])(definitionTree);
	var treeFoliage = bezier_circle_map(1, S0);
	treeFoliage = MAP(CONICAL_SURFACE([0,0,h_foliage])(treeFoliage))(dom2D);
	treeFoliage = STRUCT([treeFoliage, DISK(1)(definitionTree)]);

	treeTrunk = COLOR(rgb([150, 75, 0]))(treeTrunk);
	
	var colorFoliage = rgb([34+randomValue(20), 139+randomValue(20), 34+randomValue(20)]);
	treeFoliage = COLOR(colorFoliage)(treeFoliage);
	treeFoliage = T([2])([1])(treeFoliage);
	var tree = STRUCT([treeTrunk, treeFoliage])

	if(position != undefined && position != null)
		tree = T([0,1,2])([position[0], position[1], position[2]])(tree)

	DRAW(tree);
}

//Metto un certo numero di alberi in posizioni randomiche all'interno di uno spazio
for (var i=(-20); i<25; i++){
	for (var j=15; j<=25; j++){
		var posX = i-Math.random()*15;
		if(posX<1)
		drawATree((0.4+Math.random()*1.6), [posX, j+Math.random()*15, 1]);

	}

}
	
