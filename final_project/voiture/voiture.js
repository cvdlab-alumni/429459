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
var glass_color = [100, 149, 237, 0.5];
var directional_lights_color = [255, 168, 0, 0.5];
var light_color = [482,468,24, 0.7];

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
DRAW(voitureMinimum);

