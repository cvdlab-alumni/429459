//### CONVERT T ####
T = function(dims){
	dims = dims.map(function(dim){
	return dim -1;
});
	return function(value){
		return function(object){
			return object.clone().translate(dims,value);
		}
	}
}


//### CONVERT S ###
S = function(dims){
/*devo aggiungere una mappatura*/
	dims = dims.map(function(dim){
	return dim -1;
	});
	return function(value){
		return function(object){
			return object.clone().scale(dims,value);
		}
	}
}

//### CONVERT R ###
R = function(dims){
/*devo aggiungere una mappatura*/
	dims = dims.map(function(dim){
	return dim -1;
	});

	return function(angle){
		return function(object){
			return object.clone().rotate(dims,angle);
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



//EXERCISE 2
function semicircle(r){
  return DISK(r)([30,5]);
}
function rotate(coord,values,obj){
	return R(coord)(values)(obj)
}

var base_x = 11.25
var base_y = 6.7557
var base_z = 0.5

var floor_z = 0.39
var floor0_r1_x = 1.457
var floor0_r1_y = 1.46

var floor0_r2_x = 6.74
var floor0_r2_y = 4.42
var floor0_r2_trasl_x = floor0_r1_x
var floor0_r2_trasl_y = 2.328

var floor0_r3_x = 1.134
var floor0_r3_y = 2.67
var floor0_r3_trasl_x = floor0_r1_x+floor0_r2_x
var floor0_r3_trasl_y = 4.1

var r_floor0_semcirc_1 = 1.35
var r_floor0_semcirc_1_trasl_x = floor0_r1_x+floor0_r2_x+floor0_r3_x
var r_floor0_semcirc_1_trasl_y = floor0_r3_trasl_y
var r_floor0_semcirc_2 = 0.54
var r_floor0_semcirc_2_trasl_x = floor0_r2_trasl_x
var r_floor0_semcirc_2_trasl_y = 1.2
var floor0_r4_x = 2*r_floor0_semcirc_2
var floor0_r4_y = floor0_r2_trasl_x - r_floor0_semcirc_2_trasl_x + r_floor0_semcirc_2 + 0.5
var floor0_r4_trasl_x = r_floor0_semcirc_2_trasl_x
var floor0_r4_trasl_y = r_floor0_semcirc_2_trasl_y + r_floor0_semcirc_2
//#Draw floor0
var model_base = CUBOID([base_x,base_y,base_z])
var floor0_r1 = T([2])([dist_pillars0_y])(CUBOID([floor0_r1_x,floor0_r1_y,floor_z]))
var floor0_r2 = T([1,2])([floor0_r2_trasl_x,floor0_r2_trasl_y])(CUBOID([floor0_r2_x,floor0_r2_y,floor_z]))
var floor0_r3 = T([1,2])([floor0_r3_trasl_x,floor0_r3_trasl_y])(CUBOID([floor0_r3_x,floor0_r3_y,floor_z]))
var semcirc_1_2D = semicircle(r_floor0_semcirc_1)
var semcirc_1 = T([2])([r_floor0_semcirc_1])(rotate([1,2],-PI/2,extrude(semcirc_1_2D,floor_z)))
var floor0_semicirc1 = T([1,2])([r_floor0_semcirc_1_trasl_x,r_floor0_semcirc_1_trasl_y])(semcirc_1)
var floor0_r4 = T([1,2])([floor0_r4_trasl_x,floor0_r4_trasl_y])(CUBOID([floor0_r4_x,floor0_r4_y,floor_z]))

var semcirc_2_2D = semicircle(r_floor0_semcirc_2)
var semcirc_2_centered = R([1,2])(PI)(extrude(semcirc_2_2D,floor_z))
var semcirc_2 = T([1,2])([r_floor0_semcirc_2,r_floor0_semcirc_2])(semcirc_2_centered)
var floor0_semicirc2 = T([1,2])([r_floor0_semcirc_2_trasl_x,r_floor0_semcirc_2_trasl_y])(semcirc_2)
var floor0 = STRUCT([floor0_r1,floor0_r2,floor0_r3,floor0_semicirc1,floor0_semicirc2,floor0_r4])
var building = STRUCT([model_base, T([3])([base_z]), floor0, building])
//#VIEW(floor0)
//#VIEW(building)

//#floor1
var floor1_z = h_pillar0

var floor1_r1_x = 1.2
var floor1_r1_y = 1.3
var floor1_r1_trasl_y = 5.32 

var floor1_r2_x = 11.16
var floor1_r2_y = floor1_r1_trasl_y+side_square_little_pillar_1

var floor1_r3_x = 5.16
var floor1_r3_y = 1.27
var floor1_r3_trasl_x = 5.99
var floor1_r3_trasl_y = floor1_r1_trasl_y

var floor1_balcony_x = 1.135
var floor1_balcony_y = 1.067
var floor1_balcony_trasl_y = floor1_r1_trasl_y

var floor1_r1 = T([2])([floor1_r1_trasl_y])(CUBOID([floor1_r1_x,floor1_r1_y,floor_z]))
var floor1_r2 = CUBOID([floor1_r2_x,floor1_r2_y,floor_z])
var floor1_r3 = T([1,2])([floor1_r3_trasl_x,floor1_r3_trasl_y])(CUBOID([floor1_r3_x,floor1_r3_y,floor_z]))
var floor1_balcony = T([1,2])([-floor1_balcony_x,floor1_balcony_trasl_y])(CUBOID([floor1_balcony_x,floor1_balcony_y,floor_z]))


var floor1 = T([3])([floor1_z])(STRUCT([floor1_r1,floor1_r2,floor1_r3, floor1_balcony]))

building = STRUCT([building, floor1])


//#Draw floor2
var floor2_z = 2*h_pillar0+height_floor_1

var trapezium = extrude(SIMPLICIAL_COMPLEX([[5.47,0],[11.25,0],[11.25,6.75],[4.51,6.75],[4.51,5.32]])([[0,2,4],[3,4,1],[3,2,4],[0,1,2]]),floor_z);

var floor2_r_x = 0.816901408
var floor2_r_y = 6.687

var floor2_r = CUBOID([floor2_r_x,floor2_r_y,floor_z])
var floor2 = T([3])([floor2_z])(STRUCT([trapezium,floor2_r]))
//#
var building = STRUCT([building, floor2])




//#floor3
var floor3_z = 3*h_pillar0+2*height_floor_1

var floor3_r1_x = 11.16
var floor3_r1_y = 0.152
var floor3_r1_trasl_y = 6.52

var floor3_r2_y = 0.25
var floor3_r2_trasl_x = 5.456
var floor3_r2_x = floor3_r1_x - floor3_r2_trasl_x
var floor3_r2_trasl_y = 6.39

var floor3_r3_x = 0.244
var floor3_r3_y = 6.412
var floor3_r3_trasl_x =  floor3_r2_trasl_x

var floor3_r4_x = 5.47
var floor3_r4_y = 5.46
var floor3_r4_trasl_x = floor3_r3_trasl_x + floor3_r3_x

var floor3_r5_x = 2.418
var floor3_r5_y = 0.934
var floor3_r5_trasl_x = floor3_r3_trasl_x + 3.29
var floor3_r5_trasl_y = floor3_r4_y

var floor3_r1 = T([2])([floor3_r1_trasl_y])(CUBOID([floor3_r1_x,floor3_r1_y,floor_z]))
var floor3_r2 = T([1,2])([floor3_r2_trasl_x,floor3_r2_trasl_y])(CUBOID([floor3_r2_x,floor3_r2_y,floor_z]))
var floor3_r3 = T([1])([floor3_r3_trasl_x])(CUBOID([floor3_r3_x,floor3_r3_y,floor_z]))
var floor3_r4 = T([1])([floor3_r4_trasl_x])(CUBOID([floor3_r4_x,floor3_r4_y,floor_z]))
var floor3_r5 = T([1,2])([floor3_r5_trasl_x,floor3_r5_trasl_y])(CUBOID([floor3_r5_x,floor3_r5_y,floor_z]))
var floor3_part = CUBOID([floor3_r3_trasl_x, floor3_r3_y+0.2, height_floor_1])
var floor3 = T([3])([floor3_z])(STRUCT([floor3_r1,floor3_r2,floor3_r3,floor3_r4,floor3_r5, floor3_part]))
var floor4_trasl_z = 4*h_pillar0+3*height_floor_1

var floor4_r1_x = 5.44
var floor4_r1_y = 1.32
var floor4_r1_trasl_y = 5.31

var floor4_r2_x = 5.8
var floor4_r2_y = 6.657
var floor4_r2_trasl_x = floor4_r1_x

var floor4_r1 = T([2])([floor4_r1_trasl_y])(CUBOID([floor4_r1_x,floor4_r1_y,floor_z]))

var floor4_r2 = T([1])([floor4_r2_trasl_x])(CUBOID([floor4_r2_x,floor4_r2_y,floor_z]))

var floor4 = STRUCT([floor4_r1, floor4_r2])

var floor4 = T([3])([floor4_trasl_z])(floor4)

building = STRUCT([building, floor3, floor4])
//#
DRAW(building)



//EXERCISE 3
//#####support variables######
var depth_walls = 0.25
//#north_windows
var h_windows_n = 0.9564
var w_windows_n_part = 1.26
var w_windows_n = w_windows_n_part*4

var h_total_north_face = 8.06

var h_little_windows_n_part = 1.055
var h_little_windows_n = 2*h_little_windows_n_part
var w_little_windows_n = 0.3

var dist_btw_lwins = 0.3
var dist_btw_lwin_top_boarder = 0.83
var dist_btw_lboarder_win = 0.25
var dist_btw_top_boarder_top_win = 1.0798
var dist_btw_fst_snd_windows = 1.411
var dist_btw_snd_trd_windows = 1.35
var dist_btw_win_lwin = 0.9
var dist_btw_lwin_lboarder = 0.25
//###building north face###
var n_1_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])
//#
var n_2_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_top_boarder_top_win])
var n_3_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_fst_snd_windows])
var n_4_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_snd_trd_windows])
var n_5_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_snd_trd_windows])
//#
var n_6_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])
//#
var n_7_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
var n_8_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
var n_9_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
var n_10_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
//#
var n_11_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])

//#Traslation of fragments#
var n_2_fragment = T([1,3])([dist_btw_lboarder_win,2*dist_btw_snd_trd_windows+3*h_windows_n+dist_btw_fst_snd_windows])(n_2_fragment)
var n_3_fragment = T([1,3])([dist_btw_lboarder_win,2*dist_btw_snd_trd_windows+2*h_windows_n])(n_3_fragment)
var n_4_fragment = T([1,3])([dist_btw_lboarder_win,dist_btw_snd_trd_windows+h_windows_n])(n_4_fragment)
var n_5_fragment = T([1])([dist_btw_lboarder_win])(n_5_fragment)
var n_6_fragment = T([1])([dist_btw_lboarder_win+w_windows_n])(n_6_fragment)
var n_7_fragment = T([1,3])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,3*h_little_windows_n+3*dist_btw_lwins])(n_7_fragment)
var n_8_fragment = T([1,3])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,2*h_little_windows_n+2*dist_btw_lwins])(n_8_fragment)
var n_9_fragment = T([1,3])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,h_little_windows_n+dist_btw_lwins])(n_9_fragment)
var n_10_fragment = T([1])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin])(n_10_fragment)
var n_11_fragment = T([1])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin+w_little_windows_n])(n_11_fragment)
//#n_face
var north_face = STRUCT([n_1_fragment,n_2_fragment,n_3_fragment,n_4_fragment,n_5_fragment,n_6_fragment,n_7_fragment,n_8_fragment,n_9_fragment,n_10_fragment,n_11_fragment])
//#z_translation
var north = T([3])([h_pillar0])(north_face)
var north = S([3])([1.2])(north)
var north = S([1])([0.91])(north)
var north = R([1,2])(PI/2)(north)
var north = T([1])([11.25])(north)

//##########east face###############
var wall_depth = 0.25

var east_face_z = h_pillar0
var east_face_y = depth_walls

var east_face_r1_x = 5.8
var east_face_r1_z = 6.593
 
var east_face_r2_x = 2.7
var east_face_r2_z = 8.889
var east_face_r2_traslate_x = east_face_r1_x + 2.7

var east_face_r3_x = 2.7
var east_face_r3_z = 1.48
var east_face_r3_traslate_x = east_face_r1_x
var east_face_r3_traslate_z = 1.05

var east_face_r4_x = 6.12
var east_face_r4_z = 1.044
var east_face_r4_traslate_z = 7.84

var east_face_r5_x = 1.12
var east_face_r5_z = 1.266
var east_face_r5_traslate_z = east_face_r1_z

var east_face_r6_x = east_face_r1_x+east_face_r2_x+east_face_r3_x
var east_face_r6_z = 1.3
var east_face_r6_traslate_z = 8.86


var east_face_r1 = CUBOID([east_face_r1_x,east_face_y,east_face_r1_z])
var east_face_r2 = T([1])([east_face_r2_traslate_x])(CUBOID([east_face_r2_x,east_face_y,east_face_r2_z]))
var east_face_r3_part1 = T([1])([east_face_r3_traslate_x])(CUBOID([east_face_r3_x,east_face_y,east_face_r3_z]))

var east_face_r3_part2 = STRUCT(REPLICA(3)([east_face_r3_part1, T([3])([east_face_r3_z+east_face_r3_traslate_z]) ]))
var east_face_r3 = STRUCT([east_face_r3_part1, T([3])([east_face_r3_z+east_face_r3_traslate_z]), east_face_r3_part2])

var east_face_r4 = T([3])([east_face_r4_traslate_z])(CUBOID([east_face_r4_x,east_face_y,east_face_r4_z]))

var east_face_r5 = T([3])([east_face_r5_traslate_z])(CUBOID([east_face_r5_x,east_face_y,east_face_r5_z]))

var east_face_r6 = T([3])([east_face_r6_traslate_z])(CUBOID([east_face_r6_x,east_face_y,east_face_r6_z]))


var east = T([3])([east_face_z])(STRUCT([east_face_r1,east_face_r2,east_face_r3,east_face_r4,east_face_r5,east_face_r6 ]))

//###### west faces #####

//#### FACE WEST ####

//#muro piano terra
var muro_princ = CUBOID([7.16,0.25,2.5])
var muro_princ_trasl = T([2])([6.50])(muro_princ)

var muro_basso_finestra = CUBOID([0.84,0.25,1.66])
var mbf_trasl = T([1,2])([7.16,6.50])(muro_basso_finestra)

var muro_lato_fin = CUBOID([0.5,0.25,2.5])
var mlf_trasl = T([1,2])([8,6.50])(muro_lato_fin)

//#muro primo piano

var muro_des = CUBOID([5.12,0.25,2.5])
var muro_des_trasl= T([2,3])([6.50,2.5+0.39])(muro_des)

var muro_s_fin = CUBOID([1.23*2,0.25,1.27])
var msf_trasl = T([1,2,3])([5.12,6.50,2.5+0.39])(muro_s_fin)

var muro_sin = CUBOID([3.67,0.25,2.5])
var ms_trasl = T([1,2,3])([7.58,6.50,2.5+0.39])(muro_sin)

//#muro secondo piano
var muro_des_2 = CUBOID([8.91,0.25,2.5])
var md2_trasl = T([2,3])([6.50,(2.5+0.39)*2])(muro_des_2)

//#muro terzo piano
var muro_t = CUBOID([11.25,0.25,2.5])
var mt_trasl = T([2,3])([6.50,(2.5+0.39)*3])(muro_t)

var muro_basso_fin2 = CUBOID([0.26,0.25,1.26])
var mbf2_trasl = T([1,2,3])([8.91,6.50,(2.5+0.39)*2])(muro_basso_fin2)

var muro_tra_fin = CUBOID([0.25,0.25,2.5])
var mtf_trasl = T([1,2,3])([9.17,6.50,(2.5+0.39)*2])(muro_tra_fin)

//#muro sotto seconda finestra
var mssf_trasl = T([1,2,3])([9.42,6.50,(2.5+0.39)*2])(muro_basso_fin2)

var muro_sin_fin = CUBOID([1.57,0.25,2.5])
var msin_fin_trasl = T([1,2,3])([9.67,6.50,(2.5+0.39)*2])(muro_sin_fin)

var west = STRUCT([muro_princ_trasl,mbf_trasl, mlf_trasl, muro_des_trasl,msf_trasl,ms_trasl,md2_trasl,mbf2_trasl,mtf_trasl,mssf_trasl,msin_fin_trasl,mt_trasl])

var west = T([2,3])([-0.08, 0.5])(west)

//### VIEW ###
var building = STRUCT([building, north, east, west])
//#VIEW(building)
DRAW(building)

