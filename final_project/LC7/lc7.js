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

DRAW(lc7);

// DRAW(R([0,1])([PI])(grid2Ddetailed(10,1,2)));
// DRAW(grid3DLightDetailed(10));

