install postgress
start it
update the .env to DATABASE_URL=postgres://myuser:mypassword@localhost:5432/mydb

change myuser, mypassword, mydb to your own values

start by npm i
then node src/server.js

for adding new routes:
add the route in the routes folder
add the controller in the controllers folder
add the route in the src/server.js file


to add hashes to the database:
use test.js file to generate the hashes