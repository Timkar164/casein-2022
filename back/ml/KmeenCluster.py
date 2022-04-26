import os
import pickle
import time

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn import preprocessing
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

FILE_NAME = 'Prilozhenie_k_keysu_data.xls'
KMEEN_N = 3
changeColumns = ['Время движения час:мин:сек',
                 'Время работы двигателя, час:мин:сек',
                 'Время работы двигателя в движении, час:мин:сек',
                 'Время работы двигателя без движения, час:мин:сек',
                 'Время работы двигателя на холостом ходу, час:мин:сек',
                 'Время работы двигателя на нормальных оборотах, час:мин:сек',
                 'Время работы двигателя на предельных оборотах, час:мин:сек',
                 'Время с выключенным двигателем, час:мин:сек',
                 'Время работы двигателя под нагрузкой, час:мин:сек']
set0 = ['Начальный объём, л.1', 'Конечный объём, л.1', 'Пробег, км']


def conv(t):
    t = str(t)
    t = t.split(':')
    for i in range(len(t)):
        t[i] = int(t[i])
    return (t[0] * 3600 + t[1] * 60 + t[2]) / (24 * 60 * 60)


def normalise_df(df, changeColumns=changeColumns, set0=set0):
    for i in changeColumns:
        df[i] = df[i].fillna('00:00:00')
        df[i] = df[i].apply(lambda x: conv(x))
        x_array = np.array(df[i])
        normalized_arr = preprocessing.normalize([x_array])
        df[i] = pd.Series(normalized_arr[0])
    for i in set0:
        df[i] = df[i].fillna(0)
        x_array = np.array(df[i])
        normalized_arr = preprocessing.normalize([x_array])
        df[i] = pd.Series(normalized_arr[0])
    return df


def return_cluster_model(FILE_NAME, KMEEN_N, changeColumns=changeColumns, set0=set0, save=False):
    df = normalise_df(FILE_NAME, changeColumns, set0)
    tech = df['id'].unique()
    techData = []
    X = []
    for i in tech:
        X.append(np.array(df[df['id'] == i].drop(['id', 'Дата'], axis=1)).transpose())
    X = np.array(X)
    kmeans = KMeans(init="random",
                    n_clusters=KMEEN_N,
                    n_init=10,
                    max_iter=300,
                    random_state=42)

    nsamples, nx, ny = X.shape
    print(nx)
    print(ny)
    print(nsamples)
    d2_train_dataset = X.reshape((nsamples, nx * ny))
    kmeans.fit(d2_train_dataset)
    # print(kmeans.inertia_)
    # kmeans.cluster_centers_
    # print(kmeans.labels_)
    if save:
        pkl_filename = "models/pickle_model_" + str(int(time.time())) + ".pkl"
        with open(pkl_filename, 'wb') as file:
            pickle.dump(kmeans, file)
        return pkl_filename, kmeans, tech
    else:
        return '', kmeans, tech


def predict(model, df, _id, normal=True):
    if normal:
        df = normalise_df(df)
    X = []
    X.append(np.array(df[df['id'] == _id].drop(['id', 'Дата'], axis=1)).transpose())
    X = np.array(X)
    Y = model.predict(X.reshape((1, 360)))
    return Y


def predict_arr(model, df, _ids, normal=True):
    if normal:
        df = normalise_df(df)
    X = []
    for i in _ids:
        X.append(np.array(df[df['id'] == i].drop(['id', 'Дата'], axis=1)).transpose())
    X = np.array(X)
    nsamples, nx, ny = X.shape
    Y = model.predict(X.reshape((nsamples, nx * ny)))
    return Y
