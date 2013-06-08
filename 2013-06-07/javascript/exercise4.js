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
	

 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////ESERCIZIO 4////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


function invertSign(point){
 return point.map(function(item){ return -item });
}


function wallWithHole(wallDepht,pmin,pmax,l_wall,h_wall){
	var x1 = [ pmin[0], -(pmax[0]-pmin[0]) ];
	if (l_wall-pmax[0]>0)
	x1[2] = l_wall-pmax[0];

	var z2 = [ pmin[1], -(pmax[1]-pmin[1]) ];
	if (h_wall-pmax[1]>0)
	z2[2] = h_wall-pmax[1];

	var sg1 = SIMPLEX_GRID([x1,[wallDepht],[h_wall]]);
	var sg2 = SIMPLEX_GRID([invertSign(x1),[wallDepht],z2]);

	return STRUCT([sg1,sg2]);
}


function minimumOfCouple(couple){
	if(couple[0]<=couple[1])
		return couple[0];
	else
		return couple[1];
}


function windowGen(width, height){
	var depth = minimumOfCouple([width/30.0, height/30.0]);
	var glass_depth = depth/2.0;
	var glass = COLOR(rgba([173, 216, 230, 50]))(CUBOID([[width-depth],[glass_depth],[height-depth]]));
	var chassis_a = SIMPLEX_GRID([[depth],[depth],[height]]);
	var chassis_b = SIMPLEX_GRID([[width-depth],[depth],[depth]]);
	var chassis = COLOR(rgb([0, 0, 0]))(STRUCT([chassis_a,chassis_b,T([2])([height-depth])(chassis_b),T([0])([width-depth])(chassis_a)]));
	
	return STRUCT([chassis,T([0,1,2])([depth,glass_depth/4,depth])(glass)]);
}


function randomScale(){

	var random = Math.random()/5.0;
	var randomSign = Math.random();

	if (randomSign < 0.5)
		return -random+1;
	else
		return random+1;
}

function drawAHouse(portaInversa){
	
	var randomWindow = Math.random()/2.0;

	var house_basement = CUBOID([1,1.6,0.5]);
	var house_wall1 = wallWithHole(0.1,[0.3,0],[0.55,1],1.1,1.2);
	house_wall1 = T([0])([-0.1])(house_wall1);
	var house_wall2 = wallWithHole(0.1,[0.2+randomWindow,0.4+randomWindow],[0.6+randomWindow,0.7+randomWindow],1.5,1.2);
	windowWall2 = windowGen(0.4, 0.3, 0.1);
	windowWall2 = T([0, 1, 2])([0.2+randomWindow, 0, 0.4+randomWindow])(windowWall2);
	house_wall2 = STRUCT([windowWall2, house_wall2]);
	house_wall2 = R([0,1])([PI/2])(house_wall2);
	var house_wall3 = T([0])([1])(house_wall2);
	var house_wall4 = T([0,1])([-0.1, 1.5])(CUBOID([1.1,0.1,1.2]));

	var door = T([0,1,2])([0.2,0,0.5])(CUBOID([0.25, 0.1, 0.5]))
	door = COLOR(rgb([150, 75, 0]))(door);

	if(portaInversa){
		house_wall4 = T([1])([-1.5])(house_wall4)
		house_wall1 = T([1])([1.5])(house_wall1)
		door = T([1])([1.5])(door)
	}

	var h_proof = 1.5
	var proof_vertices = [ [-0.1,1], [1,1], [0.45,h_proof] ];
 	var proof_num_sides = [ [0,1,2] ];
 	var proof_2D = SIMPLICIAL_COMPLEX(proof_vertices)(proof_num_sides);
 	var proof = EXTRUDE([1.6])(proof_2D);
 	proof = R([1,2])([PI/2])(proof);
 	proof = T([0,1,2])([0,1.6,0.2])(proof);
 	proof = COLOR([Math.random(), Math.random(), Math.random()])(proof);
	var house = STRUCT([house_basement, house_wall1, house_wall2, house_wall3, house_wall4, door, proof]);

	var x_scale = randomScale();
	var y_scale = randomScale();
	var z_scale = randomScale();

	house = S([0,1,2])([x_scale, y_scale, z_scale])(house);

	return house;

}

function generaMiniComplesso(portaInversa){
	var struttura = STRUCT([]);

	for (var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			struttura = STRUCT([struttura, T([0,1])([j*2, i*3])(drawAHouse(portaInversa))]);
		}
	}

	return struttura;
}


function generator(dim){
	
	var complex = STRUCT([]);
	var bool = true;
	for(var i=0; i<dim; i++){
		for(var j=0; j<dim; j++){
				complex = STRUCT([complex, T([0,1])([j*10,i*15])(generaMiniComplesso(bool))])
		}
		if(bool)
			bool = false;
		else
			bool = true;
	}
	return complex;
}


DRAW(COLOR(rgb([33, 66, 30]))(T([0,1,2])([27,27,0.3])(CUBOID([17, 23, 0.7]))));
DRAW(T([0,1,2])([28,27,0.6])(generator(2)));

DRAW(COLOR(rgb([33, 66, 30]))(T([0,1,2])([-49,32.5,0.3])(CUBOID([8, 10, 0.7]))));
DRAW(T([0,1,2])([-47,34,0.6])(generator(1)));

DRAW(COLOR(rgb([33, 66, 30]))(T([0,1,2])([-39,38.5,0.3])(CUBOID([8, 10, 0.7]))));
DRAW(T([0,1,2])([-37,39,0.6])(generator(1)));
 
	
