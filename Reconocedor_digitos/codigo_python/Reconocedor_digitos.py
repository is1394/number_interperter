import network2
from scipy import misc
import img2MNIST
import mnist_loader
import sys
import numpy as np
import matplotlib.pylab as plt
import cv2

red_neuronal = network2.load('red_neuronal_entrenada')

#Hacemos la prueba con la imagen que se ingresa como argumento del programa
imagen = misc.imread(str(sys.argv[1]),flatten=True,mode='L')
imagen_MNIST = img2MNIST.imageprepare(str(sys.argv[1]))
respuesta = red_neuronal.feedforward(imagen_MNIST)
print 'Respuesta: ' + str(respuesta)
'''
from sklearn.preprocessing import OneHotEncoder
enc = OneHotEncoder()
enc.fit(respuesta)
'''






	
