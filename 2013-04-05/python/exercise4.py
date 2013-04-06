from exercise1 import *
from exercise2 import *
from exercise3 import *

window1 = CUBOID([2,0.3,0.8])
VIEW(window1)

window1 = S([1,3])([1.35,1.35])(window1)
window1 = COLOR([0,0,0])(T([1,3])([5.8,3.96])(window1))

window2 = T([3])([2.55])(window1)
window3 = T([3])([2.55])(window2)

building = STRUCT([building, window1, window2,window3])

VIEW(building)
