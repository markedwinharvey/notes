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
		headers = {
			#'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:43.0) Gecko/20100101 Firefox/43.0',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36',
			'accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'accept-language' : 'en-US,en;q=0.5',
			'dnt' : '1'
		}	
		try:
			r=requests.get(data['url'])
		except:
			return 'Invalid url'	
		new_page = gen_page_obj(data,r)
		print notes_db.main('add_note',new_page)	#return response msg from notes_db.py
	
	elif data['py_msg'] == 'get_data':
		db_data = notes_db.main('get_data',None)
		print json.dumps(db_data)
		
if __name__ == '__main__':
	main()