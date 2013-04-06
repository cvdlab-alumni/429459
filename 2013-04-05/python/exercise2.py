from exercise1 import *
#
def semicircle(r):
	def ball(p):
		a,r = p
		return [r*COS(a), r*SIN(a)]
	dom2D = PROD([INTERVALS(PI)(50), INTERVALS(1)(1)])
	return S([1,2])([r,r])(MAP(ball)(dom2D))

def rotate(coord,values,obj):
	return R(coord)(values)(obj)

base_x = 11.25
base_y = 6.7557
base_z = 0.5

floor_z = 0.39
floor0_r1_x = 1.457
floor0_r1_y = 1.46

floor0_r2_x = 6.74
floor0_r2_y = 4.42
floor0_r2_trasl_x = floor0_r1_x
floor0_r2_trasl_y = 2.328

floor0_r3_x = 1.134
floor0_r3_y = 2.67
floor0_r3_trasl_x = floor0_r1_x+floor0_r2_x
floor0_r3_trasl_y = 4.1

r_floor0_semcirc_1 = 1.35
r_floor0_semcirc_1_trasl_x = floor0_r1_x+floor0_r2_x+floor0_r3_x
r_floor0_semcirc_1_trasl_y = floor0_r3_trasl_y
r_floor0_semcirc_2 = 0.54
r_floor0_semcirc_2_trasl_x = floor0_r2_trasl_x
r_floor0_semcirc_2_trasl_y = 1.2
floor0_r4_x = 2*r_floor0_semcirc_2
floor0_r4_y = floor0_r2_trasl_x - r_floor0_semcirc_2_trasl_x + r_floor0_semcirc_2 + 0.5
floor0_r4_trasl_x = r_floor0_semcirc_2_trasl_x
floor0_r4_trasl_y = r_floor0_semcirc_2_trasl_y + r_floor0_semcirc_2
#Draw floor0
model_base = CUBOID([base_x,base_y,base_z])
floor0_r1 = T([2])([dist_pillars0_y])(CUBOID([floor0_r1_x,floor0_r1_y,floor_z]))
floor0_r2 = T([1,2])([floor0_r2_trasl_x,floor0_r2_trasl_y])(CUBOID([floor0_r2_x,floor0_r2_y,floor_z]))
floor0_r3 = T([1,2])([floor0_r3_trasl_x,floor0_r3_trasl_y])(CUBOID([floor0_r3_x,floor0_r3_y,floor_z]))
semcirc_1_2D = semicircle(r_floor0_semcirc_1)
semcirc_1 = T([2])([r_floor0_semcirc_1])(rotate([1,2],-PI/2,extrude(semcirc_1_2D,floor_z)))
floor0_semicirc1 = T([1,2])([r_floor0_semcirc_1_trasl_x,r_floor0_semcirc_1_trasl_y])(semcirc_1)
floor0_r4 = T([1,2])([floor0_r4_trasl_x,floor0_r4_trasl_y])(CUBOID([floor0_r4_x,floor0_r4_y,floor_z]))

semcirc_2_2D = semicircle(r_floor0_semcirc_2)
semcirc_2_centered = R([1,2])(PI)(extrude(semcirc_2_2D,floor_z))
semcirc_2 = T([1,2])([r_floor0_semcirc_2,r_floor0_semcirc_2])(semcirc_2_centered)
floor0_semicirc2 = T([1,2])([r_floor0_semcirc_2_trasl_x,r_floor0_semcirc_2_trasl_y])(semcirc_2)
floor0 = STRUCT([floor0_r1,floor0_r2,floor0_r3,floor0_semicirc1,floor0_semicirc2,floor0_r4])
building = STRUCT([model_base, T([3])([base_z]), floor0, building])
#VIEW(floor0)
#VIEW(building)

#floor1
floor1_z = h_pillar0+base_z

floor1_r1_x = 1.2
floor1_r1_y = 1.3
floor1_r1_trasl_y = 5.32 

floor1_r2_x = 11.16
floor1_r2_y = floor1_r1_trasl_y+side_square_little_pillar_1

floor1_r3_x = 5.16
floor1_r3_y = 1.27
floor1_r3_trasl_x = 5.99
floor1_r3_trasl_y = floor1_r1_trasl_y

floor1_balcony_x = 1.135
floor1_balcony_y = 1.067
floor1_balcony_trasl_y = floor1_r1_trasl_y

floor1_r1 = T([2])([floor1_r1_trasl_y])(CUBOID([floor1_r1_x,floor1_r1_y,floor_z]))
floor1_r2 = CUBOID([floor1_r2_x,floor1_r2_y,floor_z])
floor1_r3 = T([1,2])([floor1_r3_trasl_x,floor1_r3_trasl_y])(CUBOID([floor1_r3_x,floor1_r3_y,floor_z]))
floor1_balcony = T([1,2])([-floor1_balcony_x,floor1_balcony_trasl_y])(CUBOID([floor1_balcony_x,floor1_balcony_y,floor_z]))


floor1 = T([3])([floor1_z])(STRUCT([floor1_r1,floor1_r2,floor1_r3, floor1_balcony]))

building = STRUCT([building, floor1])


#Draw floor2
floor2_z = 2*h_pillar0+height_floor_1+base_z

trapezium = extrude(MKPOL([[[5.47,0],[11.25,0],[11.25,6.75],[4.51,6.75],[4.51,5.32]],[[1,2,3,4,5]],None]),floor_z)

floor2_r_x = 0.816901408
floor2_r_y = 6.687

floor2_r = CUBOID([floor2_r_x,floor2_r_y,floor_z])
floor2 = T([3])([floor2_z])(STRUCT([trapezium,floor2_r]))
#
building = STRUCT([building, floor2])




#floor3
floor3_z = 3*h_pillar0+2*height_floor_1+base_z

floor3_r1_x = 11.16
floor3_r1_y = 0.152
floor3_r1_trasl_y = 6.52

floor3_r2_y = 0.25
floor3_r2_trasl_x = 5.456
floor3_r2_x = floor3_r1_x - floor3_r2_trasl_x
floor3_r2_trasl_y = 6.39

floor3_r3_x = 0.244
floor3_r3_y = 6.412
floor3_r3_trasl_x =  floor3_r2_trasl_x

floor3_r4_x = 5.47
floor3_r4_y = 5.46
floor3_r4_trasl_x = floor3_r3_trasl_x + floor3_r3_x

floor3_r5_x = 2.418
floor3_r5_y = 0.934
floor3_r5_trasl_x = floor3_r3_trasl_x + 3.29
floor3_r5_trasl_y = floor3_r4_y

floor3_r1 = T([2])([floor3_r1_trasl_y])(CUBOID([floor3_r1_x,floor3_r1_y,floor_z]))
floor3_r2 = T([1,2])([floor3_r2_trasl_x,floor3_r2_trasl_y])(CUBOID([floor3_r2_x,floor3_r2_y,floor_z]))
floor3_r3 = T([1])([floor3_r3_trasl_x])(CUBOID([floor3_r3_x,floor3_r3_y,floor_z]))
floor3_r4 = T([1])([floor3_r4_trasl_x])(CUBOID([floor3_r4_x,floor3_r4_y,floor_z]))
floor3_r5 = T([1,2])([floor3_r5_trasl_x,floor3_r5_trasl_y])(CUBOID([floor3_r5_x,floor3_r5_y,floor_z]))

floor3_part = CUBOID([floor3_r3_trasl_x, floor3_r3_y+0.2, height_floor_1])

floor3 = T([3])([floor3_z])(STRUCT([floor3_r1,floor3_r2,floor3_r3,floor3_r4,floor3_r5, floor3_part]))




floor4_trasl_z = 4*h_pillar0+3*height_floor_1+base_z

floor4_r1_x = 5.44
floor4_r1_y = 1.32
floor4_r1_trasl_y = 5.31

floor4_r2_x = 5.8
floor4_r2_y = 6.657
floor4_r2_trasl_x = floor4_r1_x

floor4_r1 = T([2])([floor4_r1_trasl_y])(CUBOID([floor4_r1_x,floor4_r1_y,floor_z]))

floor4_r2 = T([1])([floor4_r2_trasl_x])(CUBOID([floor4_r2_x,floor4_r2_y,floor_z]))

floor4 = STRUCT([floor4_r1, floor4_r2])

floor4 = T([3])([floor4_trasl_z])(floor4)

building = STRUCT([building, floor3, floor4])

#
VIEW(building)