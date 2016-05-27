#!/usr/bin/env python
import subprocess
import MySQLdb
#-------------------------
def start_mysql():
	subprocess.call([' /usr/local/mysql/support-files/mysql.server start'],shell=True)	
#-------------------------
def get_db_cursor():
	db=MySQLdb.connect(	
		host	='localhost',
		user	='notes'	,
		passwd	='notes' 	
	)
	return db.cursor()
#-------------------------
def select_db(cur,db_name):
	try:
		cur.execute('USE '+db_name)
	except:
		cur.execute('CREATE DATABASE '+db_name)
		cur.execute('USE '+db_name)
	try:
		cur.execute('SELECT * FROM notes')
	except:
		cur.execute(
			'CREATE TABLE notes (			'+
					'id		VARCHAR(20),	'+
					'note 	VARCHAR(1000),	'+
					'title 	VARCHAR(1000), 	'+
					'url 	VARCHAR(1000), 	'+
					'folder	VARCHAR(100), 	'+
					'time 	VARCHAR(100), 	'+
					'epoch 	VARCHAR(100))	'
		)	
#-------------------------
def main(action, data):
	start_mysql()
	cur = get_db_cursor()
	select_db(cur,'notes_db')

	cur.execute('SELECT COUNT(*) from notes')
	rc = str(cur.fetchall())
	row_count = rc[2:rc.find('L')]	#row_count determines id_num for each entry
	
	if action == 'add_note':
		command = 'INSERT INTO notes (id,note,title,url,folder,time,epoch) VALUES ('
		command += '\''+row_count+'\',\''+data.note+'\',\''+data.title+'\',\''+data.url+'\',\''+data.folder+'\',\''+data.time+'\',\''+data.epoch+'\')'
		try:
			cur.execute(command)
			cur.execute('SELECT * FROM notes WHERE id = '+row_count)
			return {'msg':'New data added!','data': cur.fetchall()}
		except:
			return {'msg':'Error recording data!'}
	elif action == 'get_data':
		cur.execute('SELECT * FROM notes')
		return cur.fetchall()



			
if __name__ == '__main__':
	main()