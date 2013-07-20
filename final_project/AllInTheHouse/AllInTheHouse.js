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


function invertSign(point){
 return point.map(function(item){ return -item });
}

function minimumOfCouple(couple){
  if(couple[0]<=couple[1])
    return couple[0];
  else
    return couple[1];
}


function windowGen(width, height, depth){
	if(depth === undefined)
  		var depth = minimumOfCouple([width/30.0, height/30.0]);

  var glass_depth = depth/2.0;
  var glass = color_rgb([173, 216, 230, 0.5])(CUBOID([[width-depth],[glass_depth],[height-depth]]));
  var chassis_a = SIMPLEX_GRID([[depth],[depth],[height]]);
  var chassis_b = SIMPLEX_GRID([[width-depth],[depth],[depth]]);
  var chassis = color_rgb([0, 0, 0])(STRUCT([chassis_a,chassis_b,T([2])([height-depth])(chassis_b),T([0])([width-depth])(chassis_a)]));

  return STRUCT([chassis,T([0,1,2])([depth,glass_depth/4,depth])(glass)]);
}

/////////////////end utilities/////////////////////



 //DOMAINS
var definition = 16;
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
var glass_color = [100, 149, 237, 0.5];
var directional_lights_color = [255, 168, 0, 0.5];
var light_color = [482,468,24, 0.7];

//////////////////////////////////////////////////////////////////


////////////////////////////LC17/////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////

///////////////////////////////LC11////////////////////////////////////////////

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


///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////LC7////////////////////////////////////////

//Legs
var leg_circle1 = bezier_circle_not_centered_map(0.1, "xy", [-1.33,0,0], S0);
var leg_circle2 = bezier_circle_not_centered_map(0.08, "yz", [-0.1,0,1.89], S0);

var leg_profile1 = BEZIER(S1)(addACoordinate(1, 0, [[-1.43, 0], [-1.43, 1.88], [-1.63, 2.08], [-0.1, 1.99]]));

var leg_surface1 = COONS_PATCH([leg_circle1, leg_circle2, leg_profile1, leg_profile1]);
var leg_surface1_mapped = MAP(leg_surface1)(dom2D);
var disk_for_leg_surface = T([1])([-1.33])(DISK(0.1)());


var end_leg_element1 = T([0,1,2])([0,-1.33,-0.04])( EXTRUDE([0,0,0.2])( DISK(0.08)() ) );
var end_leg_element2 = BEZIER(S0)( addACoordinate(1, 0, [[0, 0.16], [0.17, 0.18], [0.15, 0.05], [0, 0.1]]) );
end_leg_element2 = MAP( ROTATIONAL_SURFACE(end_leg_element2) )(domRotate);
end_leg_element2 = T([0,1,2])([0,-1.33,-0.17])(end_leg_element2);

var leg = STRUCT([leg_surface1_mapped, disk_for_leg_surface, end_leg_element2]);
leg = color_rgb(light_grey)(leg);
end_leg_element1 = color_rgb([0,0,0])(end_leg_element1);
leg = STRUCT([leg, end_leg_element1]);

var legs_4 = STRUCT([ leg, R([0,1])([PI/2])(leg), R([0,1])([PI])(leg), R([0,1])([(3/2.0)*PI])(leg) ]);
legs_4 = R([0,1])([PI/4])(legs_4);


//junction
var cylindrical_junction_part1 = T([2]) ([1.68]) ( EXTRUDE([0,0,0.54])( DISK(0.12)([definition,2]) ) );
cylindrical_junction_part1 = color_rgb([0,0,0])(cylindrical_junction_part1);
var cylindrical_junction_part2 = T([2]) ([1.7]) ( EXTRUDE([0,0,0.32])( DISK(0.13)([definition,2]) ) );
var cylindrical_junction_part3 = T([2]) ([2.04]) ( EXTRUDE([0,0,0.165])( DISK(0.13)([definition,2]) ) );
cylindrical_junction_part2 = color_rgb(light_grey)(cylindrical_junction_part2);
cylindrical_junction_part3 = color_rgb(light_grey)(cylindrical_junction_part3);

var cylindrical_junction_tot = STRUCT([cylindrical_junction_part1, cylindrical_junction_part2, cylindrical_junction_part3]);

//other "legs" under seat
var tube_under_seat_1_circle1 = bezier_circle_not_centered_map(0.1, "xy", [-1.03,0,2.58], S0);
var tube_under_seat_1_circle2 = bezier_circle_not_centered_map(0.08, "yz", [-0.1,0,2.99], S0);
var tube_under_seat_1_profile = BEZIER(S1)( addACoordinate(1, 0, [[-1.13, 2.58], [-0.53, 2.92], [-0.4, 2.96], [-0.1, 2.99]] )  );
var tube_under_seat_1_tot = COONS_PATCH([tube_under_seat_1_circle1, tube_under_seat_1_circle2, tube_under_seat_1_profile, tube_under_seat_1_profile]);
var tube_under_seat_1_tot_mapped = MAP(tube_under_seat_1_tot)(dom2D);

tube_under_seat_1_tot_mapped = R([1,2])([PI])(tube_under_seat_1_tot_mapped);
tube_under_seat_1_tot_mapped = R([0,1])(PI/2.0)(tube_under_seat_1_tot_mapped);
tube_under_seat_1_tot_mapped = T([2])([5.11])(tube_under_seat_1_tot_mapped);

var tubes_under_seat = STRUCT([ tube_under_seat_1_tot_mapped, R([0,1])((2/3.0)*PI)(tube_under_seat_1_tot_mapped), R([0,1])((4/3.0)*PI)(tube_under_seat_1_tot_mapped) ]);
tubes_under_seat = color_rgb(light_grey)(tubes_under_seat);

//pillows
var first_pillow_border_profile = BEZIER(S0)( addACoordinate(1, 0, [[1.47, 2.62], [1.73, 2.69], [1.66, 2.46], [1.47, 2.46]]) );
var first_pillow_border = MAP( ROTATIONAL_SURFACE(first_pillow_border_profile) )(domRotate);

var first_pillow_intern = EXTRUDE([0, 0, 0.16])( DISK(1.49)() );
first_pillow_intern = T([2])([2.46])(first_pillow_intern);

var first_pillow = STRUCT([ first_pillow_border, first_pillow_intern ]);
first_pillow = color_rgb(black)(first_pillow);


var second_pillow_top_profile = BEZIER(S0)( addACoordinate(1, 0, [[0, 3.16], [1.73, 3.3], [1.7, 3.1], [1.71, 2.9]]) );
var second_pillow_top = MAP( ROTATIONAL_SURFACE(second_pillow_top_profile) )(domRotate);

var second_pillow_below_profile = BEZIER(S0)( addACoordinate(1, 0, [[0, 2.64], [1.73, 2.5], [1.7, 2.7], [1.71, 2.9]]) );
var second_pillow_below = MAP( ROTATIONAL_SURFACE(second_pillow_below_profile) )(domRotate);

var second_pillow = STRUCT([ second_pillow_top, second_pillow_below ]);
second_pillow = color_rgb(black)(second_pillow);

//Tubes for backrest
//left
var tube_element_1_profile1_l = BEZIER(S0)( [[0, 1.01, 2.61], [0.2, 0.79, 2.78], [0.2, 1.25, 2.77], [0, 1.01, 2.61]] );
var tube_element_1_profile2_l = BEZIER(S0)( [[0.45, 1.01, 2.61], [0.45, 0.79, 2.78], [0.45, 1.25, 2.77], [0.45, 1.01, 2.61]] );
var tube_element_surface_l = BEZIER(S1)([tube_element_1_profile1_l, tube_element_1_profile2_l]);
tube_element_surface_l = MAP(tube_element_surface_l)(dom2D);

var tube_element_2_profile1_l = BEZIER(S0)( [[0, 1.01, 2.61], [0.2, 1.25, 2.77], [0.2, 0.79, 2.78], [0, 1.01, 2.61]] );
var tube_element_2_profile2_l = bezier_circle_not_centered_map(0.07, "xz", [0.07,0,4.24], S0);
var tube_element_2_profile3_l = BEZIER(S1)( [[0, 1.01, 2.61], [0, 1.39, 3.52], [0, 2.22, 4.53], [0, 0, 4.24]] );
var tube_element_2_l = COONS_PATCH([tube_element_2_profile1_l, tube_element_2_profile2_l, tube_element_2_profile3_l, tube_element_2_profile3_l ]);
tube_element_2_l = MAP(tube_element_2_l)(dom2D);

var tubes_l = STRUCT([ tube_element_surface_l, tube_element_2_l ]);
tubes_l = T([0,1,2])([-1.85, -0.5, -0.13])(tubes_l);
tubes_l = color_rgb(light_grey)(tubes_l);

//right
var tube_element_1_profile1_r = BEZIER(S0)( [[0, 1.01, 2.61], [-0.2, 0.79, 2.78], [-0.2, 1.25, 2.77], [0, 1.01, 2.61]] );
var tube_element_1_profile2_r = BEZIER(S0)( [[-0.45, 1.01, 2.61], [-0.45, 0.79, 2.78], [-0.45, 1.25, 2.77], [-0.45, 1.01, 2.61]] );
var tube_element_surface_r = BEZIER(S1)([tube_element_1_profile1_r, tube_element_1_profile2_r]);
tube_element_surface_r = MAP(tube_element_surface_r)(dom2D);

var tube_element_2_profile1_r = BEZIER(S0)( [[0, 1.01, 2.61], [-0.2, 1.25, 2.77], [-0.2, 0.79, 2.78], [0, 1.01, 2.61]] );
var right_points = [[1,0,0],[1,0,1.6],[-1.6,0,1.6],[-1.6,0,0],[-1.6,0,-1.6],[1,0,-1.6],[1,0,0]];
right_points = scalePoints(right_points,0.07);
right_points = traslaPoints([-0.07,0,4.24], right_points);
var tube_element_2_profile2_r = BEZIER(S0)( right_points );

var tube_element_2_profile3_r = BEZIER(S1)( [[0, 1.01, 2.61], [0, 1.39, 3.52], [0, 2.22, 4.53], [0, 0, 4.24]] );
var tube_element_2_r = COONS_PATCH([tube_element_2_profile1_r, tube_element_2_profile2_r, tube_element_2_profile3_r, tube_element_2_profile3_r ]);
tube_element_2_r = MAP(tube_element_2_r)(dom2D);

var tubes_r = STRUCT([ tube_element_surface_r, tube_element_2_r ]);

tubes_r = T([0,1,2])([1.85, -0.5, -0.13])(tubes_r);
tubes_r = color_rgb(light_grey)(tubes_r);

//back

var tube_back_circle1 = bezier_circle_not_centered_map(0.07, "xz", [0,-2,2.48], S0);
var tube_back_circle2 = bezier_circle_not_centered_map(0.07, "xy", [0,-2.4,4.24], S0);
var tube_back_profile = BEZIER(S1)([[-0.07, -2, 2.48], [-0.07, -2.7, 2.4], [-0.07, -2.5, 3], [-0.07,-2.4,4.24]]);
var tube_back_surface = COONS_PATCH([tube_back_circle1, tube_back_circle2, tube_back_profile, tube_back_profile]);
tube_back_surface = MAP(tube_back_surface)(dom2D);
tube_back_surface = T([1,2])([0.45, 0.08])(tube_back_surface);

var tubes_for_back_of_chair = STRUCT([ tubes_l, tubes_r, tube_back_surface ]);

//back_pillow
var back_pillow_circle1 = BEZIER(S0)( addACoordinate(1, 0.3, [[1.8, 4.4], [1.24, 4], [2.4, 3.35], [2.39, 4.53], [1.8, 4.4]]) );
var back_pillow_circle2 = BEZIER(S0)( addACoordinate(1, 0.3, [[-1.8, 4.4], [-1.24, 4], [-2.4, 3.35], [-2.39, 4.53], [-1.8, 4.4]]) );
var back_pillow_circle_middle = BEZIER(S0)( addACoordinate(0, 0, [[-1.9, 4.4], [-1.44, 3.9], [-2.4, 3.45], [-2.39, 4.63], [-1.9, 4.4]]) );

var back_pillow_profile1 = BEZIER(S1)( addACoordinate(2, 4.4, [[-1.8, 0.3], [-1.89, -1.12], [-1.21, -1.75], [0, -1.9]]) );
var back_pillow_profile2 = BEZIER(S1)( addACoordinate(2, 4.4, [[1.8, 0.3], [1.89, -1.12], [1.21, -1.75], [0, -1.9]]) );

var back_pillow_surface1 = COONS_PATCH([back_pillow_circle2, back_pillow_circle_middle, back_pillow_profile1, back_pillow_profile1 ]);
var back_pillow_surface2 = COONS_PATCH([back_pillow_circle1, back_pillow_circle_middle, back_pillow_profile2, back_pillow_profile2 ]);
back_pillow_surface1 = MAP(back_pillow_surface1)(dom2D);
back_pillow_surface2 = MAP(back_pillow_surface2)(dom2D);

back_pillow_closure_l_profile = BEZIER(S0)( addACoordinate(1, 0, [[0, 0], [0.13, 0], [0.16, 0.07], [0.17, 0]]) );


var back_pillow_closure_l = MAP( BEZIER(S1)([back_pillow_circle2, [-1.8, 0.3, 4.2]]) )(dom2D);
var back_pillow_closure_r = MAP( BEZIER(S1)([back_pillow_circle1, [1.8, 0.3, 4.2]]) )(dom2D);

var back_pillow = STRUCT([back_pillow_surface1, back_pillow_surface2, back_pillow_closure_l, back_pillow_closure_r]);
back_pillow = color_rgb(black)(back_pillow);

//DRAW
var lc7 = STRUCT([ legs_4, cylindrical_junction_tot, tubes_under_seat, first_pillow, second_pillow, tubes_for_back_of_chair, back_pillow ]);

///////////////////////////////////////////////////////////////////////////////

/////////////////////////////VOITURE MINIMUM/////////////////////////////////

//TOP
var top_curve1 = BEZIER(S0)(addACoordinate(1,0,[[2.18, 5.31], [2.94, 5.86], [8.45, 6.53], [11.28, 1.44]]));
var top_curve2 = BEZIER(S0)(addACoordinate(1,6,[[2.18, 5.31], [2.94, 5.86], [8.45, 6.53], [11.28, 1.44]]));

var top_surface1 = BEZIER(S1)([top_curve1, top_curve2]);

top_surface1 = MAP(top_surface1)(dom2D);
top_surface1 = color_rgb(red)(top_surface1);

//car_door
var car_door_curve1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[5.37, 5.15], [6.1, 5.57], [7.69, 5.53], [8.32, 5.43]])));
var car_door_curve2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[7.31, 1.33], [7.99, 4.08], [8.17, 4.88], [8.32, 5.43]])));
var car_door_curve3 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[7.31, 1.33], [5.92, 1.33], [5.21, 1.33], [4.52, 1.33]])));
var car_door_curve4 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[3.58, 3.01], [4.15, 2.91], [4.6, 2.14], [4.52, 1.33]])));
var car_door_curve5 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[3.58, 3.01], [4.12, 3.71], [4.42, 4.12], [5.37, 5.15]])));

var car_door_win_curve1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[4.22, 3.53], [4.12, 3.6], [4.45, 3.93], [5.39, 5.03]])));
var car_door_win_curve2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[7.7, 3.62], [7.6, 3.4], [4.36, 3.4], [4.22, 3.53]])));
var car_door_win_curve3 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[7.7, 3.62], [7.97, 4.55], [8.29, 5.27], [7.99, 5.31]])));
var car_door_win_curve4 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[5.39, 5.03], [5.72, 5.3], [7.79, 5.4], [7.99, 5.31]])));

var car_door_surface1 = BEZIER(S1)([car_door_curve1, car_door_win_curve4]);
var car_door_surface2 = BEZIER(S1)([car_door_curve2, car_door_win_curve3]);
var car_door_surface3 = BEZIER(S1)([car_door_curve3, car_door_win_curve2]);
var car_door_surface4 = BEZIER(S1)([car_door_curve4, [1.22, 0, 3.53]]);
var car_door_surface5 = BEZIER(S1)([car_door_curve5, car_door_win_curve1]);


//bottom
var bottom_profile1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[14.28, 1.44], [14.03, 1.3], [13.59, 1.35], [12.98, 1.3]])));
var bottom_profile2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[10.47, 1.21], [10.3, 3.47], [13.07, 3.22], [12.98, 1.3]])));
var bottom_profile3 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[10.47, 1.21], [7.93, 1.1], [5.87, 1.09], [4.22, 1.16]])));
var bottom_profile4 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[3.25, 2.82], [4.02, 2.78], [4.5, 2.01], [4.22, 1.16]])));
var bottom_profile5 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[3.25, 2.82], [5.18, 5.31]])));


//car surface_lateral
var car_lateral_surface1 = BEZIER(S1)([car_door_curve5, bottom_profile5]);
var car_lateral_surface2 = BEZIER(S1)([car_door_curve1, top_curve1]);
var car_lateral_surface3 = BEZIER(S1)([car_door_curve4, bottom_profile4]);
var car_lateral_surface4 = BEZIER(S1)([car_door_curve3, bottom_profile3]);

var control_curve_lateral_surface1 = BEZIER(S0)( addOnACoordinate(0, -3, addACoordinate(1, 0, [[9.57, 4.45], [10.11, 4.6], [12.66, 3.89], [13.13, 2.76]]))  );
var control_curve_lateral_surface2 = BEZIER(S0)( addOnACoordinate(0, -3, addACoordinate(1, 0, [[10.47, 1.21], [10.16, 4.04], [9.86, 4.58], [9.66, 5.07]]))  );

var car_lateral_surface5 = BEZIER(S1)([control_curve_lateral_surface1, bottom_profile2]);
var car_lateral_surface6 = BEZIER(S1)([car_door_curve2, control_curve_lateral_surface2]);
var car_lateral_surface7 = BEZIER(S1)([[10, 0, 2.49], bottom_profile1]);


//car profiles
var bottom_profile1_r = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 6, [[14.28, 1.44], [14.03, 1.3], [13.59, 1.35], [12.98, 1.3]])));
var bottom_profile2_r = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 6, [[10.47, 1.21], [10.3, 3.47], [13.07, 3.22], [12.98, 1.3]])));
var bottom_profile3_r = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 6, [[10.47, 1.21], [7.93, 1.1], [5.87, 1.09], [4.22, 1.16]])));
var bottom_profile4_r = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 6, [[3.25, 2.82], [4.02, 2.78], [4.5, 2.01], [4.22, 1.16]])));

var bottom_surface1 = BEZIER(S1)([bottom_profile1, bottom_profile1_r]);
var bottom_surface2 = BEZIER(S1)([bottom_profile2, bottom_profile2_r]);
var bottom_surface3 = BEZIER(S1)([bottom_profile3, bottom_profile3_r]);
var bottom_surface4 = BEZIER(S1)([bottom_profile4, bottom_profile4_r]);

//car glasses
var car_left_glass_point = [3.2, 0, 4.3];
var car_left_glass_piece1 = BEZIER(S1)([car_door_win_curve1, car_left_glass_point]);
var car_left_glass_piece2 = BEZIER(S1)([car_door_win_curve2, car_left_glass_point]);
var car_left_glass_piece3 = BEZIER(S1)([car_door_win_curve3, car_left_glass_point]);
var car_left_glass_piece4 = BEZIER(S1)([car_door_win_curve4, car_left_glass_point]);

var car_front_glass = DOMAIN([[0.15, 5.85], [0, 0.02], [1.1, 3]])([1,1,1]);
car_front_glass = color_rgb(glass_color)(car_front_glass);

////car front
var car_front_piece1 = wallWithHole(0.02,[0.15,1.1],[5.85,3],6, 3.16);
var car_front_piece2 = DOMAIN([[0.6, 5.4], [0,0.02], [-2.2,0]])([1,1,1]);
//light
var light_profile = BEZIER(S0)(addACoordinate(1, 0, [[0, 0.15], [0.21, 0.16], [0.39, 0.11], [0.53, 0]]));
var light_profile_rotated = MAP(ROTATIONAL_SURFACE(light_profile))(domRotate);
light_profile_rotated = R([1,2])([-PI/2])(light_profile_rotated);
light_profile_rotated = T([0])([3])(light_profile_rotated);

light_profile_rotated = color_rgb(light_color)(light_profile_rotated);

var disk_back_light = DISK(0.53)([definition,2]);
disk_back_light = color_rgb(white)(disk_back_light);
disk_back_light = R([1,2])([PI/2])(disk_back_light);
disk_back_light = T([0,1])([3, 0.001])(disk_back_light);

var light_profile_contour = BEZIER(S0)(addACoordinate(1, 0, [[0.45, 0], [0.45, 0.05], [0.5, 0.15], [0.53, 0]]));
var light_profile_contour_rotated = MAP(ROTATIONAL_SURFACE(light_profile_contour))(domRotate);
light_profile_contour_rotated = R([1,2])([-PI/2])(light_profile_contour_rotated);
light_profile_contour_rotated = T([0])([3])(light_profile_contour_rotated);

light_profile_contour_rotated = color_rgb(light_grey)(light_profile_contour_rotated);

var front_light = STRUCT([ light_profile_rotated, light_profile_contour_rotated, disk_back_light ]);
//directional_lights
var directional_left_light = DOMAIN([[4.3, 4.9], [0.001, 0.15], [0, 0.15]])([1,1,1]);
var directional_right_light = DOMAIN([[1.1, 1.7], [0.001, 0.15], [0, 0.15]])([1,1,1]);

var car_front_plane = STRUCT([ car_front_piece1, car_front_piece2 ]);
car_front_plane = color_rgb(red)(car_front_plane);

directional_right_light = color_rgb(directional_lights_color)(directional_right_light);
directional_left_light = color_rgb(directional_lights_color)(directional_left_light);

car_front_plane = STRUCT([ car_front_plane, car_front_glass, front_light, directional_right_light, directional_left_light ]);

car_front_plane = R([0,1])([PI/2])(car_front_plane);
car_front_plane = T([0,1,2])([-1.52, 0, 2.38])(car_front_plane);
car_front_plane = R([0,2])([(38/180)*PI])(car_front_plane);


//fender_left
var fender_l_profile1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[3.23, 2.8], [2.66, 2.7], [2.12, 2.68], [1.75, 1.24]])));
var fender_l_conrtol1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0.4, [[3.71, 3.37], [2.4, 3.8], [1.59, 3.11], [1.06, 1.73]])));
var fender_l_profile2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0.6, [[3.47, 3.09], [1.9, 1.08]])));

var fender_left = BEZIER(S1)([fender_l_profile1, fender_l_conrtol1, fender_l_profile2]);

//fender_right
var fender_r_profile1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 6, [[3.23, 2.8], [2.66, 2.7], [2.12, 2.68], [1.75, 1.24]])));
var fender_r_conrtol1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 5.6, [[3.71, 3.37], [2.4, 3.8], [1.59, 3.11], [1.06, 1.73]])));
var fender_r_profile2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 5.4, [[3.47, 3.09], [1.9, 1.08]])));

var fender_right = BEZIER(S1)([fender_r_profile1, fender_r_conrtol1, fender_r_profile2]);

//coverage_between_wheels
//front
var coverage_between_wheels_front_profile1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0.6, [[3.25, 2.82], [4.02, 2.78], [4.5, 2.01], [4.22, 1.16]])));
var point_for_coverage_profile1 = [-1.1, 0.6, 1.08];
var coverage_between_wheels_front_surface1 = BEZIER(S1)([coverage_between_wheels_front_profile1, point_for_coverage_profile1]);

var coverage_between_wheels_front_profile2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 5.4, [[3.25, 2.82], [4.02, 2.78], [4.5, 2.01], [4.22, 1.16]])));
var point_for_coverage_profile2 = [-1.1, 5.4, 1.08];
var coverage_between_wheels_front_surface2 = BEZIER(S1)([coverage_between_wheels_front_profile2, point_for_coverage_profile2]);

var coverage_between_wheels_front_profile3 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0.6, [[4.22, 1.16], [1.9, 1.08]])));
var coverage_between_wheels_front_profile3_1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 5.4, [[4.22, 1.16], [1.9, 1.08]])));
var coverage_between_wheels_front_surface3 = BEZIER(S1)([coverage_between_wheels_front_profile3, coverage_between_wheels_front_profile3_1]);
//back
var coverage_between_wheels_back_profile1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0.6, [[10.47, 1.21], [10.3, 3.47], [13.07, 3.22], [12.98, 1.3]])));
var coverage_between_wheels_back_profile1_2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0.6, [[10.47, 1.21], [12.98, 1.3]])));
var coverage_between_wheels_back_surface1 = BEZIER(S1)([coverage_between_wheels_back_profile1, coverage_between_wheels_back_profile1_2]);

var coverage_between_wheels_back_profile2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 5.4, [[10.47, 1.21], [10.3, 3.47], [13.07, 3.22], [12.98, 1.3]])));
var coverage_between_wheels_back_profile2_2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 5.4, [[10.47, 1.21], [12.98, 1.3]])));
var coverage_between_wheels_back_surface2 = BEZIER(S1)([coverage_between_wheels_back_profile2, coverage_between_wheels_back_profile2_2]);

var coverage_between_wheels_back_surface3 = BEZIER(S1)([coverage_between_wheels_back_profile1_2, coverage_between_wheels_back_profile2_2]);



//wheels
var wheel_profile1 = BEZIER(S0)(addACoordinate(1, 0, [[0, 0.4], [0.09, 0.39], [0.12, 0.37], [0.16, 0.36]]));
var wheel_profile2 = BEZIER(S0)(addOnACoordinate(0, -0.15, addACoordinate(1, 0, [[0.62, 0.34], [0.5, 0.41], [0.22, 0.48], [0.31, 0.36]])));
var wheel_profile3 = BEZIER(S0)(addOnACoordinate(0, -0.15, addACoordinate(1, 0, [[0.62, 0.34], [0.57, 0.41], [0.64, 0.41], [0.75, 0.4]])));
var tire_profile1 = BEZIER(S0)(addOnACoordinate(0, -0.15, addACoordinate(1, 0, [[1.2, 0], [1.25, 0.54], [1, 0.41], [0.75, 0.4]])));

wheel_profile1 = ROTATIONAL_SURFACE(wheel_profile1);
wheel_profile2 = ROTATIONAL_SURFACE(wheel_profile2);
wheel_profile3 = ROTATIONAL_SURFACE(wheel_profile3);
tire_profile1 = ROTATIONAL_SURFACE(tire_profile1);



//seats
var seat_profile1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[5.86, 1.17], [4.59, 3.05], [7.96, 2.2], [7.57, 1.14]])));
var seat_profile2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[5.86, 1.17], [7.57, 1.14]])));
var seat_profile1_2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 1.8, [[5.86, 1.17], [4.59, 3.05], [7.96, 2.2], [7.57, 1.14]])));
var seat_profile2_2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 1.8, [[5.86, 1.17], [7.57, 1.14]])));

var seat_surface1 = BEZIER(S1)([seat_profile1, seat_profile2]);
var seat_surface2 = BEZIER(S1)([seat_profile1_2, seat_profile2_2]);
var seat_surface3 = BEZIER(S1)([seat_profile1, seat_profile1_2]);
var seat_surface4 = BEZIER(S1)([seat_profile2, seat_profile2_2]);

var seat_back_profile1 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[7.27, 1.82], [8.1, 4.73], [8.42, 3.6], [7.57, 1.14]])));
var seat_back_profile2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 0, [[7.27, 1.82], [7.57, 1.14]])));
var seat_back_profile1_2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 1.8, [[7.27, 1.82], [8.1, 4.73], [8.42, 3.6], [7.57, 1.14]])));
var seat_back_profile2_2 = BEZIER(S0)(addOnACoordinate(0, -3, addACoordinate(1, 1.8, [[7.27, 1.82], [7.57, 1.14]])));

var seat_back_surface1 = BEZIER(S1)([seat_back_profile1, seat_back_profile2]);
var seat_back_surface2 = BEZIER(S1)([seat_back_profile1_2, seat_back_profile2_2]);
var seat_back_surface3 = BEZIER(S1)([seat_back_profile1, seat_back_profile1_2]);


//Steering_wheel
var steering_wheel_auction = EXTRUDE([0,0,2])( DISK(0.08)([definition,2]) );
var steering_wheel_center = T([2])([2])( EXTRUDE([0,0,0.2])( DISK(0.1)([definition,2])) );
var steering_wheel_torus = T([2])([2.3])(TORUS_SURFACE([0.06, 0.7])([definition, 12]));

var points_spoke1 = [[0.02, -0.06, 2.1], [0.7, -0.06, 2.275], [0.7, 0.06, 2.275], [0.02, 0.06, 2.1], [0.02, -0.06, 2.15], [0.7, -0.06, 2.325], [0.7, 0.06, 2.325], [0.02, 0.06, 2.15]];
var cells_spoke1 = [[0,1,2], [2,3,0], [4,5,6], [4,6,7], [4,0,5], [0,5,1], [5,1,2], [2,5,6], [6,2,3], [3,6,7], [7,3,4], [4,3,0]];
var steering_wheel_spoke1 = SIMPLICIAL_COMPLEX( points_spoke1 )( cells_spoke1 );
var steering_wheel_spoke2 = R([0,1])([(2/3.0)*PI])(steering_wheel_spoke1);
var steering_wheel_spoke3 = R([0,1])([(2/3.0)*PI])(steering_wheel_spoke2);

steering_wheel_torus = color_rgb(brown)(steering_wheel_torus);

var steering_wheel = STRUCT([ steering_wheel_auction, steering_wheel_center, steering_wheel_spoke1, steering_wheel_spoke2, steering_wheel_spoke3 ]);
steering_wheel = color_rgb(light_grey)(steering_wheel);
steering_wheel = STRUCT([steering_wheel, steering_wheel_torus]);

steering_wheel = R([0,2])([PI/4])(steering_wheel);
steering_wheel = T([0,1,2])([0.35, 1, 1.6])(steering_wheel);

//Shift
var shift_auction = EXTRUDE([0,0,1.9])( DISK(0.05)([definition,2]) );
shift_auction = color_rgb(light_grey)(shift_auction);

var shift_ball =  T([2])([1.9])(TORUS_SURFACE([0.1, 0.07])([definition, 12]));
shift_ball = color_rgb(brown)(shift_ball);

var shift = STRUCT([ shift_auction, shift_ball ]);
shift = R([0,2])([PI*(5.0/24)])(shift);
shift = T([0,1,2])([0.4, 2, 1.6])(shift);


//reinforcement bars
var bar_left_piece1 = EXTRUDE([0,0,5.8])( DISK(0.1)([definition,2]) );
var bar_left_piece2 = R([1,2])([-PI/2])(EXTRUDE([0,0,0.25])( DISK(0.08)([definition,2]) ))
bar_left_piece2 = T([0,1,2])([0,0.02,1])(bar_left_piece2);
var bar_left_piece3 = T([0,1,2])([0,0,3.8])(bar_left_piece2);
var bar_left = STRUCT([bar_left_piece1, bar_left_piece2, bar_left_piece3]);
bar_left = R([0,2])([PI/2])(bar_left);
bar_left = T([0,1,2])([1.4, -0.25, 1.25])(bar_left);
var bar_right = R([1,2])([PI])(bar_left);
bar_right = T([0,1,2])([0,6,2.5])(bar_right);

var bar_back_piece1 = T([0,1,2])([11.15, -1.3, 0.35])( R([0,1])([[PI/2]])(bar_left) );

var bar_back_piece2_circle1 = bezier_circle_not_centered_map(0.1, "xz", [0,0,0], S0);
var bar_back_piece2_circle2 = bezier_circle_not_centered_map(0.08, "xy", [0,0.3,-1.35], S0);
var bar_back_piece2_profile = BEZIER(S1)( addACoordinate(0, -0.1, [[0, 0], [0.34, 0], [0.34, 0.09], [0.3, -1.35]] )  );
var bar_back_piece2_surface = COONS_PATCH([bar_back_piece2_circle1, bar_back_piece2_circle2, bar_back_piece2_profile, bar_back_piece2_profile]);

bar_back_piece2_surface = MAP(bar_back_piece2_surface)(dom2D);
bar_back_piece2_surface = R([0,2])([PI/2])(bar_back_piece2_surface);
bar_back_piece2_surface = T([0,1,2])([11.4, 5.9, 1.6])(bar_back_piece2_surface);

var bar_back_piece3_surface = R([1,2])([PI])(bar_back_piece2_surface);
bar_back_piece3_surface = T([0,1,2])([0, 6, 3.2])(bar_back_piece3_surface);

var bar_back = STRUCT([bar_back_piece1, bar_back_piece2_surface, bar_back_piece3_surface]);

var bar_front_piece1 = EXTRUDE([0,0,1.1])( DISK(0.1)([definition,2]) );
bar_front_piece1 = R([0,2])([PI/2])(bar_front_piece1);
bar_front_piece1 = T([0,1,2])([-1.65, 1.3, 1.25])(bar_front_piece1);

var bar_front_piece2 = T([1])([3.4])(bar_front_piece1);
var points_bar_front_piece3 = [[-1.45, 0, 1.25], [-2, 0, 1.05], [-2, 0, 1.45], [-1.45, 6, 1.25], [-2, 6, 1.05], [-2, 6, 1.45]];
var cells_bar_front_piece3 = [[0,1,2], [3,4,5], [0,2,3], [2,3,5], [0,1,3], [1,3,4]];
var bar_front_piece3 = SIMPLICIAL_COMPLEX( points_bar_front_piece3 )( cells_bar_front_piece3 );
var bar_front_piece4 = EXTRUDE([0,0,6.1])( DISK(0.2)([definition,2]) );
bar_front_piece4 = R([1,2])([-PI/2])(bar_front_piece4);
bar_front_piece4 = T([0,1,2])([-2.1, -0.05, 1.25])(bar_front_piece4);

var bar_front_piece4_cap1_profile = BEZIER(S0)(addACoordinate(1, 0, [[0, 0.15], [0.11, 0.16], [0.19, 0.11], [0.2, 0]]));
var bar_front_piece4_cap = MAP(ROTATIONAL_SURFACE(bar_front_piece4_cap1_profile))(domRotate);

var bar_front_piece4_cap1 = R([1,2])([PI/2])(bar_front_piece4_cap);
var bar_front_piece4_cap2 = R([1,2])([-PI/2])(bar_front_piece4_cap);

bar_front_piece4_cap1 = T([0,1,2])([-2.1, -0.05, 1.25])(bar_front_piece4_cap1);
bar_front_piece4_cap2 = T([0,1,2])([-2.1, 6.05, 1.25])(bar_front_piece4_cap2);

var bar_front_tube = STRUCT([bar_front_piece4, bar_front_piece4_cap1, bar_front_piece4_cap2]);
bar_front_tube = color_rgb(light_grey)(bar_front_tube);

var bar_front = STRUCT([ bar_front_piece1, bar_front_piece2, bar_front_piece3 ]);
bar_front = color_rgb(red)(bar_front);
bar_front = STRUCT([bar_front, bar_front_tube]);


/////////////////MAPPING///////////////
car_door_curve1 = MAP(car_door_curve1)(dom1D);
car_door_curve2 = MAP(car_door_curve2)(dom1D);
car_door_curve3 = MAP(car_door_curve3)(dom1D);
car_door_curve4 = MAP(car_door_curve4)(dom1D);
car_door_curve5 = MAP(car_door_curve5)(dom1D);


car_door_win_curve1 = MAP(car_door_win_curve1)(dom1D);
car_door_win_curve2 = MAP(car_door_win_curve2)(dom1D);
car_door_win_curve3 = MAP(car_door_win_curve3)(dom1D);
car_door_win_curve4 = MAP(car_door_win_curve4)(dom1D);


bottom_profile1 = MAP(bottom_profile1)(dom1D);
bottom_profile2 = MAP(bottom_profile2)(dom1D);
bottom_profile3 = MAP(bottom_profile3)(dom1D);
bottom_profile4 = MAP(bottom_profile4)(dom1D);
bottom_profile5 = MAP(bottom_profile5)(dom1D);


car_door_surface1 = MAP(car_door_surface1)(dom2D);
car_door_surface2 = MAP(car_door_surface2)(dom2D);
car_door_surface3 = MAP(car_door_surface3)(dom2D);
car_door_surface4 = MAP(car_door_surface4)(dom2D);
car_door_surface5 = MAP(car_door_surface5)(dom2D);


car_lateral_surface1 =  MAP(car_lateral_surface1)(dom2D);
car_lateral_surface2 =  MAP(car_lateral_surface2)(dom2D);
car_lateral_surface3 =  MAP(car_lateral_surface3)(dom2D);
car_lateral_surface4 =  MAP(car_lateral_surface4)(dom2D);
car_lateral_surface5 =  MAP(car_lateral_surface5)(dom2D);
car_lateral_surface6 =  MAP(car_lateral_surface6)(dom2D);
car_lateral_surface7 =  MAP(car_lateral_surface7)(dom2D);


bottom_surface1 = MAP(bottom_surface1)(dom2D);
bottom_surface2 = MAP(bottom_surface2)(dom2D);
bottom_surface3 = MAP(bottom_surface3)(dom2D);
bottom_surface4 = MAP(bottom_surface4)(dom2D);

fender_left = MAP(fender_left)(dom2D);
fender_right = MAP(fender_right)(dom2D);

fender_left = color_rgb(red)(fender_left);
fender_right = color_rgb(red)(fender_right);

wheel_profile1 = MAP(wheel_profile1)(domRotate);
wheel_profile2 = MAP(wheel_profile2)(domRotate);
wheel_profile3 = MAP(wheel_profile3)(domRotate);

wheel_profile1 = color_rgb(light_grey)(wheel_profile1);
wheel_profile2 = color_rgb(light_grey)(wheel_profile2);
wheel_profile3 = color_rgb(light_grey)(wheel_profile3);

tire_profile1 = MAP(tire_profile1)(domRotate);
tire_profile1 = color_rgb(black)(tire_profile1);


coverage_between_wheels_front_surface1 = MAP(coverage_between_wheels_front_surface1)(dom2D);
coverage_between_wheels_front_surface2 = MAP(coverage_between_wheels_front_surface2)(dom2D);
coverage_between_wheels_front_surface3 = MAP(coverage_between_wheels_front_surface3)(dom2D);
coverage_between_wheels_back_surface1 = MAP(coverage_between_wheels_back_surface1)(dom2D);
coverage_between_wheels_back_surface2 = MAP(coverage_between_wheels_back_surface2)(dom2D);
coverage_between_wheels_back_surface3 = MAP(coverage_between_wheels_back_surface3)(dom2D);

seat_surface1 = MAP(seat_surface1)(dom2D);
seat_surface2 = MAP(seat_surface2)(dom2D);
seat_surface3 = MAP(seat_surface3)(dom2D);
seat_surface4 = MAP(seat_surface4)(dom2D);
seat_back_surface1 = MAP(seat_back_surface1)(dom2D);
seat_back_surface2 = MAP(seat_back_surface2)(dom2D);
seat_back_surface3 = MAP(seat_back_surface3)(dom2D);

car_left_glass_piece1 = MAP(car_left_glass_piece1)(dom2D);
car_left_glass_piece2 = MAP(car_left_glass_piece2)(dom2D);
car_left_glass_piece3 = MAP(car_left_glass_piece3)(dom2D);
car_left_glass_piece4 = MAP(car_left_glass_piece4)(dom2D);


///WHEELS MOUNTING...
var semi_wheel1 = STRUCT([wheel_profile1, wheel_profile2, wheel_profile3, tire_profile1]);
semi_wheel1 = T([2])([-0.1])(semi_wheel1);
var semi_wheel2 = R([0,2])([PI])(semi_wheel1);

var wheel1 = STRUCT([semi_wheel1, semi_wheel2]);
wheel1 = R([1,2])([-PI/2])(wheel1);

//WHEELS PLACING
wheel1 = T([0,1,2])([0.12, 0.2, 1.55])(wheel1);
wheel2 = T([0,1,2])([0, 5.6, 0])(wheel1);
wheels_1_2 = STRUCT([wheel1, wheel2]);
wheels_3_4 = T([0,1,2])([8.5, 0, 0])(wheels_1_2);

///////////////////////////////////////

var car_left_profiles = STRUCT([ car_door_curve1, car_door_curve2, car_door_curve3, car_door_curve4, car_door_curve5,
  car_door_win_curve1, car_door_win_curve2, car_door_win_curve3, car_door_win_curve4,
  bottom_profile1, bottom_profile2, bottom_profile3, bottom_profile4, bottom_profile5 ]);

var car_left_surfaces = STRUCT([ car_door_surface1, car_door_surface2, car_door_surface3, car_door_surface4, car_door_surface5,
  car_lateral_surface1, car_lateral_surface2, car_lateral_surface3, car_lateral_surface4, car_lateral_surface5, car_lateral_surface6 , car_lateral_surface7 ]);

car_left_surfaces = color_rgb(red)(car_left_surfaces);

var car_left = STRUCT([ car_left_profiles, car_left_surfaces ]);

var car_right = T([1])([6])(car_left);

var car_bottom = STRUCT([bottom_surface1, bottom_surface2, bottom_surface3, bottom_surface4]);
car_bottom = color_rgb(red)(car_bottom);

var car_front = STRUCT([car_front_plane, fender_left, fender_right]);

var car_wheels = STRUCT([ wheels_1_2, wheels_3_4 ]);

var coverages_between_wheels = STRUCT([ coverage_between_wheels_front_surface1, coverage_between_wheels_front_surface2, coverage_between_wheels_front_surface3, coverage_between_wheels_back_surface1, coverage_between_wheels_back_surface2, coverage_between_wheels_back_surface3 ]);
coverages_between_wheels = color_rgb(red)(coverages_between_wheels);

var seat1 = STRUCT([ seat_surface1, seat_surface2, seat_surface3, seat_surface4, seat_back_surface1, seat_back_surface2, seat_back_surface3 ]);
var seat2 = T([1])([1.95])(seat1);
var seat3 = T([1])([1.95])(seat2);
var seats = STRUCT([seat1, seat2, seat3]);
seats = T([0,1,2])([0, 0.15, 0])(seats);
seats = color_rgb(black)(seats);

var lateral_glass = STRUCT([car_left_glass_piece1, car_left_glass_piece2, car_left_glass_piece3, car_left_glass_piece4]);
lateral_glass = color_rgb(glass_color)(lateral_glass);

var lateral_glass_r = T([1])([6])(lateral_glass);


var reinforcement_bars = STRUCT([bar_left, bar_right, bar_back]);
reinforcement_bars = color_rgb(light_grey)(reinforcement_bars);

reinforcement_bars = STRUCT([reinforcement_bars, bar_front]);

//DRAW
var voitureMinimum = STRUCT([ top_surface1, car_left, car_right, car_bottom, car_front, car_wheels, coverages_between_wheels, seats, steering_wheel, shift, lateral_glass, lateral_glass_r, reinforcement_bars ]);


///////////////////////////////////////////////////////////////////////////////


//////////////////////////////HOUSE///////////////////////////////////////
var lawn = DOMAIN([[0,15], [0,15], [0, 0.3]])([1,1,1]);
lawn = color_rgb(green)(lawn);


var wall1_piece1 = wallWithHole(0.2, [0.2,1], [2.25,1.8], 3.5, 2);
var wall1_piece2 = DOMAIN([[3.5, 4.5], [0,0.2], [1.5,2]])([1,1,1]);
var wall1_piece3 = T([0,1])([8,0.2])(R([0,1])([PI])(wall1_piece1));
var wall1 = STRUCT([wall1_piece1, wall1_piece2, wall1_piece3]);
wall1 = color_rgb(white)(wall1);

var wall2 = wallWithHole(0.2, [0.25,1],[7.75,1.8],8,2);
wall2 = color_rgb(white)(wall2);

var win1_wall2 = windowGen(2.5, 0.8);
win1_wall2 = T([0,1,2])([0.25, 0.05, 1])(win1_wall2);
var win2_wall2 = T([0])([2.5])(win1_wall2);
var win3_wall2 = T([0])([2.5])(win2_wall2);

wall2 = STRUCT([wall2, win1_wall2, win2_wall2, win3_wall2]);

var wall3 = T([1])([7.8])(wall2);
var wall4 = R([0,1])([PI/2])(wall2);
wall4 = T([0])([0.2])(wall4);
var wall2 = T([0])([7.8])(wall4);

var roof = DOMAIN([[0,8], [0,8], [2,2.2]])([1,1,1]);
roof = color_rgb(white)(roof);

var win1_wall1 = windowGen(2.05, 0.8);
win1_wall1 = T([0,1,2])([0.2,0.05,1])(win1_wall1);
var win2_wall1 = T([0])([5.55])(win1_wall1);

wall1 = STRUCT([wall1, win1_wall1, win2_wall1]);

var walls_and_roof = STRUCT([wall1, wall2, wall3, wall4, roof]);

var floor = DOMAIN([[0,8], [0,8], [0.001,0.002]])([1,1,1]);
floor = color_rgb(black)(floor);

var door = DOMAIN([[0,0.2], [-1, 0], [0, 1.5]])([1,1,1]);
door = T([0,1,2])([3.4, 0, 0])(door);
door = color_rgb(brown)(door);

var house = STRUCT([walls_and_roof, floor, door]);


//Garage
var garage_wall1 = DOMAIN([[0.2,3.2], [0,0.2], [1.5, 1.7]])([1,1,1]);
var garage_wall4 = DOMAIN([[0,0.2], [0, 5], [0,1.7]])([1,1,1]);
var garage_wall2 = T([0])([3])(garage_wall4);
var garage_wall3 = T([1])([4.8])(DOMAIN([[0,3.2], [0,0.2], [0,1.7]])([1,1,1]));

var garage_floor = DOMAIN([[0,3.2], [0,5], [0.001,0.002]])([1,1,1]);
garage_floor = color_rgb(black)(garage_floor);

var garage_roof = DOMAIN([[0,3.2], [0,5], [0,0.2]])([1,1,1]);
garage_roof = T([2])([1.7])(garage_roof);

var garage = STRUCT([garage_wall1, garage_wall2, garage_wall3, garage_wall4, garage_roof]);
garage = color_rgb(white)(garage);

var garage_door = DOMAIN([[0.2, 3], [0,1.5], [0, 0.1]])([1,1,1]);
garage_door = R([1,2])([-PI*(5/6)])(garage_door);
garage_door = T([0,1,2])([0, 0.9, 1.9])(garage_door);

garage = STRUCT([garage, garage_floor, garage_door]);
garage = T([0])([8.5])(garage);


///////////////////ALL IN THE HOUSE////////////////

voitureMinimum = S([0,1,2])([0.2,0.2,0.2])(voitureMinimum);
voitureMinimum = R([0,1])([PI/3])(voitureMinimum);
voitureMinimum = T([0,1,2])([11.4, 2, 0.2])(voitureMinimum);

lc7_1 = S([0,1,2])([0.15,0.15,0.15])(lc7);
lc7_1 = R([0,1])([-PI/2])(lc7_1);
lc7_1 = T([0,1,2])([2.15, 6, 0.315])(lc7_1);

lc7_2 = S([0,1,2])([0.15,0.15,0.15])(lc7);
lc7_2 = T([0,1,2])([5.6, 9.75, 0.315])(lc7_2);

lc11_1 = S([0,1,2])([0.32, 0.32, 0.32])(lc11);
lc11_1 = T([0,1,2])([5, 10.5, 0.3])(lc11_1);

lc17_1 = S([0,1,2])([0.25,0.25,0.25])(lc17);
lc17_1 = T([0,1,2])([4, 4.7, 1])(lc17_1);

///////////////DRAW
var model = STRUCT([house, garage]);
model = T([0,1,2])([1.5,4.5,0.3])(model);
model = STRUCT([model, lawn, voitureMinimum, lc7_1, lc7_2, lc11_1, lc17_1]);
DRAW(model);
