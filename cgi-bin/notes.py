#!/usr/bin/env python 
import cgi,json,requests,time,subprocess
from datetime import datetime
from bs4 import BeautifulSoup as bs
import notes_db
print
#-------------------------
def gen_page_obj(data,r):	
	note = data['user_input']
	folder = data['folder']
	soup=bs(r.text,'html.parser')
	class page(object):
		def __init__(self):
			self.title 	= soup.title.string.replace("'","\\'").replace('"','\\"').replace('\n','').replace('\t','').lstrip()
			self.url 	= r.url
			self.note 	= note.replace("'","\\'").replace('"','\\"')
			self.folder	= folder
			self.time 	= str(datetime.now())
			self.epoch 	= str(time.time())
	return page()
#-------------------------
def main():
	data=cgi.FieldStorage()['package'].value
	data=json.loads(data)

	if data['py_msg'] == 'add_url':		
		try:
			r=requests.get(data['url'])
		except:
			return 'Invalid url'	
		new_page = gen_page_obj(data,r)
		db_data = notes_db.main('add_note',new_page)	#return response msg from notes_db.py
		print json.dumps(db_data)
	
	elif data['py_msg'] == 'get_data':
		db_data = notes_db.main('get_data',None)
		print json.dumps(db_data)
		
if __name__ == '__main__':
	main()