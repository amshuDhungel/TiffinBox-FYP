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


![Screenshot 2024-04-20 084749](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/cb712540-f2cb-4eb9-a995-af83b1fcd10c)

![Screenshot 2024-04-20 084852](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/6cbe6a70-01c0-4400-941d-721e0955ce0d)

![Screenshot 2024-04-20 094735](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/214773a6-c68b-416c-b943-e70c7f021a7d)

![Screenshot 2024-04-20 095436](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/0e6a20f5-5a10-4267-b73a-01b364e8dd7e)

![Screenshot 2024-04-20 095922](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/d5565074-d596-4f77-b341-f60d04ae0028)

![Screenshot 2024-04-20 100011](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/6e0a2916-f3f5-454a-80b9-4589d747a87e)

![Screenshot 2024-04-20 101305](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/906ffd77-8301-46dd-a5e0-67934994c1e0)




