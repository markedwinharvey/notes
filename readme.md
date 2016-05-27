![notes graphic](https://github.com/markedwinharvey/notes/blob/master/media/notes_graphic1.png)

<h4>notes</h4>

<b>notes</b> is a note-taking/book-marking program designed to organize internet links for future use. 

Each url that is added to `notes` is called from the `requests` module loaded in `notes.py`. 

The data is extracted and sent to `notes_db.py`, where the data is saved in a mysql database called `notes_db`,
via the `MySQLdb` python module. The html gui is updated via ajax to reflect links organized by the selected folder. 

The `open` button opens each link in a new window. 

The program is started by navigating to the appropriate directory and typing `python start.py`. A localhost 
server then displays the `notes` page. 