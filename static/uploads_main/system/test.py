import cv2
import matplotlib.pyplot as plt
import physical
image = cv2.imread("system\\fog_test3.png")
modules = dir(physical)
i = 1
for mod in modules:
    if 'image' in mod:
        func = getattr(physical,mod)
        output = func(image)
        plt.subplot(2,2,i)
        plt.imshow(output)
        i += 1
plt.show()
