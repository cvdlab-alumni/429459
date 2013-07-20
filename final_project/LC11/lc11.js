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
var brown = [244, 164, 96];
var dark_brown = [250, 166, 100];
var white = [400, 400, 400];
var red = [204, 0, 0];
var blue = [30, 144, 255];
var green = [0, 158, 96];
var grey = [101, 97, 98];
var light_grey = [255, 254, 260];

//base
var profile_base_pedestal = BEZIER(S0)( addACoordinate(1, 0, [[0.81, 0], [0.57, 0.19], [0.12, -0.03], [0.12, 0.29]]) );
var base_pedestal = MAP( ROTATIONAL_SURFACE(profile_base_pedestal) )(domRotate);
var profile_base_pedestal_disk = BEZIER(S0)( addACoordinate(1, 0, [[0.81, 0], [0, 0]]) );
var base_pedestal_disk = MAP( ROTATIONAL_SURFACE(profile_base_pedestal_disk) )(domRotate);
//base_pedestal_tot
var base_pedestal_tot = STRUCT([ base_pedestal, base_pedestal_disk ]);
base_pedestal_tot = color_rgb(grey)(base_pedestal_tot);

//LEG
var leg_profile = BEZIER(S0)( addACoordinate(1, 0, [[0.12, 0.32], [0.12, 2.19]] ) );
var leg_surface = MAP( ROTATIONAL_SURFACE(leg_profile) )(domRotate);
leg_surface = color_rgb(grey)(leg_surface);

//leg decoration
var leg_decoration_profile = BEZIER(S0)( addACoordinate(1, 0, [[0.12, 0.29], [0.13, 0.3], [0.13, 0.31], [0.12, 0.32] ]) );
var leg_decoration_surface = MAP( ROTATIONAL_SURFACE(leg_decoration_profile) )(domRotate);
leg_decoration_surface = color_rgb(light_grey)(leg_decoration_surface);

//base_tot
var base_tot_1 = STRUCT([base_pedestal_tot, leg_surface, leg_decoration_surface]);
var base_tot_2 = T([0])([4.05])(base_tot_1);


//Table
var table_central = DOMAIN([[-1.2,5.25], [-1.6, 1.6], [2.25, 2.39]])([1,1,1]);
var table_below =  DOMAIN([[-1.2,5.25], [-1.6, 1.6], [2.19, 2.25]])([1,1,1]);
var table_top = DOMAIN([[-1.2,5.25], [-1.6, 1.6], [2.39, 2.45]])([1,1,1]);

table_top = color_rgb(dark_brown)(table_top);
table_central = color_rgb(brown)(table_central);
table_below = color_rgb(dark_brown)(table_below);

var table_tot = STRUCT([table_central, table_top, table_below]);


//Element under table
var central_element = DOMAIN([[0.12,4.17], [-0.01, 0.01], [1.95, 2.19]])([1,1,1]);

//Triangular element
var triangular_element_piece1 = DOMAIN([[-0.87,-0.12], [-0.01, 0.01], [2.15, 2.19]])([1,1,1]);

var triangular_element_profile_piece2_1 = BEZIER(S0)([[-0.87,-0.01,2.15], [-0.12,-0.01,1.95]]);
var triangular_element_profile_piece2_2 = BEZIER(S0)([[-0.87,-0.01,2.15], [-0.12,-0.01,2.15]]);
var triangular_element_piece_2 = BEZIER(S1)([triangular_element_profile_piece2_1, triangular_element_profile_piece2_2]);
triangular_element_piece_2 = MAP(triangular_element_piece_2)(dom2D);
var triangular_element_piece_2_otherside = T([1])([0.02])(triangular_element_piece_2);
var triangular_element_piece_2_frame = MAP( CYLINDRICAL_SURFACE(triangular_element_profile_piece2_1)([0,0.02,0]) )(dom2D);

var triangular_element_1 = STRUCT([triangular_element_piece1, triangular_element_piece_2, triangular_element_piece_2_otherside, triangular_element_piece_2_frame]);
var triangular_element_2 = R([0,1])([PI/2])(triangular_element_1);
var triangular_element_3 = R([0,1])([-PI/2])(triangular_element_1);
var triangular_element_123 = STRUCT([triangular_element_1, triangular_element_2, triangular_element_3]);
var triangular_element_456 = R([0,1])([PI])(triangular_element_123);
triangular_element_456 = T([0])([4.05])(triangular_element_456);
//Total elements
var elements_under_table = STRUCT([central_element,  triangular_element_123, triangular_element_456]);
elements_under_table = color_rgb(grey)(elements_under_table);


///DRAW
var lc11 = STRUCT([base_tot_1, base_tot_2, table_tot, elements_under_table]);

DRAW(lc11);

