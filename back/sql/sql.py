# -*- coding: utf-8 -*-
"""
Created on Sat Apr 10 14:56:15 2021

@author: timka
"""
import psycopg2
from psycopg2.extras import DictCursor , RealDictCursor
from psycopg2.errors import UndefinedColumn
import time

def get_bd():
    #host = "db"
    host = 'ec2-54-80-122-11.compute-1.amazonaws.com'
    database = "d5m98l318v02ng"
    user = "zttlwbeldcuiey"
    port = 5432
    password = "da93f40e89acb9f71a3869629ba68cf37ad50f56c298f1b6d70775e63e591705"
    return host , port , database , user , password



def sql_delet(table_name,param):
    host , port , database , user, password = get_bd()
    conn = psycopg2.connect(dbname=database, user=user, 
                        password=password, host=host)
    cursor = conn.cursor(cursor_factory=DictCursor)
    delet = "DELETE FROM "+str(table_name)+" WHERE id ="+str(param['id'])
    print(cursor.execute(delet))
    conn.commit()
    conn.close()
    cursor.close()
    return {'response':True}
   

def sql_insert(table_name,param):
   host , port , database , user, password = get_bd()
   param = param_insert(param)
   conn = psycopg2.connect(dbname=database, user=user, 
                        password=password, host=host)
   cursor = conn.cursor(cursor_factory=DictCursor)
   insertstr = "INSERT INTO "+str(table_name)+" "+str(param[0])+" VALUES "+str(param[1]) + " RETURNING id"
   cursor.execute(insertstr)
   _id = cursor.fetchone()[0]
   conn.commit()
   conn.close()
   cursor.close()
   return {'response':True,'id':str(_id)}
 
def sql_update(table_name,param):
   host , port , database , user, password = get_bd()
   param = param_update(param)
   if param['id']:
    conn = psycopg2.connect(dbname=database, user=user, 
                        password=password, host=host)
    cursor = conn.cursor(cursor_factory=DictCursor)
    update = "UPDATE "+str(table_name)+" SET "+str(param['colum'])+"  WHERE id ="+str(param['id'])
    cursor.execute(update)
    conn.commit()
    conn.close()
    cursor.close()
    return {'response':True}
   else:
       return {'response':False,'items': 'error id'}

def sql_select(table_name,param):
   host , port , database , user, password = get_bd()
   param = param_select(param)
   conn = psycopg2.connect(dbname=database, user=user, 
                        password=password, host=host)
   cursor = conn.cursor(cursor_factory=RealDictCursor)
   try:
    if param:
     cursor.execute('SELECT * FROM '+str(table_name)+' WHERE '+str(param))
    else:
     cursor.execute('SELECT * FROM '+str(table_name))
    records = cursor.fetchall()
    for i in range(len(records)):
        records[i]=dict(records[i])
    conn.close()
    cursor.close()
    return {'response':True, 'items':records}
   except UndefinedColumn:
     conn.close()
     cursor.close()
     return {'response':False,'items':'error colum'}

def sql_select_srt(table_name,bd_num,key,name):
   host , port , database , user, password = get_bd()
   conn = psycopg2.connect(dbname=database, user=user, 
                        password=password, host=host)
   cursor = conn.cursor(cursor_factory=RealDictCursor)
   try:
    cursor.execute("SELECT * FROM "+str(table_name)+" WHERE "+str(key)+" LIKE '%" + str(name) +"%'")
    records = cursor.fetchall()
    for i in range(len(records)):
        records[i]=dict(records[i])
    conn.close()
    cursor.close()
    return {'response':True, 'items':records}
   except UndefinedColumn:
     conn.close()
     cursor.close()
     return {'response':False,'items':'error colum'}

def sql_select_all(table_name,param):
   rezult = []
   param = param_select(param)
   for i in range(1,4):
       host , port , database , user, password = get_bd()
       conn = psycopg2.connect(dbname=database, user=user, 
                        password=password, host=host)
       cursor = conn.cursor(cursor_factory=RealDictCursor)
       try:
          if param:
               cursor.execute('SELECT * FROM '+str(table_name)+' WHERE '+str(param))
          else:
               cursor.execute('SELECT * FROM '+str(table_name))
          records = cursor.fetchall()
          for i in range(len(records)):
               records[i]=dict(records[i])
          conn.close()
          cursor.close()
          rezult+=records
       except UndefinedColumn:
          conn.close()
          cursor.close()
          return {'response':False,'items':'error colum'}
   return  {'response':True, 'items':rezult}

def sql(response, type):
       host , port , database , user, password =get_bd()
       conn = psycopg2.connect(dbname=database, user=user,
                               password=password, host=host)
       cursor = conn.cursor(cursor_factory=DictCursor)
       cursor.execute(response)
       if type == 'select':
           records = cursor.fetchall()
           for i in range(len(records)):
               records[i] = dict(records[i])
       elif type == 'insert':
           _id = cursor.fetchone()[0]
           conn.commit()
       conn.close()
       cursor.close()
       if type == 'select':
           return {'response': True, 'items': records}
       elif type == 'insert':
           return {'response': True, 'id': str(_id)}
    
def param_update(param):
    _id=None
    keys = list(param.keys())
    colum=' '
    for key in keys:
        if key=='id':
            _id=param[key]
        else:
            colum=colum+' '+str(key)+" = '" + str(param[key])+"' ,"
    colum=colum[:-1]
    return {'colum':colum,'id':_id}


def param_insert(param):
    keys = list(param.keys())
    colum=' ( '
    values = '('
    for key in keys:
        colum=colum+' '+str(key)+','
        values=values+" '"+str(param[key])+"',"
    values=values[:-1]
    values+=')'
    colum=colum[:-1]
    colum+=')'
    return colum , values
    

def param_select(param):
    condition =""
    keys = list(param.keys())
    for key in keys:
        param[key]=str(param[key])
        if ('[' and ']' in param[key]) or type(param[key])==list:
         param[key]=eval(param[key])
         condition= condition +'(' 
         for par in param[key]:
             condition=condition + str(key)+ ' = '
             condition=condition + "'"+str(par)+"'"+ ' OR '
         condition=condition[:-3]
         condition+=') AND '
         
        else:
            condition=condition+'( ' + str(key)+ ' = ' + "'" + str(param[key]) + "'" + ' ) AND '
    condition=condition[:-4]
    return condition


def get_bd_local():
    host = '194.67.91.225'
    database = "miriteam"
    user = "postgres"
    port = 5432
    password = "GF@kkjj!hdaskdh666879@gghs@@@sadadGGhac9osAlsfdf;aswmfsoHJWGHDP@@!jsl"
    return host , port , database , user , password

def sql_select_local(table_name,param):
   host , port , database , user, password = get_bd_local()
   param = param_select(param)
   conn = psycopg2.connect(dbname=database, user=user, 
                        password=password, host=host)
   cursor = conn.cursor(cursor_factory=RealDictCursor)
   try:
    if param:
     cursor.execute('SELECT * FROM '+str(table_name)+' WHERE '+str(param))
    else:
     cursor.execute('SELECT * FROM '+str(table_name))
    records = cursor.fetchall()
    for i in range(len(records)):
        records[i]=dict(records[i])
    conn.close()
    cursor.close()
    return {'response':True, 'items':records}
   except UndefinedColumn:
     conn.close()
     cursor.close()
     return {'response':False,'items':'error colum'}

INP ={'inp1':'Blockchain',
      'inp2':'IOT',
      'inp3':'ML',
      'inp4':'data science',
      'inp5':'пиар',
      'inp6':'AR XR VR',
      'inp7':'маркетинг',
      'inp8':'Трейдинг',
      'inp9':'Дизайн',
      'inp10':'Мобильная разработка',
      'inp11':'Web',
      'inp12':'Копирайт',
      'inp13':'Кибер безопасность',
      'inp14':'Робототехника',
      }

import pandas as pd
def get_excel(name):
    data = sql_select_local('userinfo',{})['items']
    data=sorted(data,key=lambda x: x['id'])
    for i in range(len(data)):
        if data[i]['interestedin']:
         interes = data[i]['interestedin'].split(',')
         res = ','.join(INP[X] for X in interes if X in INP.keys())
         data[i]['interestedin'] = res
    df = pd.DataFrame(data)
    df.to_csv(name,index=False,encoding='utf-8',sep=';')
    