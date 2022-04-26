from sqlalchemy import *
import psycopg2
from psycopg2.extras import DictCursor



host = 'ec2-54-80-122-11.compute-1.amazonaws.com'
database = "d5m98l318v02ng"
user = "zttlwbeldcuiey"
port = 5432
password = "da93f40e89acb9f71a3869629ba68cf37ad50f56c298f1b6d70775e63e591705"

conn_str = f"postgresql://{user}:{password}@{host}/{database}"
engine = create_engine(conn_str)
connection = engine.connect()
metadata = MetaData()




t1 = Table('users', metadata,
   Column('id', Integer, primary_key=True),
   Column('login', Text, nullable=True),
   Column('pas', Text, nullable=True),
   Column('name', Text, nullable=True),
   Column('fname', Text, nullable=True),
   Column('oname', Text, nullable=True),
   Column('type', Text, nullable=True),
    Column('lastfile', Text, nullable=True))

t3 = Table('tech', metadata,
   Column('id', Integer, primary_key=True),
   Column('img', Text, nullable=True),
   Column('name', Text, nullable=True),
   Column('stat', Text, nullable=True),
   Column('userid', Text, nullable=True),
   Column('hering', Text, nullable=True))

t2 = Table('task', metadata,
   Column('id', Integer, primary_key=True),
   Column('userid', Text, nullable=True),
   Column('techid', Text, nullable=True),
   Column('date', Text, nullable=True),
   Column('text', Text, nullable=True),
   Column('stat', Text, nullable=True))

metadata.create_all(engine)


