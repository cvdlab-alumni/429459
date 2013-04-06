from pyplasm import *
#### support variables ####
#pillars variables
h_pillar0 = 2.5
r_pillar0 = 0.125
dist_pillars0_x = 2.75
dist_pillars0_y = 5.32
side_square_pillar_0 = r_pillar0*2
distance_b_square_pillars_0 = 2.79
distance_l_square_pillars_0 = 1.067
distance_square_pillars_y_0 = 5.32
distance_from_circle_pillars_0 = 1.433

side_square_little_pillar_1 = 0.2
#floors
height_floor_1 = 0.3905

#### support functions and variables ####

#CIRCLE#
def circle(r):
	def ball(p):
		a,r = p
		return [r*COS(a), r*SIN(a)]
	dom2D = PROD([INTERVALS(2*PI)(50), INTERVALS(1)(1)])
	return S([1,2])([r,r])(MAP(ball)(dom2D))

def ball(p):
	a,r = p
	return [r*COS(a), r*SIN(a)]

#extrude#
def extrude(obj, dim):
	return PROD([obj, Q(dim)])

#### pillars of the first floor ####

# circle pillars
base_circle_pillar_0 = circle(r_pillar0)
circle_pillar_0 = extrude(base_circle_pillar_0, h_pillar0)

circle_pillar_T_0 = T([1,2])([r_pillar0, r_pillar0])(circle_pillar_0)
circle_pillars_orig = STRUCT( NN(5)([circle_pillar_T_0,T([1])([dist_pillars0_x])] ) )

circle_pillar_T_Y_0 = T([2])([dist_pillars0_y])(circle_pillar_T_0)

circle_pillars_0 = STRUCT([circle_pillars_orig, circle_pillar_T_Y_0])

# square pillars
square_pillar_0 = CUBOID([side_square_pillar_0,side_square_pillar_0,h_pillar0])
pillars_r_0 = STRUCT( NN(3)([square_pillar_0, T([1])([distance_b_square_pillars_0]) ]) )


square_pillars_orig_0 = STRUCT([square_pillar_0, T([1])([distance_l_square_pillars_0+0.25])(pillars_r_0)])
square_pillars_0 = T([1,2])([distance_from_circle_pillars_0, distance_square_pillars_y_0])(square_pillars_orig_0)

# pillars
pillars0 = STRUCT([circle_pillars_0, square_pillars_0])


#### pillars of the first floor ####

square_pillars_1_part = STRUCT( NN(5)([square_pillar_0,T([1])([dist_pillars0_x])] ) )
square_pillars_1_T = T([3])([h_pillar0+height_floor_1])(square_pillars_1_part)

square_pillar_1_T_Y = T([2,3])([dist_pillars0_y,h_pillar0+height_floor_1])(square_pillar_0)
square_pillars_1 = STRUCT([square_pillars_1_T, square_pillar_1_T_Y])

pillars_3_top_square_1 = STRUCT(NN(3)([ square_pillar_0, T([1])([dist_pillars0_x]) ] ))
pillars_top_Y_1_part = STRUCT([pillars_3_top_square_1, T([1])([3*dist_pillars0_x])(circle_pillar_T_0), T([1])([4*dist_pillars0_x])(square_pillar_0)])
square_pillar_little_1 = CUBOID([side_square_little_pillar_1,side_square_little_pillar_1,h_pillar0])
square_pillar_little_1_T = T([1])([1.46])(square_pillar_little_1)

pillars_top_Y_1_orig = STRUCT([pillars_top_Y_1_part, square_pillar_little_1_T])
pillars_top_Y_1 = T([2,3])([distance_square_pillars_y_0, height_floor_1+h_pillar0])(pillars_top_Y_1_orig)

pillars1 = STRUCT([square_pillars_1, pillars_top_Y_1])


#### pillars of the second floor ####

pillars_top_2 = T([2,3])([distance_square_pillars_y_0, height_floor_1+h_pillar0])(square_pillars_1_T)
pillars_down_2_orig = STRUCT([square_pillar_0, T([1])([dist_pillars0_x])(square_pillar_0), T([1])([4*dist_pillars0_x])(square_pillar_0)])
pillars_down_2 = T([3])([(height_floor_1+h_pillar0)*2])(pillars_down_2_orig)

pillars2 = STRUCT([pillars_top_2, pillars_down_2])

#### pillars of the third floor ####

little_pillars_3 = STRUCT([ T([2])([0.06])(square_pillar_little_1), T([1,2])([dist_pillars0_x,0.06])(square_pillar_little_1)])
big_pillars_3_orig = STRUCT(   NN(3)([square_pillar_0, T([1])([dist_pillars0_x]) ] )   )
big_pillars_3 = T([1])([2*dist_pillars0_x])(big_pillars_3_orig)

pillars_top_3_orig = STRUCT([little_pillars_3, big_pillars_3])
pillars_top_3 = T([2,3])([distance_square_pillars_y_0, (height_floor_1+h_pillar0)*3])(pillars_top_3_orig)

pillars_down_3_orig = STRUCT([ T([1])([2*dist_pillars0_x])(square_pillar_0), T([1])([4*dist_pillars0_x])(square_pillar_0) ])
pillars_down_3 = T([3])([3*(height_floor_1+h_pillar0)])(pillars_down_3_orig)

pillar_single_top_right_3 = T([1,2,3])([4*dist_pillars0_x,distance_square_pillars_y_0+side_square_pillar_0+1.18575,3*(height_floor_1+h_pillar0)])(square_pillar_0)

##element between floors##
pillars12_delta = CUBOID([side_square_pillar_0,side_square_pillar_0,height_floor_1])

pillars12_delta_down = T([3])([2*h_pillar0 + height_floor_1])(STRUCT([pillars12_delta, T([1])([dist_pillars0_x]), pillars12_delta]))
pillars12_delta_top = T([3])([2*h_pillar0 + height_floor_1])(T([2])([dist_pillars0_y])( STRUCT([pillars12_delta, T([1])([dist_pillars0_x]), pillars12_delta])  )) 

pillars3 = STRUCT([pillars_top_3, pillars_down_3, pillar_single_top_right_3, pillars12_delta_top, pillars12_delta_down])
#####PARTIAL#####
build_part = STRUCT([pillars0,pillars1,pillars2,pillars3])

#####VIEW#####
#VIEW(circle_pillars)
#VIEW(pillars)
VIEW(build_part)
#VIEW(pillars_top_3_orig)
#VIEW(pillars1)
#VIEW(square_pillars_1_T)
