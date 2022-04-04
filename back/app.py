# -*- coding: utf-8 -*-
"""
Created on Thu Mar 31 14:44:14 2022

@author: pitonhik
"""

from flask import Flask
from flask_cors import CORS
from flask import request
from flask import Flask, flash, request, redirect
from werkzeug.utils import secure_filename
import pandas as pd
import numpy as np
import os
from ml import KmeenCluster as ml

CLUSTER_N = 4
LASTFILE = 'Prilozhenie_k_keysu_data.xls'
def getvalidfile():
    global LASTFILE
    try:
     df = pd.read_excel('load/'+LASTFILE)
     return df
    except:
     df = pd.read_excel('Prilozhenie_k_keysu_data.xls')
     return df
def conv(t,HMS):
   t = str(t)
   t=t.split(':')
   for i in range(len(t)):
        t[i]=int(t[i])
   return (t[0]*3600+t[1]*60+t[2])/HMS

changeColumns = ['Время движения час:мин:сек',
       'Время работы двигателя, час:мин:сек',
       'Время работы двигателя в движении, час:мин:сек',
       'Время работы двигателя без движения, час:мин:сек',
       'Время работы двигателя на холостом ходу, час:мин:сек',
       'Время работы двигателя на нормальных оборотах, час:мин:сек',
       'Время работы двигателя на предельных оборотах, час:мин:сек',
       'Время с выключенным двигателем, час:мин:сек',
       'Время работы двигателя под нагрузкой, час:мин:сек']
def time_conv(df,HMS):
    global changeColumns
    for i in changeColumns:
        df[i] = df[i].fillna('00:00:00')
        df[i] = df[i].apply(lambda x: conv(x,HMS))
    return df

def conv_number(df):
    set0 = ['Начальный объём, л.1', 'Конечный объём, л.1','Пробег, км']
    for i in set0:
        df[i] = df[i].fillna(0)
    return df

def main_conv(df,HMS):
    df=time_conv(df,HMS)
    df=conv_number(df)
    df['Средняя скорость'] = df.apply(lambda x: rule(x['Пробег, км'], x['Время движения час:мин:сек']), axis =  1)
    return df

def rule(x,y):
    x = float(x)
    y=float(y)
    if y==0:
        return 0
    return x/y
'''
 with open(pkl_filename, 'rb') as file: 
 pickle_model = pickle.load(file)
 pickle_model.predict(Xtest) 

 '''
 



def get_tech_info(_id,label=None):
   df = getvalidfile()
   df=df[df['id']==int(_id)]
   timeX = list(df['Дата'])
   df=df.drop(['id', 'Дата'], axis=1)
   df=main_conv(df,3600)
   if label:
       Y = list(df[label])
       return {'time':timeX,'labels':[{'name':label,'array':Y}]}
   else:
       labels=[]
       for i in list(df.columns):
           labels.append({'name':i,'array':list(df[i])})
       return {'time':timeX,'labels':labels}

def get_data_info(_data,label=None):
    df = getvalidfile()
    df=df[df['Дата']==_data]
    timeX = list(df['id'])
    df=df.drop(['id', 'Дата'], axis=1)
    df=main_conv(df,3600)
    if label:
        Y = list(df[label])
        return {'time':timeX,'labels':[{'name':label,'array':Y}]}
    else:
       labels=[]
       for i in list(df.columns):
           labels.append({'name':i,'array':list(df[i])})
       return {'time':timeX,'labels':labels}


    

def get_nowork(label=None):
    global changeColumns
    df = getvalidfile()
    df=main_conv(df,3600)
    data=list(df['Дата'].unique())
    tech =list(df['id'].unique())
    res =[]
    if label:
     for i in data:
         d = df[df['Дата']==i]
         res.append(len(d[d[label]==0]))
    else:
      for i in data:
         d = df[df['Дата']==i]
         for j in changeColumns:
             d=d[d[j]==0]
         res.append(len(d))
    return {'time':data,'labels':res}
        
n , k , t = ml.return_cluster_model(getvalidfile(),int(CLUSTER_N))


app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'load'

@app.route("/getoil", methods=["POST", "GET"])
def get_oil_api():
    df = getvalidfile()
    df=main_conv(df,3600)
    df=df[df['id']==734]
    
    def ruleoil(x,y):
        res = x-y
        if res >0:
         return res
        else:
         return 0
    df['oil'] = df.apply(lambda x: ruleoil(x['Начальный объём, л.1'], x['Конечный объём, л.1']), axis =  1)
    dfnew = pd.DataFrame(columns = ['Дата', 'oil'])
    dfnew['Дата'] = df['Дата']
    dfnew['oil'] = df['oil']
    return {'time':list(dfnew['Дата']),'labels':list(dfnew['oil'])}


@app.route("/getnowork", methods=["POST", "GET"])
def getnowork_api():
    args = request.args
    if 'label' in args.keys():
        return get_nowork(label=args['label'])
    else:
      return get_nowork()

@app.route("/getdata", methods=["POST", "GET"])
def getdata_api():
    args = request.args
    if 'label' in args.keys():
        return get_data_info(args['data'],label=args['label'])
    else:
     return get_data_info(args['data'])

@app.route("/getinfo", methods=["POST", "GET"])
def getinfo_api():
    args = request.args
    if 'label' in args.keys():
     return get_tech_info(args['id'],label=args['label'])
    else:
     print(args['id'])
     return get_tech_info(args['id'])

@app.route("/getcolum", methods=["POST", "GET"])
def get_columns_api():
    df = getvalidfile()
    return {'items':list(df.columns)+['Средняя скорость']}


@app.route("/files", methods=["POST", "GET"])
def indexfile_api():
    global n
    global k
    global t
    global LASTFILE
    if request.method == "POST":
     upload_files = request.files.getlist('fileUpload')
     for file in upload_files:
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            LASTFILE = filename
            n , k , t = ml.return_cluster_model(getvalidfile(),int(CLUSTER_N))
            print(filename)
            
    return {'response': True}

@app.route("/lenclusters", methods=["POST", "GET"])
def cluster_api():
    global CLUSTER_N
    global n
    global k
    global t
    if request.method == "GET":
     args = request.args
     if 'len' in args:
         CLUSTER_N = int(args['len'])
         n , k , t = ml.return_cluster_model(getvalidfile(),int(CLUSTER_N))
         return {'response': True}
    return {'response': False}

@app.route("/gettech", methods=["POST", "GET"])
def tech_api():
    if request.method == "GET":
     df = getvalidfile()
     res = list(df['id'].unique())
     for i in range(len(res)):
         res[i]=int(res[i])
     return {'response': True,'items': res}
    else:
     return {'response': False,'items': res}


@app.route("/getdays", methods=["POST", "GET"])
def data_api():
    if request.method == "GET":
     print('/--')
     df = getvalidfile()
     res = list(df['Дата'].unique())
     for i in range(len(res)):
         res[i]=str(res[i])
     return {'response': True,'items': res}
    else:
     return {'response': False,'items': res}

funcs = {'Cреднее значение':'mean','Медиана':'median','Сумма':'sum'}
r = ''
@app.route("/getinfoagr", methods=["POST", "GET"])
def getinfoagr():
    global funcs
    global CLUSTER_N
    global n
    global k
    global t
    func = funcs[str(request.args['func'])]
    colum = str(request.args['colum'])
    cluster = str(request.args['cluster'])
    _id = []
    print(k.labels_)
    print(cluster)
    if cluster!='Все':
       cluster = int(cluster)
       for i in range(len(k.labels_)):
           if k.labels_[i]==cluster-1:
               _id.append(t[i])
               
    df = getvalidfile()
    df=main_conv(df,3600)
    if _id:
        df_filt = df['id'].isin(_id)
        df = df[df_filt]
    res = list(df['Дата'].unique())
    try:
     if max(k.labels_)<cluster-1:
        return {'response': True,'items': {'time':res,'label':[]}}
    except:
        True
    label = []
    for i in res:
      df1 = df[df['Дата']==i]
      df1 = df1[colum].agg([func])[func]
      label.append(float(int(df1*100))/100)
    return {'response': True,'items': {'time':res,'label':label}}

@app.route("/getclusterinfo", methods=["POST", "GET"])
def get_clusters_len():
    global n
    global k
    global t
    clusters = set(k.labels_)
    res = {}
    for i in clusters:
        res[str(i)]=0
        for j in k.labels_:
            if str(i)==str(j):
                res[str(i)]=res[str(i)]+1
    time = []
    label = []
    for i in res.keys():
        time.append('Кластер '+i)
        label.append(res[str(i)])
    return {'time':time,'label':label}

@app.route("/getclusterid", methods=["POST", "GET"])
def get_clusters_id():
    global n
    global k
    global t
    lenght = len(set(k.labels_))
    res = []
    for i in range(len(k.labels_)):
        res.append({'id':int(t[i]),'class':int(k.labels_[i])})
    return {'items':res,'len':int(lenght)}
if __name__ == '__main__':
    app.run()