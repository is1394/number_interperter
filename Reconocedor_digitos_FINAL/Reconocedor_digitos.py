from __future__ import division, print_function, unicode_literals
import tensorflow as tf
import numpy as np

# Common imports

import os
import sys

# For image preprocessing
from scipy import misc
from .img2MNIST import imageprepare


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


def reset_graph(seed=42):
    tf.reset_default_graph()
    tf.set_random_seed(seed)
    np.random.seed(seed)


def neuron_layer(X, n_neurons, name, activation=None):
    with tf.name_scope(name):
        n_inputs = int(X.get_shape()[1])
        stddev = 2 / np.sqrt(n_inputs)
        init = tf.truncated_normal((n_inputs, n_neurons), stddev=stddev)
        W = tf.Variable(init, name="kernel")
        b = tf.Variable(tf.zeros([n_neurons]), name="bias")
        Z = tf.matmul(X, W) + b
        if activation is not None:
            return activation(Z)
        else:
            return Z


def predictint(imvalue):

    n_inputs = 28 * 28
    n_hidden1 = 532
    n_hidden2 = 532
    n_outputs = 10

    reset_graph()

    X = tf.placeholder(tf.float32, shape=(None, n_inputs), name="X")
    y = tf.placeholder(tf.int64, shape=(None), name="y")

    with tf.name_scope("dnn"):
        hidden1 = neuron_layer(X, n_hidden1, name="hidden1",
                               activation=tf.nn.relu)
        hidden2 = neuron_layer(hidden1, n_hidden2, name="hidden2",
                               activation=tf.nn.relu)
        logits = neuron_layer(hidden2, n_outputs, name="outputs")

    with tf.name_scope("loss"):
        xentropy = tf.nn.sparse_softmax_cross_entropy_with_logits(labels=y,
                                                                  logits=logits)
        loss = tf.reduce_mean(xentropy, name="loss")

    learning_rate = 0.01

    with tf.name_scope("train"):
        optimizer = tf.train.GradientDescentOptimizer(learning_rate)
        training_op = optimizer.minimize(loss)

    with tf.name_scope("eval"):
        correct = tf.nn.in_top_k(logits, y, 1)
        accuracy = tf.reduce_mean(tf.cast(correct, tf.float32))

    init_op = tf.global_variables_initializer()
    saver = tf.train.Saver()

    with tf.Session() as sess:
        sess.run(init_op)
        saver.restore(sess, "Reconocedor_digitos_FINAL/red_neuronal_entrenada.ckpt")
    #print ("Model restored.")
        prediction = tf.argmax(logits, 1)
        return prediction.eval(feed_dict={X: [imvalue]}, session=sess)

def evalue(data):
    imvalue = imageprepare(data)
    return predictint(imvalue)

# predint = predictint(imvalue)
# print(predint)
# print('The predicted digit for the image is: ' + str(predint[0]))
