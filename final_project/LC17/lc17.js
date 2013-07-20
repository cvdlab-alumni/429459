 //utilities functions

 function bezier_circle_not_centered_map(r,stringaXYZ, vettoreTraslazione, selector){

  if (selector === undefined)
    selector = S0

  if(stringaXYZ === undefined)
    var stringaXYZ = "xy";

  if(stringaXYZ === "xz")
    var base_points = [[-1,0,0],[-1,0,1.6],[1.6,0,1.6],[1.6,0,0],[1.6,0,-1.6],[-1,0,-1.6],[-1,0,0]];

  if(stringaXYZ === "xy")
    var base_points = [[-1,0,0],[-1,1.6,0],[1.6,1.6,0],[1.6,0,0],[1.6,-1.6,0],[-1,-1.6,0],[-1,0,0]];

  if(stringaXYZ === "yz")
    var base_points = [[0,0,1],[0,1.6,1],[0,1.6,-1.6],[0,0,-1.6],[0,-1.6,-1.6],[0,-1.6,1],[0,0,1]];

  var circle_points = scalePoints(base_points,r);

  circle_points = traslaPoints([vettoreTraslazione[0],vettoreTraslazione[1],vettoreTraslazione[2]], circle_points);


  return BEZIER(selector)(circle_points)
}


function addACoordinate(coordinate, value, arrayOfArrays){
  if(coordinate === 0)
    return arrayOfArrays.map( function(item){
      return [value,item[0],item[1]];
    });
  
  if(coordinate === 1)
    return arrayOfArrays.map( function(item){
      return [item[0],value,item[1]];
    });
      
  if(coordinate === 2)
    return arrayOfArrays.map( function(item){
      return [item[0],item[1],value];
    });
    
}

function addOnACoordinate(coordinate, value, arrayOfArrays){
    
    if(coordinate === 0)
      return arrayOfArrays.map( function(item){
        return [value+item[0],item[1],item[2]];
      });
  
    if(coordinate === 1)
      return arrayOfArrays.map( function(item){
        return [item[0],value+item[1],item[2]];
      });
      
    if(coordinate === 2)
      return arrayOfArrays.map( function(item){
        return [item[0],item[1],value+item[2]];
      });
    
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


//grid3DLightDetailed
function grid3DLightDetailed(dimens){
  return STRUCT([grid2Ddetailed(dimens,0,1),grid2Ddetailed(dimens,0,2),grid2Ddetailed(dimens,1,2)]);
}

//grid2Ddetailed
function grid2Ddetailed(dimens,axis1,axis2){
  var semi_grid = function (ax1,ax2){
    var grid_object = function(point){
      
      start = [0,0,0];
      end = [0,0,0];
      start[ax2] = point;
      end[ax2] = point;
      end[ax1] = dimens;
      
      if (point < 0.01){
       return COLOR([1,0,0,0.5])(POLYLINE([start,end]));
      }
      if (isInt(point)){
        return STRUCT([COLOR([1,0,0,0.5])(POLYLINE([start,end])), grid_object(point-0.1)]);
      }
        return STRUCT([COLOR([200/250.0,200/250.0,200/250.0,0.5])(POLYLINE([start,end])), grid_object(point-0.1)]);
    } 
          return grid_object(dimens);
  }
          return STRUCT([semi_grid(axis1,axis2),semi_grid(axis2,axis1)]);
}

//Funzione che mi permette di inserire i colori in rgb con range [0,255]
  function color_rgb(color){
    return function (obj){
                if(color[3] === undefined)
                  return COLOR([color[0]/255.0, color[1]/255.0, color[2]/255.0])(obj);
                else
                  return COLOR([color[0]/255.0, color[1]/255.0, color[2]/255.0, color[3]])(obj);
            }
  }


/////////////////end utilities/////////////////////



//DOMAINS
var definition = 32;
var dom1D = INTERVALS(1)(definition);
var dom2D = PROD1x1([INTERVALS(1)(definition),INTERVALS(1)(definition)]);
var domRotate = DOMAIN([[0,1],[0,2*PI]])([definition, definition]);

//COLORS
var black = [51, 51, 51];
var light_black = [35, 43, 43];
var brown = [205, 127, 50];
var white = [400, 400, 400];
var red = [204, 0, 0];
var blue = [30, 144, 255];
var green = [0, 158, 96];

//piano
var piano = DOMAIN([[0, 2.8], [0, 0.1], [0, 2.8]])([1,1,1]);
//topElement
var tp_piece1 = BEZIER(S0)([[0,0,2.8], [0,0,2.9]]);
var tp_piece2 = BEZIER(S0)([[0,0,2.9], [0,0.3,2.83]]);
var tp_piece3 = BEZIER(S0)([[0,0.3,2.83], [0,0.3,2.73]]);
var tp_piece4 = BEZIER(S0)([[0,0.3,2.73], [0,0.1,2.7]]);
var tp_piece5 = BEZIER(S0)([[0,0.1,2.7], [0,0.1,2.8]]);
var tp_piece6 = BEZIER(S0)([[0,0.1,2.8], [0,0,2.8]]);
var tp_piece_middle = BEZIER(S0)([[0,0.1,2.8], [0,0.3,2.83]]);

var point_top = [0,0.05,2.85];
var point_down = [0,0.2,2.75];

var tp_lateral1 = BEZIER(S1)([tp_piece1, point_top]);
var tp_lateral2 = BEZIER(S1)([tp_piece2, point_top]);
var tp_lateral3 = BEZIER(S1)([tp_piece_middle, point_top]);
var tp_lateral4 = BEZIER(S1)([tp_piece6, point_top]);

var tp_lateral5 = BEZIER(S1)([tp_piece_middle, point_down]);
var tp_lateral6 = BEZIER(S1)([tp_piece3, point_down]);
var tp_lateral7 = BEZIER(S1)([tp_piece4, point_down]);
var tp_lateral8 = BEZIER(S1)([tp_piece5, point_down]);

tp_lateral1 = MAP( tp_lateral1 )(dom2D);
tp_lateral2 = MAP( tp_lateral2 )(dom2D);
tp_lateral3 = MAP( tp_lateral3 )(dom2D);
tp_lateral4 = MAP( tp_lateral4 )(dom2D);
tp_lateral5 = MAP( tp_lateral5 )(dom2D);
tp_lateral6 = MAP( tp_lateral6 )(dom2D);
tp_lateral7 = MAP( tp_lateral7 )(dom2D);
tp_lateral8 = MAP( tp_lateral8 )(dom2D);

var tp_lateral = STRUCT([tp_lateral1, tp_lateral2, tp_lateral3, tp_lateral4, tp_lateral5, tp_lateral6, tp_lateral7, tp_lateral8]);
var tp_lateral_left = T([0,1,2])([2.8,0,0])(tp_lateral);

tp_piece1 = MAP( CYLINDRICAL_SURFACE(tp_piece1)([2.8,0,0]) )(dom2D);
tp_piece2 = MAP( CYLINDRICAL_SURFACE(tp_piece2)([2.8,0,0]) )(dom2D);
tp_piece3 = MAP( CYLINDRICAL_SURFACE(tp_piece3)([2.8,0,0]) )(dom2D);
tp_piece4 = MAP( CYLINDRICAL_SURFACE(tp_piece4)([2.8,0,0]) )(dom2D);
tp_piece5 = MAP( CYLINDRICAL_SURFACE(tp_piece5)([2.8,0,0]) )(dom2D);
tp_piece6 = MAP( CYLINDRICAL_SURFACE(tp_piece6)([2.8,0,0]) )(dom2D);



//////mushrooms!!
var profile_base_mushroom = BEZIER(S0)( addACoordinate(1, 0, [[0.065, 0.32], [0.08, 0.15], [0.09, 0]]) );
var surface_base_mushroom = MAP( ROTATIONAL_SURFACE(profile_base_mushroom) )(domRotate);
surface_base_mushroom = color_rgb(brown)(surface_base_mushroom);

var profile_top_mushroom =  BEZIER(S0)( addACoordinate(1, 0, [[0, 0.46], [0.24, 0.44], [0.31, 0.3], [0, 0.32]]) );
var surface_top_mushroom = MAP( ROTATIONAL_SURFACE(profile_top_mushroom) )(domRotate);


var mushroom_black = STRUCT([surface_base_mushroom, color_rgb(black)(surface_top_mushroom) ]);
var mushroom_red = STRUCT([surface_base_mushroom, color_rgb(red)(surface_top_mushroom) ]);
var mushroom_white = STRUCT([surface_base_mushroom, color_rgb(white)(surface_top_mushroom) ]);
var mushroom_blue = STRUCT([surface_base_mushroom, color_rgb(blue)(surface_top_mushroom) ]);
var mushroom_green = STRUCT([surface_base_mushroom, color_rgb(green)(surface_top_mushroom) ]);

mushroom_black = R([1,2])([-PI/2])(mushroom_black);
mushroom_red = R([1,2])([-PI/2])(mushroom_red);
mushroom_white = R([1,2])(-[PI/2])(mushroom_white);
mushroom_blue = R([1,2])([-PI/2])(mushroom_blue);
mushroom_green = R([1,2])([-PI/2])(mushroom_green);

mushroom_black = T([0,1,2])([2, 0.1, 0.5])(mushroom_black);
mushroom_blue = T([0,1,2])([0.6, 0.1, 0.45])(mushroom_blue);
mushroom_white = T([0,1,2])([1.05, 0.1, 1.65])(mushroom_white);
mushroom_green = T([0,1,2])([0.35, 0.1, 2.15])(mushroom_green);
mushroom_red = T([0,1,2])([2.45, 0.1, 2.05])(mushroom_red);



///////////Total Struct/////////////
//piano
piano = color_rgb(black)(piano);
//top
var top_bl = STRUCT([tp_piece1, tp_piece2, tp_piece3, tp_piece5, tp_piece6, tp_lateral, tp_lateral_left]);
top_bl = color_rgb(light_black)(top_bl);
var top_br = color_rgb(brown)(tp_piece4);
top_tot = STRUCT([top_bl, top_br]);
top_tot = T([0,1,2])([0, 0.001, 0.001])(top_tot);

//lc17
var lc17 = STRUCT([piano, top_tot, mushroom_black, mushroom_blue, mushroom_white, mushroom_green, mushroom_red]);

//DRAW
DRAW(lc17);

