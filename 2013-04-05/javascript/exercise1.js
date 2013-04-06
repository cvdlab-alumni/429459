//### CONVERT T ####
T = function(dims){
	dims = dims.map(function(dim){
	return dim-1;
});
	return function(value){
		return function(object){
			return object.clone().translate(dims,value);
		}
	}
}


//#### support variables ####
//#pillars variables
var h_pillar0 = 2.5
var r_pillar0 = 0.125
var dist_pillars0_x = 2.75
var dist_pillars0_y = 5.32
var side_square_pillar_0 = r_pillar0*2
var distance_b_square_pillars_0 = 2.79
var distance_l_square_pillars_0 = 1.067
var distance_square_pillars_y_0 = 5.32
var distance_from_circle_pillars_0 = 1.433

var side_square_little_pillar_1 = 0.2
//#floors
var height_floor_1 = 0.3905

//#### support functions and variables ####

//#CIRCLE#
function circle(r){
	var domain = DOMAIN([[0,2*PI]])([36]);
	var circ = function (r) {
		return function (v) {
			return [r*COS(v[0]), r*SIN(v[0])];
	  		};
		};
	var mapping = circ(r);
	return (MAP(mapping)(domain));
}


//#extrude#
function extrude(obj, dim){
	return EXTRUDE([dim])(obj)
}
//#### pillars of the first floor ####

//# circle pillars
var base_circle_pillar_0 = circle(r_pillar0)
var circle_pillar_0 = extrude(base_circle_pillar_0, h_pillar0)

var circle_pillar_T_0 = T([1,2])([r_pillar0, r_pillar0])(circle_pillar_0)
var circle_pillars_orig = STRUCT( REPLICA(5)([circle_pillar_T_0,T([1])([dist_pillars0_x])] ) )

var circle_pillar_T_Y_0 = T([2])([dist_pillars0_y])(circle_pillar_T_0)

var circle_pillars_0 = STRUCT([circle_pillars_orig, circle_pillar_T_Y_0])

//# square pillars
var square_pillar_0 = CUBOID([side_square_pillar_0,side_square_pillar_0,h_pillar0])
var pillars_r_0 = STRUCT( REPLICA(3)([square_pillar_0, T([1])([distance_b_square_pillars_0]) ]) )


var square_pillars_orig_0 = STRUCT([square_pillar_0, T([1])([distance_l_square_pillars_0+0.25])(pillars_r_0)])
var square_pillars_0 = T([1,2])([distance_from_circle_pillars_0, distance_square_pillars_y_0])(square_pillars_orig_0)

//# pillars
var pillars0 = STRUCT([circle_pillars_0, square_pillars_0])


//#### pillars of the first floor ####

var square_pillars_1_part = STRUCT( REPLICA(5)([square_pillar_0,T([1])([dist_pillars0_x])] ) )
var square_pillars_1_T = T([3])([h_pillar0+height_floor_1])(square_pillars_1_part)

var square_pillar_1_T_Y = T([2,3])([dist_pillars0_y,h_pillar0+height_floor_1])(square_pillar_0)
var square_pillars_1 = STRUCT([square_pillars_1_T, square_pillar_1_T_Y])

var pillars_3_top_square_1 = STRUCT(REPLICA(3)([ square_pillar_0, T([1])([dist_pillars0_x]) ] ))
var pillars_top_Y_1_part = STRUCT([pillars_3_top_square_1, T([1])([3*dist_pillars0_x])(circle_pillar_T_0), T([1])([4*dist_pillars0_x])(square_pillar_0)])
var square_pillar_little_1 = CUBOID([side_square_little_pillar_1,side_square_little_pillar_1,h_pillar0])
var square_pillar_little_1_T = T([1])([1.46])(square_pillar_little_1)

var pillars_top_Y_1_orig = STRUCT([pillars_top_Y_1_part, square_pillar_little_1_T])
var pillars_top_Y_1 = T([2,3])([distance_square_pillars_y_0, height_floor_1+h_pillar0])(pillars_top_Y_1_orig)

var pillars1 = STRUCT([square_pillars_1, pillars_top_Y_1])
//DRAW(pillars_3_top_square_1)

//#### pillars of the second floor ####

var pillars_top_2 = T([2,3])([distance_square_pillars_y_0, height_floor_1+h_pillar0])(square_pillars_1_T)
var pillars_down_2_orig = STRUCT([square_pillar_0, T([1])([dist_pillars0_x])(square_pillar_0), T([1])([4*dist_pillars0_x])(square_pillar_0)])
var pillars_down_2 = T([3])([(height_floor_1+h_pillar0)*2])(pillars_down_2_orig)

var pillars2 = STRUCT([pillars_top_2, pillars_down_2])

//#### pillars of the third floor ####

var little_pillars_3 = STRUCT([ T([2])([0.06])(square_pillar_little_1), T([1,2])([dist_pillars0_x,0.06])(square_pillar_little_1)])
var big_pillars_3_orig = STRUCT(   REPLICA(3)([square_pillar_0, T([1])([dist_pillars0_x]) ] )   )
var big_pillars_3 = T([1])([2*dist_pillars0_x])(big_pillars_3_orig)

var pillars_top_3_orig = STRUCT([little_pillars_3, big_pillars_3])
var pillars_top_3 = T([2,3])([distance_square_pillars_y_0, (height_floor_1+h_pillar0)*3])(pillars_top_3_orig)

var pillars_down_3_orig = STRUCT([ T([1])([2*dist_pillars0_x])(square_pillar_0), T([1])([4*dist_pillars0_x])(square_pillar_0) ])
var pillars_down_3 = T([3])([3*(height_floor_1+h_pillar0)])(pillars_down_3_orig)

var pillar_single_top_right_3 = T([1,2,3])([4*dist_pillars0_x,distance_square_pillars_y_0+side_square_pillar_0+1.18575,3*(height_floor_1+h_pillar0)])(square_pillar_0)

//##element between floors##
var pillars12_delta = CUBOID([side_square_pillar_0,side_square_pillar_0,height_floor_1])

var pillars12_delta_down = T([3])([2*h_pillar0 + height_floor_1])(STRUCT([pillars12_delta, T([1])([dist_pillars0_x]), pillars12_delta]))
var pillars12_delta_top = T([3])([2*h_pillar0 + height_floor_1])(T([2])([dist_pillars0_y])( STRUCT([pillars12_delta, T([1])([dist_pillars0_x]), pillars12_delta])  ))

var pillars3 = STRUCT([pillars_top_3, pillars_down_3, pillar_single_top_right_3, pillars12_delta_top, pillars12_delta_down])
//#####PARTIAL#####
var build_part = STRUCT([pillars0,pillars1,pillars2,pillars3])

//#####DRAW#####
//#DRAW(circle_pillars)
//#DRAW(pillars)
DRAW(build_part)
//#DRAW(pillars_top_3_orig)
//DRAW(pillars1)
//#DRAW(square_pillars_1_T)
