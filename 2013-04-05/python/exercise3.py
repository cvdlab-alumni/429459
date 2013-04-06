from exercise1 import *
from exercise2 import *
#####support variables######
depth_walls = 0.25
#north_windows
h_windows_n = 0.9564
w_windows_n_part = 1.26
w_windows_n = w_windows_n_part*4

h_total_north_face = 8.06

h_little_windows_n_part = 1.055
h_little_windows_n = 2*h_little_windows_n_part
w_little_windows_n = 0.3

dist_btw_lwins = 0.3
dist_btw_lwin_top_boarder = 0.83
dist_btw_lboarder_win = 0.25
dist_btw_top_boarder_top_win = 1.0798
dist_btw_fst_snd_windows = 1.411
dist_btw_snd_trd_windows = 1.35
dist_btw_win_lwin = 0.9
dist_btw_lwin_lboarder = 0.25
###building north face###
n_1_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])
#
n_2_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_top_boarder_top_win])
n_3_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_fst_snd_windows])
n_4_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_snd_trd_windows])
n_5_fragment = CUBOID([w_windows_n,depth_walls,dist_btw_snd_trd_windows])
#
n_6_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])
#
n_7_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_8_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_9_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
n_10_fragment = CUBOID([w_little_windows_n,depth_walls,dist_btw_lwin_top_boarder])
#
n_11_fragment = CUBOID([dist_btw_win_lwin,depth_walls,h_total_north_face])

#Traslation of fragments#
n_2_fragment = T([1,3])([dist_btw_lboarder_win,2*dist_btw_snd_trd_windows+3*h_windows_n+dist_btw_fst_snd_windows])(n_2_fragment)
n_3_fragment = T([1,3])([dist_btw_lboarder_win,2*dist_btw_snd_trd_windows+2*h_windows_n])(n_3_fragment)
n_4_fragment = T([1,3])([dist_btw_lboarder_win,dist_btw_snd_trd_windows+h_windows_n])(n_4_fragment)
n_5_fragment = T([1])([dist_btw_lboarder_win])(n_5_fragment)
n_6_fragment = T([1])([dist_btw_lboarder_win+w_windows_n])(n_6_fragment)
n_7_fragment = T([1,3])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,3*h_little_windows_n+3*dist_btw_lwins])(n_7_fragment)
n_8_fragment = T([1,3])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,2*h_little_windows_n+2*dist_btw_lwins])(n_8_fragment)
n_9_fragment = T([1,3])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin,h_little_windows_n+dist_btw_lwins])(n_9_fragment)
n_10_fragment = T([1])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin])(n_10_fragment)
n_11_fragment = T([1])([dist_btw_lboarder_win+w_windows_n+dist_btw_win_lwin+w_little_windows_n])(n_11_fragment)
#n_face
north_face = STRUCT([n_1_fragment,n_2_fragment,n_3_fragment,n_4_fragment,n_5_fragment,n_6_fragment,n_7_fragment,n_8_fragment,n_9_fragment,n_10_fragment,n_11_fragment])
#z_translation
north = T([3])([h_pillar0])(north_face)
north = S([3])([1.2])(north)
north = S([1])([0.91])(north)
north = R([1,2])(PI/2)(north)
north = T([1])([11.25])(north)

##########east face###############
wall_depth = 0.25

east_face_z = h_pillar0
east_face_y = depth_walls

east_face_r1_x = 5.8
east_face_r1_z = 6.593

east_face_r2_x = 2.7
east_face_r2_z = 8.889
east_face_r2_traslate_x = east_face_r1_x + 2.7

east_face_r3_x = 2.7
east_face_r3_z = 1.48
east_face_r3_traslate_x = east_face_r1_x
east_face_r3_traslate_z = 1.05

east_face_r4_x = 6.12
east_face_r4_z = 1.044
east_face_r4_traslate_z = 7.84

east_face_r5_x = 1.12
east_face_r5_z = 1.266
east_face_r5_traslate_z = east_face_r1_z

east_face_r6_x = east_face_r1_x+east_face_r2_x+east_face_r3_x
east_face_r6_z = 1.3
east_face_r6_traslate_z = 8.86


east_face_r1 = CUBOID([east_face_r1_x,east_face_y,east_face_r1_z])
east_face_r2 = T([1])([east_face_r2_traslate_x])(CUBOID([east_face_r2_x,east_face_y,east_face_r2_z]))
east_face_r3_part1 = T([1])([east_face_r3_traslate_x])(CUBOID([east_face_r3_x,east_face_y,east_face_r3_z]))

east_face_r3_part2 = STRUCT(NN(3)([east_face_r3_part1, T([3])([east_face_r3_z+east_face_r3_traslate_z]) ]))
east_face_r3 = STRUCT([east_face_r3_part1, T([3])([east_face_r3_z+east_face_r3_traslate_z]), east_face_r3_part2])

east_face_r4 = T([3])([east_face_r4_traslate_z])(CUBOID([east_face_r4_x,east_face_y,east_face_r4_z]))

east_face_r5 = T([3])([east_face_r5_traslate_z])(CUBOID([east_face_r5_x,east_face_y,east_face_r5_z]))

east_face_r6 = T([3])([east_face_r6_traslate_z])(CUBOID([east_face_r6_x,east_face_y,east_face_r6_z]))


east = T([3])([east_face_z])(STRUCT([east_face_r1,east_face_r2,east_face_r3,east_face_r4,east_face_r5,east_face_r6 ]))

###### west faces #####

#### FACE WEST ####

#muro piano terra
muro_princ = CUBOID([7.16,0.25,2.5])
muro_princ_trasl = T([2])([6.50])(muro_princ)

muro_basso_finestra = CUBOID([0.84,0.25,1.66])
mbf_trasl = T([1,2])([7.16,6.50])(muro_basso_finestra)

muro_lato_fin = CUBOID([0.5,0.25,2.5])
mlf_trasl = T([1,2])([8,6.50])(muro_lato_fin)

#muro primo piano

muro_des = CUBOID([5.12,0.25,2.5])
muro_des_trasl= T([2,3])([6.50,2.5+0.39])(muro_des)

muro_s_fin = CUBOID([1.23*2,0.25,1.27])
msf_trasl = T([1,2,3])([5.12,6.50,2.5+0.39])(muro_s_fin)

muro_sin = CUBOID([3.67,0.25,2.5])
ms_trasl = T([1,2,3])([7.58,6.50,2.5+0.39])(muro_sin)

#muro secondo piano
muro_des_2 = CUBOID([8.91,0.25,2.5])
md2_trasl = T([2,3])([6.50,(2.5+0.39)*2])(muro_des_2)

#muro terzo piano
muro_t = CUBOID([11.25,0.25,2.5])
mt_trasl = T([2,3])([6.50,(2.5+0.39)*3])(muro_t)

muro_basso_fin2 = CUBOID([0.26,0.25,1.26])
mbf2_trasl = T([1,2,3])([8.91,6.50,(2.5+0.39)*2])(muro_basso_fin2)

muro_tra_fin = CUBOID([0.25,0.25,2.5])
mtf_trasl = T([1,2,3])([9.17,6.50,(2.5+0.39)*2])(muro_tra_fin)

#muro sotto seconda finestra
mssf_trasl = T([1,2,3])([9.42,6.50,(2.5+0.39)*2])(muro_basso_fin2)

muro_sin_fin = CUBOID([1.57,0.25,2.5])
msin_fin_trasl = T([1,2,3])([9.67,6.50,(2.5+0.39)*2])(muro_sin_fin)

west = STRUCT([muro_princ_trasl,mbf_trasl, mlf_trasl, muro_des_trasl,msf_trasl,ms_trasl,md2_trasl,mbf2_trasl,mtf_trasl,mssf_trasl,msin_fin_trasl,mt_trasl])

west = T([2,3])([-0.08, 0.5])(west)

### VIEW ###
building = STRUCT([building, north, east, west])
#VIEW(building)
VIEW(building)

