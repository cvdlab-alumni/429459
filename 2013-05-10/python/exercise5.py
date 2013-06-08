
#from exercise3 import *
######################################################################
############################ESERCIZIO 2###############################
######################################################################


from pyplasm import *
from utilities import *

dom1D = INTERVALS(1)(16)
dom2D = GRID([6,6])

def bezier(points):
	return BEZIER(S1)(points)

y_profile1 = 0
x_profile2 = 0
z_profile3 = 0

### profilo laterale
profile1_seg1 = bezier(addYValue([[0.21, 1.28], [1.09, 1.82], [2.02, 2.54], [5.08, 2.36]], y_profile1))
profile1_seg2 = bezier(addYValue([[5.08, 2.36], [6.22, 2.4], [6.63, 3.03], [6.77, 3.2]], y_profile1))
profile1_seg3 = bezier(addYValue([[6.77, 3.2], [6.59, 3.35]], y_profile1))
profile1_seg4 = bezier(addYValue([[6.59, 3.35], [7.34, 3.63], [8.61, 3.42], [9.03, 3.36]], y_profile1))
#primo "occhiello"
profile1_seg5 = bezier(addYValue([[9.03, 3.36], [9.22, 3.3], [9.45, 3.36], [9.49, 3.24]], y_profile1))
profile1_seg5_5 = bezier(addYValue([[9.03, 3.36], [9.25, 3.26], [9.54, 3.14], [9.49, 3.24]], y_profile1))

profile1_seg6 = bezier(addYValue([[9.49, 3.24], [9.92, 3.15], [10.31, 3.06], [10.97, 2.8]], y_profile1))
#secondo "occhiello"
profile1_seg7 = bezier(addYValue([[10.97, 2.8], [11.05, 2.87], [11.5, 2.63], [11.52, 2.59]], y_profile1))
profile1_seg8 = bezier(addYValue([[10.97, 2.8], [11.12, 2.66], [11.43, 2.59], [11.52, 2.59]], y_profile1))

profile1_seg9 = bezier(addYValue([[11.52, 2.59], [11.63, 2.52], [11.9, 2.45], [12.22, 2.31]], y_profile1))
profile1_seg10 = bezier(addYValue([[11.85, 1.91], [12.07, 2.29], [12.45, 2.48], [12.5, 2.38]], y_profile1))
profile1_seg11 = bezier(addYValue([[12.08, 1.28], [11.87, 1.43], [12.33, 2.19], [12.5, 2.38]], y_profile1))
profile1_seg12 = bezier(addYValue([[12.08, 1.28], [12.25, 1.25], [11.95, 0.71], [10.7, 0.7]], y_profile1))
profile1_seg13 = bezier(addYValue([[8.12, 0.64], [8.43, 2.68], [10.49, 2.39], [10.7, 0.7]], y_profile1))
profile1_seg14 = bezier(addYValue([[8.12, 0.64], [6.83, 0.56], [4.57, 0.68], [4.17, 0.63]], y_profile1))
profile1_seg15 = bezier(addYValue([[1.57, 0.67], [2.13, 2.75], [3.85, 1.95], [3.79, 1.03], [4.17, 0.63]], y_profile1))
profile1_seg16 = bezier(addYValue([[1.57, 0.67], [1.54, 0.33], [0.81, 0.65], [0.32, 0.72]], y_profile1))
profile1_seg17 = bezier(addYValue([[0.21, 1.28], [0.27, 1.03], [0.37, 0.72], [0.32, 0.72]], y_profile1))
###details###
#faro
profile1_seg18 = bezier(addYValue([[1.33, 1.89], [1.09, 0.73], [-0.01, 1.28], [1.33, 1.89]], y_profile1))
#freccia
profile1_seg19 = bezier(addYValue([[1.26, 1.08], [0.77, 1.14], [1.08, 1.34], [1.27, 1.28]], y_profile1))
profile1_seg20 = bezier(addYValue([[1.26, 1.08], [1.41, 1.1], [1.79, 1.18], [1.27, 1.28]], y_profile1))
profile1_seg21 = bezier(addYValue([[1.26, 1.08], [1.09, 1.12], [1.21, 1.28], [1.27, 1.28]], y_profile1))
profile1_seg22 = bezier(addYValue([[1.26, 1.08], [1.27, 1.28]], y_profile1))
#prese d'aria anteriori
profile1_seg23 = bezier(addYValue([[0.64, 0.79], [0.79, 0.87], [0.69, 1.15], [0.55, 1.14]], y_profile1))
profile1_seg24 = bezier(addYValue([[0.64, 0.79], [0.51, 0.73], [0.42, 1.02], [0.55, 1.14]], y_profile1))
profile1_seg25 = bezier(addYValue([[0.49, 0.77], [0.32, 0.67], [0.18, 1.21], [0.42, 1.1]], y_profile1))
profile1_seg26 = bezier(addYValue([[0.49, 0.77], [0.42, 1.1]], y_profile1))
#prese d'aria laterali
profile1_seg27 = bezier(addYValue([[4.96, 1.09], [4.9, 1.29], [4.51, 2.01], [4.92, 1.81]], y_profile1))
profile1_seg28 = bezier(addYValue([[4.96, 1.09], [5.29, 0.99], [5.1, 1.1], [4.92, 1.81]], y_profile1))
profile1_seg29 = bezier(addYValue([[5.26, 1.09], [5.2, 1.29], [4.81, 2.01], [5.22, 1.81]], y_profile1))
profile1_seg30 = bezier(addYValue([[5.26, 1.09], [5.59, 0.99], [5.4, 1.1], [5.22, 1.81]], y_profile1))
#portiera
profile1_seg31 = bezier(addYValue([[8.48, 3.08], [7.68, 0.49], [8.72, 1.08], [5.7, 0.97]], y_profile1))
profile1_seg32 = bezier(addYValue([[8.48, 3.08], [6.38, 3.25], [7.07, 3.41], [6.27, 2.25]], y_profile1))
profile1_seg33 = bezier(addYValue([[8.25, 2.29], [6.54, 2.25], [6.23, 2.31], [5.76, 2.16]], y_profile1))
profile1_seg34 = bezier(addYValue([[11.99, 2.19], [9.03, 2.97], [8.59, 2.43], [8.25, 2.28]], y_profile1))

#####profile1_curves mapping#######
profile1_seg1_mapped = MAP(profile1_seg1)(dom1D)
profile1_seg2_mapped = MAP(profile1_seg2)(dom1D)
profile1_seg3_mapped = MAP(profile1_seg3)(dom1D)
profile1_seg4_mapped = MAP(profile1_seg4)(dom1D)
profile1_seg5_mapped = MAP(profile1_seg5)(dom1D)
profile1_seg5_5_mapped = MAP(profile1_seg5_5)(dom1D)
profile1_seg6_mapped = MAP(profile1_seg6)(dom1D)
profile1_seg7_mapped = MAP(profile1_seg7)(dom1D)
profile1_seg8_mapped = MAP(profile1_seg8)(dom1D)
profile1_seg9_mapped = MAP(profile1_seg9)(dom1D)
profile1_seg10_mapped = MAP(profile1_seg10)(dom1D)
profile1_seg11_mapped = MAP(profile1_seg11)(dom1D)
profile1_seg12_mapped = MAP(profile1_seg12)(dom1D)
profile1_seg13_mapped = MAP(profile1_seg13)(dom1D)
profile1_seg14_mapped = MAP(profile1_seg14)(dom1D)
profile1_seg15_mapped = MAP(profile1_seg15)(dom1D)
profile1_seg16_mapped = MAP(profile1_seg16)(dom1D)
profile1_seg17_mapped = MAP(profile1_seg17)(dom1D)
profile1_seg18_mapped = MAP(profile1_seg18)(dom1D)
profile1_seg19_mapped = MAP(profile1_seg19)(dom1D)
profile1_seg20_mapped = MAP(profile1_seg20)(dom1D)
profile1_seg21_mapped = MAP(profile1_seg21)(dom1D)
profile1_seg22_mapped = MAP(profile1_seg22)(dom1D)
profile1_seg23_mapped = MAP(profile1_seg23)(dom1D)
profile1_seg24_mapped = MAP(profile1_seg24)(dom1D)
profile1_seg25_mapped = MAP(profile1_seg25)(dom1D)
profile1_seg26_mapped = MAP(profile1_seg26)(dom1D)
profile1_seg27_mapped = MAP(profile1_seg27)(dom1D)
profile1_seg28_mapped = MAP(profile1_seg28)(dom1D)
profile1_seg29_mapped = MAP(profile1_seg29)(dom1D)
profile1_seg30_mapped = MAP(profile1_seg30)(dom1D)
profile1_seg31_mapped = MAP(profile1_seg31)(dom1D)
profile1_seg32_mapped = MAP(profile1_seg32)(dom1D)
profile1_seg33_mapped = MAP(profile1_seg33)(dom1D)
profile1_seg34_mapped = MAP(profile1_seg34)(dom1D)


###################################################

profile1 = [profile1_seg1_mapped, profile1_seg2_mapped, profile1_seg3_mapped,\
profile1_seg4_mapped, profile1_seg5_mapped, profile1_seg6_mapped, profile1_seg5_5_mapped,\
profile1_seg7_mapped, profile1_seg8_mapped, profile1_seg9_mapped, profile1_seg10_mapped,\
profile1_seg11_mapped, profile1_seg12_mapped, profile1_seg13_mapped, profile1_seg14_mapped,\
profile1_seg15_mapped, profile1_seg16_mapped, profile1_seg17_mapped, profile1_seg18_mapped,\
profile1_seg19_mapped, profile1_seg20_mapped, profile1_seg21_mapped, profile1_seg22_mapped,\
profile1_seg23_mapped, profile1_seg24_mapped, profile1_seg25_mapped, profile1_seg26_mapped,\
profile1_seg27_mapped, profile1_seg28_mapped, profile1_seg29_mapped, profile1_seg30_mapped,\
profile1_seg31_mapped, profile1_seg32_mapped, profile1_seg33_mapped, profile1_seg34_mapped]

##########PARTE ANTERIORE##VIEW FRONTALE###########
profile2_seg1 = bezier(addXValue([[1.09, 1.89], [1.14, 2.14], [0.01, 3.27], [0.32, 1.02]], x_profile2))
profile2_seg2 = bezier(addXValue([[4.63, 0.99], [4.57, 0.49], [0.74, 0.31], [0.32, 1.02]], x_profile2))
profile2_seg3 = bezier(addXValue([[4.63, 0.99], [5.06, 2.15], [4.38, 3.05], [3.85, 1.79]], x_profile2))
profile2_seg4 = bezier(addXValue([[4.4, 2.37], [3.78, 2.46], [1.79, 2.56], [0.57, 2.38]], x_profile2))
profile2_seg5 = bezier(addXValue([[1.04, 3.29], [0.57, 2.38]], x_profile2))
profile2_seg6 = bezier(addXValue([[3.96, 3.29], [3.66, 3.41], [1.81, 3.46], [1.03, 3.29]], x_profile2))
profile2_seg7 = bezier(addXValue([[3.96, 3.29], [3.67, 3.48], [1.66, 3.5], [1.03, 3.29]], x_profile2))
profile2_seg8 = bezier(addXValue([[3.96, 3.29], [4.01, 3.69], [1.09, 3.69], [1.03, 3.29]], x_profile2))
profile2_seg9 = bezier(addXValue([[3.96, 3.29], [4.37, 2.4]], x_profile2))
#cofano
profile2_seg10 = bezier(addXValue([[3.78, 2.29], [3.26, 2.48], [2.04, 2.48], [1.2, 2.3]], x_profile2))
profile2_seg11 = bezier(addXValue([[3.15, 2.04], [1.3, 2.27], [1.53, 1.65], [1.2, 2.3]], x_profile2))
profile2_seg12 = bezier(addXValue([[3.15, 2.04], [3.67, 1.9], [3.69, 2.2], [3.78, 2.29]], x_profile2))
profile2_seg13 = bezier(addXValue([[2.12, 2.22], [2.57, 2], [3.5, 2.35], [2.51, 2.42]], x_profile2))
profile2_seg14 = bezier(addXValue([[2.12, 2.22], [2.07, 2.29], [2.09, 2.41], [2.51, 2.42]], x_profile2))
#prese d'aria cofano
profile2_seg15 = bezier(addXValue([[2.3, 2.01], [2.37, 1.81], [2.69, 1.85], [2.69, 2.01]], x_profile2))
profile2_seg16 = bezier(addXValue([[2.3, 2.01], [2.69, 2.01]], x_profile2))
profile2_seg17 = bezier(traslaPointsZ(addXValue([[2.3, 2.01], [2.37, 1.81], [2.69, 1.85], [2.69, 2.01]], x_profile2),-0.34))
profile2_seg18 = bezier(traslaPointsZ(addXValue([[2.3, 2.01], [2.69, 2.01]], x_profile2),-0.34))
profile2_seg19 = bezier(traslaPointsZ(traslaPointsY(addXValue([[2.3, 2.01], [2.37, 1.81], [2.69, 1.85], [2.69, 2.01]], x_profile2),0.66),-0.34))
profile2_seg20 = bezier(traslaPointsZ(traslaPointsY(addXValue([[2.3, 2.01], [2.69, 2.01]], x_profile2),0.66),-0.34))
profile2_seg21 = bezier(traslaPointsZ(traslaPointsY(addXValue([[2.3, 2.01], [2.37, 1.81], [2.69, 1.85], [2.69, 2.01]], x_profile2),-0.66),-0.34))
profile2_seg22 = bezier(traslaPointsZ(traslaPointsY(addXValue([[2.3, 2.01], [2.69, 2.01]], x_profile2),-0.66),-0.34))
#fari anteriori
profile2_seg23 = bezier(addXValue([[1.01, 1.82], [1.3, 1.26], [0.41, 1.08], [0.38, 1.63]], x_profile2))
profile2_seg24 = bezier(addXValue([[1.01, 1.82], [0.8, 2.12], [0.37, 1.97], [0.38, 1.63]], x_profile2))
profile2_seg25 = bezier(traslaPointsY(flipY(addXValue([[1.01, 1.82], [1.3, 1.26], [0.41, 1.08], [0.38, 1.63]], x_profile2)), 2.36))
profile2_seg26 = bezier(traslaPointsY(flipY(addXValue([[1.01, 1.82], [0.8, 2.12], [0.37, 1.97], [0.38, 1.63]], x_profile2)), 2.94))

profile2_seg27 = bezier(addXValue([[0.48, 1.64], [0.45, 1.28], [1.12, 1.3], [0.95, 1.75]], x_profile2))
profile2_seg28 = bezier(addXValue([[0.48, 1.64], [0.5, 1.96], [0.89, 1.95], [0.95, 1.75]], x_profile2))
profile2_seg29 = bezier(traslaPointsY(flipY(addXValue([[0.48, 1.64], [0.45, 1.28], [1.12, 1.3], [0.95, 1.75]], x_profile2)), 2.72))
profile2_seg30 = bezier(traslaPointsY(flipY(addXValue([[0.48, 1.64], [0.5, 1.96], [0.89, 1.95], [0.95, 1.75]], x_profile2)), 3.06))

profile2_seg31 = bezier(addXValue([[0.71, 0.97], [0.7, 1.2], [1.05, 1.28], [1.06, 1.01]], x_profile2))
profile2_seg32 = bezier(addXValue([[0.71, 0.97], [0.73, 0.8], [1.04, 0.75], [1.06, 1.01]], x_profile2))
profile2_seg33 = bezier(traslaPointsY(flipY(addXValue([[0.71, 0.97], [0.7, 1.2], [1.05, 1.28], [1.06, 1.01]], x_profile2)), 2.83))
profile2_seg34 = bezier(traslaPointsY(flipY(addXValue([[0.71, 0.97], [0.73, 0.8], [1.04, 0.75], [1.06, 1.01]], x_profile2)), 2.83))

profile2_seg35 = bezier(addXValue([[1.44, 1.18], [1.19, 1.15], [1.04, 1.27], [1.08, 0.9]], x_profile2))
profile2_seg36 = bezier(addXValue([[1.44, 1.18], [1.56, 1.2], [1.57, 1.15], [1.57, 1.01]], x_profile2))
profile2_seg37 = bezier(addXValue([[1.34, 0.82], [1.66, 0.79], [1.56, 0.94], [1.57, 1.01]], x_profile2))
profile2_seg38 = bezier(addXValue([[1.34, 0.82], [1.22, 0.83], [1.06, 0.76], [1.08, 0.9]], x_profile2))

profile2_seg39 = bezier(traslaPointsY(addXValue([[1.44, 1.18], [1.19, 1.15], [1.04, 1.27], [1.08, 0.9]], x_profile2), 2.3))
profile2_seg40 = bezier(traslaPointsY(addXValue([[1.44, 1.18], [1.56, 1.2], [1.57, 1.15], [1.57, 1.01]], x_profile2), 2.3))
profile2_seg41 = bezier(traslaPointsY(addXValue([[1.34, 0.82], [1.66, 0.79], [1.56, 0.94], [1.57, 1.01]], x_profile2), 2.3))
profile2_seg42 = bezier(traslaPointsY(addXValue([[1.34, 0.82], [1.22, 0.83], [1.06, 0.76], [1.08, 0.9]], x_profile2), 2.3))

profile2_seg43 = bezier(addXValue([[3.24, 1.05], [3.21, 0.75], [1.67, 0.82], [1.71, 1.04]], x_profile2))
profile2_seg44 = bezier(addXValue([[3.24, 1.05], [3.28, 1.33], [1.68, 1.32], [1.71, 1.04]], x_profile2))

profile2_seg45 = bezier(addXValue([[2.09, 0.55], [1.92, 0.65], [1.78, 0.75], [1.5, 0.6]], x_profile2))
profile2_seg46 = bezier(addXValue([[2.78, 0.55], [2.57, 0.7], [2.4, 0.72], [2.19, 0.55]], x_profile2))
profile2_seg47 = bezier(addXValue([[3.48, 0.6], [3.22, 0.71], [3.04, 0.71], [2.86, 0.55]], x_profile2))

#####profile2_curves mapping#######
profile2_seg1_mapped = MAP(profile2_seg1)(dom1D)
profile2_seg2_mapped = MAP(profile2_seg2)(dom1D)
profile2_seg3_mapped = MAP(profile2_seg3)(dom1D)
profile2_seg4_mapped = MAP(profile2_seg4)(dom1D)
profile2_seg5_mapped = MAP(profile2_seg5)(dom1D)
profile2_seg6_mapped = MAP(profile2_seg6)(dom1D)
profile2_seg7_mapped = MAP(profile2_seg7)(dom1D)
profile2_seg8_mapped = MAP(profile2_seg8)(dom1D)
profile2_seg9_mapped = MAP(profile2_seg9)(dom1D)
profile2_seg10_mapped = MAP(profile2_seg10)(dom1D)
profile2_seg11_mapped = MAP(profile2_seg11)(dom1D)
profile2_seg12_mapped = MAP(profile2_seg12)(dom1D)
profile2_seg13_mapped = MAP(profile2_seg13)(dom1D)
profile2_seg14_mapped = MAP(profile2_seg14)(dom1D)
profile2_seg15_mapped = MAP(profile2_seg15)(dom1D)
profile2_seg16_mapped = MAP(profile2_seg16)(dom1D)
profile2_seg17_mapped = MAP(profile2_seg17)(dom1D)
profile2_seg18_mapped = MAP(profile2_seg18)(dom1D)
profile2_seg19_mapped = MAP(profile2_seg19)(dom1D)
profile2_seg20_mapped = MAP(profile2_seg20)(dom1D)
profile2_seg21_mapped = MAP(profile2_seg21)(dom1D)
profile2_seg22_mapped = MAP(profile2_seg22)(dom1D)
profile2_seg23_mapped = MAP(profile2_seg23)(dom1D)
profile2_seg24_mapped = MAP(profile2_seg24)(dom1D)
profile2_seg25_mapped = MAP(profile2_seg25)(dom1D)
profile2_seg26_mapped = MAP(profile2_seg26)(dom1D)
profile2_seg27_mapped = MAP(profile2_seg27)(dom1D)
profile2_seg28_mapped = MAP(profile2_seg28)(dom1D)
profile2_seg29_mapped = MAP(profile2_seg29)(dom1D)
profile2_seg30_mapped = MAP(profile2_seg30)(dom1D)
profile2_seg31_mapped = MAP(profile2_seg31)(dom1D)
profile2_seg32_mapped = MAP(profile2_seg32)(dom1D)
profile2_seg33_mapped = MAP(profile2_seg33)(dom1D)
profile2_seg34_mapped = MAP(profile2_seg34)(dom1D)
profile2_seg35_mapped = MAP(profile2_seg35)(dom1D)
profile2_seg36_mapped = MAP(profile2_seg36)(dom1D)
profile2_seg37_mapped = MAP(profile2_seg37)(dom1D)
profile2_seg38_mapped = MAP(profile2_seg38)(dom1D)
profile2_seg39_mapped = MAP(profile2_seg39)(dom1D)
profile2_seg40_mapped = MAP(profile2_seg40)(dom1D)
profile2_seg41_mapped = MAP(profile2_seg41)(dom1D)
profile2_seg42_mapped = MAP(profile2_seg42)(dom1D)
profile2_seg43_mapped = MAP(profile2_seg43)(dom1D)
profile2_seg44_mapped = MAP(profile2_seg44)(dom1D)
profile2_seg45_mapped = MAP(profile2_seg45)(dom1D)
profile2_seg46_mapped = MAP(profile2_seg46)(dom1D)
profile2_seg47_mapped = MAP(profile2_seg47)(dom1D)
####################################
profile2 = [profile2_seg1_mapped, profile2_seg2_mapped, profile2_seg3_mapped, profile2_seg4_mapped,\
profile2_seg5_mapped, profile2_seg6_mapped, profile2_seg7_mapped, profile2_seg8_mapped, profile2_seg9_mapped,\
profile2_seg10_mapped, profile2_seg11_mapped, profile2_seg12_mapped, profile2_seg13_mapped, profile2_seg14_mapped,\
profile2_seg15_mapped, profile2_seg16_mapped, profile2_seg17_mapped, profile2_seg18_mapped, profile2_seg19_mapped,\
profile2_seg20_mapped, profile2_seg21_mapped, profile2_seg22_mapped, profile2_seg23_mapped, profile2_seg24_mapped,\
profile2_seg25_mapped, profile2_seg26_mapped, profile2_seg27_mapped, profile2_seg28_mapped, profile2_seg29_mapped,\
profile2_seg30_mapped, profile2_seg31_mapped, profile2_seg32_mapped, profile2_seg33_mapped, profile2_seg34_mapped,\
profile2_seg35_mapped, profile2_seg36_mapped, profile2_seg37_mapped, profile2_seg38_mapped, profile2_seg39_mapped,\
profile2_seg40_mapped, profile2_seg41_mapped, profile2_seg42_mapped, profile2_seg43_mapped, profile2_seg44_mapped,\
profile2_seg45_mapped, profile2_seg46_mapped, profile2_seg47_mapped]

##########top VIEW########profile3#########
#muso
profile3_seg1 = bezier(addZValue([[0.89, 2.57], [0.75, 3.75], [1.56, 4.32], [2.37, 4.36]], z_profile3))
profile3_seg2 = bezier(addZValue([[0.89, 2.57], [0.75, 1.39], [1.56, 0.76], [2.37, 0.78]], z_profile3))
#lato
profile3_seg3 = bezier(addZValue([[7.68, 4.33], [2.37, 4.36]], z_profile3))
profile3_seg4 = bezier(addZValue([[7.68, 0.75], [2.37, 0.78]], z_profile3))
profile3_seg5 = bezier(addZValue([[7.68, 4.33], [7.98, 4.48], [9.83, 4.68], [11.18, 4.02]], z_profile3))
profile3_seg6 = bezier(traslaPointsY(flipY(addZValue([[7.68, 4.33], [7.98, 4.48], [9.83, 4.68], [11.18, 4.02]], z_profile3)), -4.28))
#retro
profile3_seg7 = bezier(addZValue([[11.18, 1.05], [11.71, 2.23], [11.19, 3.85], [11.18, 4.02]],z_profile3))
#portabagagli
profile3_seg8 = bezier(addZValue([[10.88, 3.58], [10.4, 3.6], [10, 3.86], [10.11, 3.35]], z_profile3))
profile3_seg9 = bezier(addZValue([[10.09, 1.85], [10.11, 3.35]], z_profile3))
profile3_seg10 = bezier(addZValue([[10.09, 1.85], [10.55, 1.97], [10.58, 1.59], [10.56, 1.39]], z_profile3))
profile3_seg11 = bezier(addZValue([[10.88, 3.58], [10.99, 2.19], [11.12, 1.27], [10.56, 1.39]], z_profile3))
#tappo serbatoio
profile3_seg12 = bezier(addZValue([[10.47, 1.52], [10.43, 1.36], [10.19, 1.31], [10.11, 1.51]], z_profile3))
profile3_seg13 = bezier(addZValue([[10.47, 1.52], [10.49, 1.81], [10.1, 1.83], [10.11, 1.51]], z_profile3))
#lunotto posteriore
profile3_seg14 = bezier(addZValue([[9.89, 1.72], [9.97, 1.09], [9.56, 1.3], [8.43, 1.23]], z_profile3))
profile3_seg15 = bezier(addZValue([[9.89, 1.72], [9.87, 3.41], [10.05, 3.78], [9.46, 3.72]], z_profile3))
profile3_seg16 = bezier(addZValue([[8.33, 2.75], [8.31, 3.74], [8.06, 3.82], [9.46, 3.72]], z_profile3))
profile3_seg17 = bezier(addZValue([[8.33, 2.75], [8.4, 1.1], [8.16, 1.3], [8.43,1.23]], z_profile3))
#finestrini
profile3_seg18 = bezier(addZValue([[7.63, 0.84], [8.13, 1.4], [7.83, 1.16], [6.57, 1.23]], z_profile3))
profile3_seg19 = bezier(addZValue([[5.99, 0.85], [6.57, 1.23]], z_profile3))
profile3_seg20 = bezier(addZValue([[5.99, 0.85], [7.63, 0.84]], z_profile3))
profile3_seg21 = bezier(addZValue([[6.56, 3.81], [6.02, 4.15]], z_profile3))
profile3_seg22 = bezier(addZValue([[7.65, 4.13], [6.02, 4.15]], z_profile3))
profile3_seg23 = bezier(addZValue([[7.65, 4.13], [8.18, 3.64], [7.64, 3.86], [6.57, 3.81]], z_profile3))
#parabrezza
profile3_seg24 = bezier(addZValue([[5.83, 0.89], [6.45, 1.28]], z_profile3))
profile3_seg25 = bezier(addZValue([[6.49, 3.7], [6.03, 2.6], [6.39, 1.56], [6.45, 1.28]], z_profile3))
profile3_seg26 = bezier(addZValue([[6.49, 3.7], [5.88, 4.07]], z_profile3))
profile3_seg27 = bezier(addZValue([[5.83, 0.89], [5.21, 1.72], [5.05, 3.13], [5.88, 4.07]], z_profile3))
#cofano
profile3_seg28 = bezier(addZValue([[4.58, 3.91], [3.86, 3.73], [2.21, 3.57], [1.38, 3.73]], z_profile3))
profile3_seg29 = bezier(addZValue([[1.78, 4.15], [1.99, 3.89], [1.7, 3.58], [1.27, 3.8]], z_profile3))
profile3_seg30 = bezier(addZValue([[1.78, 4.15], [1.71, 4.23], [1.28, 4.07], [1.27, 3.8]], z_profile3))
profile3_seg31 = bezier(addZValue([[4.5, 1.23], [3.1, 1.55], [1.74, 1.55], [1.33, 1.38]], z_profile3))
profile3_seg32 = bezier(addZValue([[1.78, 1.1], [1.92, 1.56], [1.21, 1.41], [1.27, 1.27]], z_profile3))
profile3_seg33 = bezier(addZValue([[1.78, 1.1], [1.84, 0.84], [1.18, 1.25], [1.27, 1.27]], z_profile3))
profile3_seg34 = bezier(addZValue([[4.94, 1.60], [5.29, 1.43], [2.73, 1.58], [2.78, 1.76]], z_profile3))
profile3_seg35 = bezier(addZValue([[4.91, 3.65], [4.41, 3.63], [2.79, 3.58], [2.76, 3.45]], z_profile3))
profile3_seg36 = bezier(addZValue([[4.84, 2.5], [3.95, 2.22], [3.14, 2.14], [2.74, 2.44]], z_profile3))
profile3_seg37 = bezier(addZValue([[4.85, 2.67], [3.89, 3.03], [3.29, 2.93], [2.8, 2.68]], z_profile3))
#prese d'aria sul cofano
profile3_seg38 = bezier(addZValue([[1.39, 2.84], [0.93, 2.79], [0.94, 3.31], [1.39, 3.26]], z_profile3))
profile3_seg39 = bezier(addZValue([[1.39, 2.84], [1.39, 3.26]], z_profile3))
profile3_seg40 = bezier(traslaPointsY(addZValue([[1.39, 2.84], [0.93, 2.79], [0.94, 3.31], [1.39, 3.26]], z_profile3), -0.5))
profile3_seg41 = bezier(traslaPointsY(addZValue([[1.39, 2.84], [1.39, 3.26]], z_profile3), -0.5))
profile3_seg42 = bezier(traslaPointsY(addZValue([[1.39, 2.84], [0.93, 2.79], [0.94, 3.31], [1.39, 3.26]], z_profile3), -1))
profile3_seg43 = bezier(traslaPointsY(addZValue([[1.39, 2.84], [1.39, 3.26]], z_profile3), -1))




#####profile3_curves mapping#######
profile3_seg1_mapped = MAP(profile3_seg1)(dom1D)
profile3_seg2_mapped = MAP(profile3_seg2)(dom1D)
profile3_seg3_mapped = MAP(profile3_seg3)(dom1D)
profile3_seg4_mapped = MAP(profile3_seg4)(dom1D)
profile3_seg5_mapped = MAP(profile3_seg5)(dom1D)
profile3_seg6_mapped = MAP(profile3_seg6)(dom1D)
profile3_seg7_mapped = MAP(profile3_seg7)(dom1D)
profile3_seg8_mapped = MAP(profile3_seg8)(dom1D)
profile3_seg9_mapped = MAP(profile3_seg9)(dom1D)
profile3_seg10_mapped = MAP(profile3_seg10)(dom1D)
profile3_seg11_mapped = MAP(profile3_seg11)(dom1D)
profile3_seg12_mapped = MAP(profile3_seg12)(dom1D)
profile3_seg13_mapped = MAP(profile3_seg13)(dom1D)
profile3_seg14_mapped = MAP(profile3_seg14)(dom1D)
profile3_seg15_mapped = MAP(profile3_seg15)(dom1D)
profile3_seg16_mapped = MAP(profile3_seg16)(dom1D)
profile3_seg17_mapped = MAP(profile3_seg17)(dom1D)
profile3_seg18_mapped = MAP(profile3_seg18)(dom1D)
profile3_seg19_mapped = MAP(profile3_seg19)(dom1D)
profile3_seg20_mapped = MAP(profile3_seg20)(dom1D)
profile3_seg21_mapped = MAP(profile3_seg21)(dom1D)
profile3_seg22_mapped = MAP(profile3_seg22)(dom1D)
profile3_seg23_mapped = MAP(profile3_seg23)(dom1D)
profile3_seg24_mapped = MAP(profile3_seg24)(dom1D)
profile3_seg25_mapped = MAP(profile3_seg25)(dom1D)
profile3_seg26_mapped = MAP(profile3_seg26)(dom1D)
profile3_seg27_mapped = MAP(profile3_seg27)(dom1D)
profile3_seg28_mapped = MAP(profile3_seg28)(dom1D)
profile3_seg29_mapped = MAP(profile3_seg29)(dom1D)
profile3_seg30_mapped = MAP(profile3_seg30)(dom1D)
profile3_seg31_mapped = MAP(profile3_seg31)(dom1D)
profile3_seg32_mapped = MAP(profile3_seg32)(dom1D)
profile3_seg33_mapped = MAP(profile3_seg33)(dom1D)
profile3_seg34_mapped = MAP(profile3_seg34)(dom1D)
profile3_seg35_mapped = MAP(profile3_seg35)(dom1D)
profile3_seg36_mapped = MAP(profile3_seg36)(dom1D)
profile3_seg37_mapped = MAP(profile3_seg37)(dom1D)
profile3_seg38_mapped = MAP(profile3_seg38)(dom1D)
profile3_seg39_mapped = MAP(profile3_seg39)(dom1D)
profile3_seg40_mapped = MAP(profile3_seg40)(dom1D)
profile3_seg41_mapped = MAP(profile3_seg41)(dom1D)
profile3_seg42_mapped = MAP(profile3_seg42)(dom1D)
profile3_seg43_mapped = MAP(profile3_seg43)(dom1D)


#####################################
profile3 = [profile3_seg1_mapped, profile3_seg2_mapped, profile3_seg3_mapped, profile3_seg4_mapped, profile3_seg5_mapped,\
profile3_seg6_mapped, profile3_seg7_mapped, profile3_seg8_mapped, profile3_seg9_mapped, profile3_seg10_mapped,\
profile3_seg11_mapped, profile3_seg12_mapped, profile3_seg13_mapped, profile3_seg14_mapped, profile3_seg15_mapped,\
profile3_seg16_mapped, profile3_seg17_mapped, profile3_seg18_mapped, profile3_seg19_mapped, profile3_seg20_mapped,\
profile3_seg21_mapped, profile3_seg22_mapped, profile3_seg23_mapped, profile3_seg24_mapped, profile3_seg25_mapped,\
profile3_seg26_mapped, profile3_seg27_mapped, profile3_seg28_mapped, profile3_seg29_mapped, profile3_seg30_mapped,\
profile3_seg31_mapped, profile3_seg32_mapped, profile3_seg33_mapped, profile3_seg34_mapped, profile3_seg35_mapped,\
profile3_seg36_mapped, profile3_seg37_mapped, profile3_seg38_mapped, profile3_seg39_mapped, profile3_seg40_mapped,\
profile3_seg41_mapped, profile3_seg42_mapped, profile3_seg43_mapped]

profile3 = STRUCT(profile3)
profile3 = T([1,2])([-1,-0.6])(S([1,2,3])([1.176470588,1.176470588,1.176470588])(profile3))


profile1_2 = STRUCT(profile1)
profile1_2 = T([2])([5])(profile1_2)
profiles = unionArrays([profile1, [profile1_2], profile2, [profile3]])

######################################################################
############################ESERCIZIO 3###############################
######################################################################

def bezMap(curve, dom):
	return MAP(curve)(dom)

###raggi
circle1 = bezier(addYValue([[2.72, 1.39], [2.85, 1.34], [2.62, 1.31], [2.71, 1.39]], 0))
circle2 = bezier(addYValue([[2.72, 1.39], [2.85, 1.34], [2.62, 1.31], [2.71, 1.39]], 5))

cyl = MAP(BEZIER(S2)([circle1,circle2]))(dom2D)
cyl = T([1,2])([-1.7,-0.7])(cyl)
raggi = STRUCT( NN(50)([cyl, R([1,2])(PI/16)]))

raggi = S([1,2,3])([0.1,0.1,0.1])(raggi)
raggi2 = T([3])([-0.5])(R([1,2])(PI/25)(raggi))
raggi2 = R([1,3])(PI)(raggi2)

#rubber
raggio_ruota = 0.6
ampiezza_gomma = 0.2
spessore = 0.5
ruota_esterno1 = bezier_circle_map(raggio_ruota, S1)
ruota_interno1 = bezier_circle_map(raggio_ruota-ampiezza_gomma,S1)
ruota_esterno2 = bezier_circle_not_centered_map(raggio_ruota,0,0,spessore, S1)
ruota_interno2 = bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma,0,0,spessore,S1)
ruota_centro = bezier_circle_not_centered_map(raggio_ruota,0,0,spessore/2, S1)

ruota_interno1_1 = bezier_circle_map(raggio_ruota-ampiezza_gomma-0.05,S1)
ruota_interno2_2 =  bezier_circle_not_centered_map(raggio_ruota-ampiezza_gomma-0.05,0,0,spessore,S1)

gomma = MAP(BEZIER(S2)([ruota_interno1,ruota_esterno1,ruota_esterno2,ruota_interno2]))(dom2D)
gomma = TEXTURE("../images/textureRubberWheel.jpg")(gomma)

raggi = COLOR([1,1,1])(raggi)
raggi2 = COLOR([1,1,1])(raggi2)
piatto_cerchione = STRUCT([MAP(BEZIER(S2)([ruota_interno1, ruota_interno1_1]))(dom2D),\
	MAP(BEZIER(S2)([ruota_interno1_1, ruota_interno2_2]))(dom2D), MAP(BEZIER(S2)([ruota_interno2_2, ruota_interno2]))(dom2D),\
	MAP(BEZIER(S2)([ruota_interno2, ruota_interno1]))(dom2D)])
piatto_cerchione =  COLOR([1,1,1])(piatto_cerchione)
ruota = STRUCT([gomma,raggi,raggi2,piatto_cerchione])

##elemento centrale
semiCirc1 = BEZIER(S1)([[0,0.1,0], [-0.132,0.1,0], [-0.132,-0.1,0], [0,-0.1,0]])
semiCirc2 = BEZIER(S1)([[0,0.1,0], [0.132,0.1,0], [0.132,-0.1,0], [0,-0.1,0]])
semiCirc3 = BEZIER(S1)([[0,0.1,0.5], [-0.132,0.1,0.5], [-0.132,-0.1,0.5], [0,-0.1,0.5]])
semiCirc4 = BEZIER(S1)([[0,0.1,0.5], [0.132,0.1,0.5], [0.132,-0.1,0.5], [0,-0.1,0.5]])

tappo = BEZIER(S2)([semiCirc1,semiCirc2])
tappo = MAP(tappo)(dom2D)
#totalcircle = STRUCT([semiCirc1, semiCirc2, semiCirc3, semiCirc4])
semiCyl1 = MAP(BEZIER(S2)([semiCirc1, semiCirc3]))(dom2D)
semiCyl2 = MAP(BEZIER(S2)([semiCirc2, semiCirc4]))(dom2D)

elem_sovratappo_1 = BEZIER(S1)([[0.06, 0, 0], [0.22, 0.35, 0], [-0.13, -0.04, 0], [0, -0.04, 0]])
elem_sovratappo_2 = BEZIER(S1)([[0.06, 0, 0], [0, -0.04, 0]])
elem_sovratappo_3 = BEZIER(S1)([[0.06, 0, 0.05], [0.22, 0.35, 0.05], [-0.13, -0.04, 0.05], [0, -0.04, 0.05]])
elem_sovratappo_4 = BEZIER(S1)([[0.06, 0, 0.05], [0, -0.04, 0.05]])

elem_sovratappo_1_2 = MAP(BEZIER(S2)([elem_sovratappo_1, elem_sovratappo_2]))(dom2D)
elem_sovratappo_1_3 = MAP(BEZIER(S2)([elem_sovratappo_1, elem_sovratappo_3]))(dom2D)
elem_sovratappo_3_4 = MAP(BEZIER(S2)([elem_sovratappo_3, elem_sovratappo_4]))(dom2D)
elem_sovratappo_2_4 = MAP(BEZIER(S2)([elem_sovratappo_2, elem_sovratappo_4]))(dom2D)
elem_sovratappo_3d = STRUCT([elem_sovratappo_1_2, elem_sovratappo_1_3, elem_sovratappo_3_4, elem_sovratappo_2_4])
elem_sovratappo_3d = R([1,2])(-PI/6)(elem_sovratappo_3d)
elem_sovratappo_3d = T([2])([0.1])(elem_sovratappo_3d)
elem_sovratappo_tot = STRUCT( NN(3)([elem_sovratappo_3d, R([1,2])((2.0/3.0)*PI)]))
elem_sovratappo_tot2 = T([3])([0.45])(elem_sovratappo_tot)

central_element = STRUCT([semiCyl1, semiCyl2, tappo, T([3])([0.5])(tappo), elem_sovratappo_tot, elem_sovratappo_tot2])
central_element = S([1,2])([1,1])(central_element)
central_element = COLOR([1,1,1])(central_element)

ruota_completa = STRUCT([elem_sovratappo_tot, elem_sovratappo_tot2, ruota, central_element])
ruota_completa = R([2,3])(PI/2)(ruota_completa)

ruota_completa_1 = T([1,2,3])([1.7,0.5,0.6])(ruota_completa)
ruota_completa_1 = S([1,2,3])([1.6,1.6,1.6])(ruota_completa_1)

ruota_completa_2 = T([1])([6.7])(ruota_completa_1)

ruota_completa_3_4 = STRUCT([ruota_completa_1, ruota_completa_2])
ruota_completa_3_4 = T([2])([3.9])(ruota_completa_3_4)

# view(profiles)
#view([ruota_completa_1, ruota_completa_2, ruota_completa_3_4])

profiles.append(ruota_completa_1)
profiles.append(ruota_completa_2)
profiles.append(ruota_completa_3_4)
############################################


######################################################################
############################ESERCIZIO 4###############################
######################################################################



### steering wheel ###
#right
r1 = bezier(addYValue([[2.15, 0.08], [3.53, 0.09], [3.67, 2.08], [2.15, 2.27]],0))
r2 = bezier(addYValue([[2.15, 0.17], [3.33, 0.16], [3.67, 2.08], [2.15, 2.19]],0.2))
r3 = bezier(addYValue([[2.15, 0.25], [3.32, 0.26], [3.34, 2.04], [2.15, 2.07]],0))
r4 = bezier(addYValue([[2.15, 0.17], [3.33, 0.16], [3.67, 2.08], [2.15, 2.19]],-0.2))
right_steering_wheel = BEZIER(S2)([r1,r2,r3,r4, r1])

#left
l1 = bezier(addYValue([[2.15, 0.08], [0.73, -0.07], [0.29, 2.17], [2.15, 2.27]],0))
l2 = bezier(addYValue([[2.15, 0.17], [1.05, -0.03], [0.36, 1.98], [2.15, 2.19]],0.2))
l3 = bezier(addYValue([[2.15, 0.25], [1.1, 0.02], [0.53, 1.96], [2.15, 2.07]],0))
l4 = bezier(addYValue([[2.15, 0.17], [1.05, -0.03], [0.36, 1.98], [2.15, 2.19]],-0.2))

left_steering_wheel = BEZIER(S2)([l1,l2,l3,l4,l1])

############ mapping ############
left_steering_wheel = MAP(left_steering_wheel)(dom2D)
right_steering_wheel = MAP(right_steering_wheel)(dom2D)

#################################



########### center ##############
centercurve1_1 = bezier(addYValue([[1, 1.29], [2.18, 1.63], [2.67, 1.38], [3.13, 1.3]], 0.05))
centercurve2_1 = bezier(addYValue([[1, 0.96], [1.76, 1.03], [2.44, 1.06], [3.16, 0.99]], 0.05))
centercurve1_2 = bezier(addYValue([[1, 1.29], [2.18, 1.63], [2.67, 1.38], [3.13, 1.3]], -0.05))
centercurve2_2 = bezier(addYValue([[1, 0.96], [1.76, 1.03], [2.44, 1.06], [3.16, 0.99]], -0.05))

central_piece_1_1 = BEZIER(S2)([centercurve1_1, centercurve2_1])
central_piece_1_2 = BEZIER(S2)([centercurve2_1, centercurve2_2])
central_piece_1_3 = BEZIER(S2)([centercurve2_2, centercurve1_2])
central_piece_1_4 = BEZIER(S2)([centercurve1_2, centercurve1_1])

central_piece_1_1 = MAP(central_piece_1_1)(dom2D)
central_piece_1_2 = MAP(central_piece_1_2)(dom2D)
central_piece_1_3 = MAP(central_piece_1_3)(dom2D)
central_piece_1_4 = MAP(central_piece_1_4)(dom2D)
central_piece_1 = STRUCT([central_piece_1_1,central_piece_1_2,central_piece_1_3,central_piece_1_4])
###
centercurvesxdx_1 = bezier(addYValue([[1.33, 1.06], [1.51, 0.37], [1.81, 0.68], [1.72, 0.17]], 0.05))
centercurvesxdx_2 = bezier(addYValue([[2.89, 1.06], [2.83, 0.5], [2.23, 0.64], [2.36, 0.20]], 0.05))
centercurvesxdx_3 = bezier(addYValue([[1.33, 1.06], [1.51, 0.37], [1.81, 0.68], [1.72, 0.17]], -0.05))
centercurvesxdx_4 = bezier(addYValue([[2.89, 1.06], [2.83, 0.5], [2.23, 0.64], [2.36, 0.20]], -0.05))

central_piece_2_1 = BEZIER(S2)([centercurvesxdx_2, centercurvesxdx_1])
central_piece_2_2 = BEZIER(S2)([centercurvesxdx_1, centercurvesxdx_3])
central_piece_2_3 = BEZIER(S2)([centercurvesxdx_3, centercurvesxdx_4])
central_piece_2_4 = BEZIER(S2)([centercurvesxdx_4, centercurvesxdx_2])

central_piece_2_1 = MAP(central_piece_2_1)(dom2D)
central_piece_2_2 = MAP(central_piece_2_2)(dom2D)
central_piece_2_3 = MAP(central_piece_2_3)(dom2D)
central_piece_2_4 = MAP(central_piece_2_4)(dom2D)
central_piece_2 = STRUCT([central_piece_2_1,central_piece_2_2,central_piece_2_3,central_piece_2_4])

###details

clacson1 = bezier(addYValue([[1.87, 0.61], [1.77, 0.71], [1.37, 1.16], [1.73, 1.48]], 0))
clacson2 = bezier(addYValue([[1.94, 0.61], [1.98, 0.82], [1.37, 1.16], [1.9, 1.5]], -0.15))
clacson3 = bezier(addYValue([[2.19, 0.61], [2.3, 0.79], [2.61, 1.27], [2.27, 1.5]], -0.15))
clacson4 = bezier(addYValue([[2.3, 0.61], [2.39, 0.77], [2.91, 1.31], [2.38, 1.48]], 0))

clacson = BEZIER(S2)([clacson1,clacson2,clacson3,clacson4])
clacson = MAP(clacson)(dom2D)

startButton1 = bezier(addYValue([[1.68, 0.57], [1.83, 0.72], [1.67, 0.74], [1.64, 0.74]], -0.15))
startButton2 = bezier(addYValue([[1.68, 0.62], [1.65, 0.7]], -0.20))
startButton3 = bezier(addYValue([[1.68, 0.57], [1.51, 0.62], [1.61, 0.72], [1.64, 0.74]], -0.15))
startButton = BEZIER(S2)([startButton1, startButton2,startButton3])
startButton = MAP(startButton)(dom2D)

steering_wheel = STRUCT([COLOR([0,0,0])(right_steering_wheel), COLOR([0,0,0])(left_steering_wheel), central_piece_1, central_piece_2, clacson, COLOR([1,0,0])(startButton)])
steering_wheel = R([1,2])(PI/2)(steering_wheel)
steering_wheel = S([1,2,3])([0.4,0.4,0.4])(steering_wheel)
steering_wheel = T([1,2,3])([7.1, 0.6, 0.9])(steering_wheel)
steering_wheel = R([1,3])(PI/20)(steering_wheel)
profiles.append(steering_wheel)


#from exercise4 import*
######################################################################
############################ESERCIZIO 5###############################
######################################################################

laterale1 = bezier(addYValue([[0.84, 1.16], [3.7, 3.4], [3.18, 0.48], [8.1, 0.65]], 0))
laterale2 = bezier(addYValue([[1.32, 1.88], [3.71, 2.76], [4.51, 1.9], [8.3, 2.27]],0))
laterale3 = bezier(addYValue([[1.46, 1.99], [3.71, 2.76], [4.49, 1.98], [5.92, 2.28]],0.1))

laterale3_1 = bezier(addYValue([[0.84, 1.16], [3.7, 3.4], [4.49, 1.98], [5.92, 2.28]],0.6))

centrale1 = bezier(addYValue([[1.11, 1.72], [3.79, 2.96], [4.46, 2.01], [5.26, 2.37]],2.5))

laterale3_2 = bezier(addYValue([[0.84, 1.16], [3.7, 3.4], [4.49, 1.98], [5.92, 2.28]],3.2))
laterale4 = bezier(addYValue([[1.46, 1.99], [3.71, 2.76], [4.49, 1.98], [5.92, 2.28]],3.8))
laterale5 = bezier(addYValue([[1.32, 1.88], [3.71, 2.76], [4.51, 1.9], [8.3, 2.27]],3.8))
laterale6 = bezier(addYValue([[0.84, 1.16], [3.7, 3.4], [3.18, 0.48], [8.1, 0.65]], 3.9))

cofano_superficie = BEZIER(S2)([laterale1,laterale2,laterale3,laterale3_1,centrale1,laterale3_2,laterale4,laterale5,laterale6])
cofano_superficie = MAP(cofano_superficie)(dom2D)
cofano_superficie = COLOR([204/255.0,0,0])(cofano_superficie)

### parabrezza
parabrezza1 = bezier(addYValue([[7.83, 2.85], [7.69, 2.82], [7.53, 2.6], [7.28, 2.14]], 0))
parabrezza2 = bezier(addYValue([[6.65, 3.23], [6.4, 3.1], [6, 2.9], [5.68, 2.4]], 0.95))
parabrezza3 = bezier(addYValue([[6.65, 3.23], [6.4, 3.1], [6, 2.9], [5.68, 2.4]], 2.95))
parabrezza4 = bezier(addYValue([[7.83, 2.75], [7.69, 2.82], [7.53, 2.6], [7.28, 2.14]], 3.9))

parabrezza = BEZIER(S2)([parabrezza1,parabrezza2,parabrezza3,parabrezza4])
parabrezza = MAP(parabrezza)(dom2D)
parabrezza = T([1])([0.2])(parabrezza)
parabrezza = COLOR([0.69,1,1])(parabrezza)

### tettino e lunotto
tettino1 = bezier(addYValue([[8.24, 2.29], [9.02, 2.79], [10.2, 2.63], [12.03, 2.19]], 0))
tettino2 = bezier(addYValue([[8.52, 3.13], [9.07, 3.09], [10.2, 2.63], [12.03, 2.19]], 0.1))
tettino3 = bezier(addYValue([[6.68, 3.35], [6.77, 3.13], [9.01, 3.51], [12.21, 2.33]], 0.2))
tettinoCentrale = bezier(addYValue([[6.64, 3.37], [7.19, 3.57], [9.02, 3.66], [12.21, 2.33]], 1.95))
tettino4 = bezier(addYValue([[6.68, 3.35], [6.77, 3.13], [9.01, 3.51], [12.21, 2.33]], 3.7))
tettino5 = bezier(addYValue([[8.52, 3.13], [9.07, 3.09], [10.2, 2.63], [12.03, 2.19]], 3.8))
tettino6 = bezier(addYValue([[8.24, 2.29], [9.02, 2.79], [10.2, 2.63], [12.03, 2.19]], 3.9))

tettino = BEZIER(S2)([tettino1,tettino2,tettino3,tettinoCentrale,tettino4,tettino5,tettino6])
tettino = MAP(tettino)(dom2D)

## lunotto
lunotto1 = bezier(addYValue([[9.07, 3], [8.89, 3.1], [11.05, 2.64], [10.88, 2.6]],0))
lunotto2 = bezier(addYValue([[9.07, 3.32], [9.72, 3.4], [11.05, 3], [10.88, 2.82]],1.95))
lunotto3 = bezier(addYValue([[9.07, 3], [8.89, 3.1], [11.05, 2.64], [10.88, 2.6]],3.9))

lunotto = BEZIER(S2)([lunotto1, lunotto2, lunotto3])
lunotto = MAP(lunotto)(dom2D)
lunotto = S([1,2])([0.8,0.8])(lunotto)
lunotto = T([1,2])([1.9,0.4])(lunotto)
lunotto = R([1,3])(PI/120)(lunotto)
lunotto = COLOR([0.69,1,1])(lunotto)

##
tettino = T([3])([0.2])(tettino)
tettino = COLOR([204/255.0,0,0])(tettino)
superfici = STRUCT([parabrezza,cofano_superficie, tettino, lunotto])
superfici = S([2])([1.2])(superfici)
superfici = T([1,2,3])([-0.2,0.1,0.4])(superfici)
profiles.append(superfici)


pr2 = STRUCT(profiles)
profilesStruct = T([1,2,3])([-7.5,-2.45,-1.8])(pr2)
view([profilesStruct])
