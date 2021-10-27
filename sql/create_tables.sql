-- -- create user table 
-- -- create schedule table

-- Your 'users' table will have the following fields: 

-- A unique key (ID),
-- A surname,
-- A first name,
-- An email address (will be used to log in),
-- A password (will be used to log in),
 

-- Your ’schedules' table will have the following fields: 

-- A unique key (ID),
-- An ID_user (will be a reference to an ID of the users table),
-- the day of the week (1 for Monday, 2 for Tuesday... 7 for Sunday),
-- a start time (TIME type)
-- an end time (TIME type).
 

-- Now that your DB is ready, you are going to create a first user via the MySQL console, to be able to set up the connection logic. Don't forget to hash the password.

 

-- 💡 SQL: Left Join, Foreign Key