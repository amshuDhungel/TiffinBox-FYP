Project Features Include
-------------------------
Registration and Login
Authentication and Authorization
Validation
Update, Create, Delete Post
Like and unlike the post
View who like the post.
Profile visit
Profile Management
Food Order from user directly with another user.
Direct payment to the user.
Delete Profile
Update Password
Update Profile
Bookmark user
LogOut

How to RUN THE CODE
server folder
-------------
go to server directory
type "npm install or npm i"
create .env file on server directory. Add
MONGO_DB_URI = //YOUR DATABASE
JWT_SECRET = //WRITE RANDOM LONG WORD

Go to controller/post.js file
cloudinary.config({
  cloud_name: "YOUR_CLOUDINARY_NAME",
  api_key: CLOUDINARY_API,
  api_secret: "CLOUDINARY_SECRET",
});

After this, run inside server directory
"nodemon server.js" 
Server side runs

on client folder
----------------
open another terminal and go to client directory
type "npm install"
type "npm run dev" to run client side


Note: It will take little time if you are opening for the first time. Since it is nextjs.
some seconds to compile and run. Same case if you are redirecting to another page or doing
any activities. So wait at least for some second. It only happen when you first time run the
program. It won't happen after that. 

You need to refresh the page after Bookmark, and No Bookmark if you visit other people profile.


