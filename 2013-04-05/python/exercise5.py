from exercise4 import *

### Exercise 5 
max = 0.56
min = 0.55

step2D = MKPOL([[[0,0],[0,min],[max,min/2],[max,min]],[[1,2,3,4]],None])
step3D = PROD([step2D,Q(0.99)])
step3D = MAP([S1,S3,S2])(step3D)
ramp = STRUCT(NN(13)(([step3D,T([1,3])([massimo,minimo/2])])))
stair1 = T([1,2,3])([1.3,7.59+0.30,0.0])(ramp)

ramp2 = STRUCT(NN(13)(([step3D,T([1,3])([massimo,minimo/2])])))
stair2 = T([1,2,3])([0,7.59+0.18,3.40+0.12])(ramp2)

max = 0.55
min = 0.54
ramp3 = STRUCT(NN(12)(([step3D,T([1,3])([max,min/1.79])])))
stair3 = T([1,2,3])([7.2,7.65,3.58*2])(ramp3)
