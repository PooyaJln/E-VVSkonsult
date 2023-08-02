# E-VVSkonsult
This project is a proof-of-concept for calculating building heat load during cold period of the year.

Under backend folder you find A REST API that is developed using nodeJS, ExpressJS, MySQL and Sequelize ORM.
Under frontend folder is the code for UI which is developed using React.
I used simple HTML and CSS and Material UI for error dialog.

The idea is that a user first have to create a project.

A project can have one or several buildings.

A building can have one or several floors.

A floor has one or several apartments.

An apartment have one or several rooms.

A room has several boundaries which includes walls, floor, ceiling and windows.

user can create, update and delete all of above-mentioned objects and app provides the results at the end.

Right now the code can calculate a room's heat loss by summing all heat losses of walls and windows in that room.
In the future it will be completed with features like copying all of objects to make the process faster.

At the moment I'm working on error handling and input check to give users a better feedback. 

