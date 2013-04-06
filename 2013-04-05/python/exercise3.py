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
north_face = T([3])([h_pillar0+height_floor_1])(north_face)

### VIEW ###
#VIEW(building)
VIEW(north_face)

VIEW(STRUCT([building,COLOR(RED)(north_face)]))
