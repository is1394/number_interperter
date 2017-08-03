import network2
import mnist_loader
import sys
import img2MNIST
from scipy import misc
import numpy as np

#Carga los datos de entrenamiento
training_data, validation_data, test_data = mnist_loader.load_data_wrapper()

#Creamos uno red neuronal de 30 hidden units, con 784 units en el input layer(784 pixeles por image)

#	Y 10 units en el output layer (0-9)
#
print 'Creando red neuronal...'
red_neuronal = network2.Network([784, 30, 10])
print 'Red neuronal creada'
print 'Iniciando los weights y biases...'
red_neuronal.large_weight_initializer()
print 'Weights y biases iniciados'

#Se ejecuta el SGD para entrenar la red


print 'Ejecutando el algoritmo SGD para entrenar la red neuronal...'
#red_neuronal.SGD(training_data, 30, 10, 3.0, test_data=test_data)
red_neuronal.SGD(training_data, 30, 10, 3.0)
print 'Fin del entrenamiento.'

#Guardamos la red neuronal en un archivo json
red_neuronal.save('red_neuronal_entrenada')
