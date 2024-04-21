Project Features Include
-------------------------
1. Registration and Login
2. Authentication and Authorization
3. Validation
4. Update, Create, Delete Post
5. Like and unlike the post
6. View who like the post.
7. Profile visit
8. Profile Management
9. Food Order from user directly with another user.
10. Direct payment to the user.
11. Delete Profile
12. Update Password
13. Update Profile
14. Bookmark user
15. LogOut

How to RUN THE CODE
server folder
-------------
go to server directory
type "npm install or npm i"
create .env file on server directory. Add

  MONGO_DB_URI = //YOUR DATABASE,
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


Note: It will take little time if you are opening for the first time. Also please refresh one time logging in. Since it is nextjs, It takes some seconds to compile and run. Same case if you are redirecting to another page or doing any activities. So wait at least for some second. It only happen when you first time run the program. It won't happen after that. You need to refresh the page after Bookmark, and No Bookmark if you visit other people profile.


![Screenshot 2024-04-20 084749](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/cb712540-f2cb-4eb9-a995-af83b1fcd10c)

![Screenshot 2024-04-20 084852](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/6cbe6a70-01c0-4400-941d-721e0955ce0d)

![Screenshot 2024-04-20 094735](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/214773a6-c68b-416c-b943-e70c7f021a7d)

![Screenshot 2024-04-20 095436](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/0e6a20f5-5a10-4267-b73a-01b364e8dd7e)

![Screenshot 2024-04-20 095922](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/d5565074-d596-4f77-b341-f60d04ae0028)

![Screenshot 2024-04-20 100011](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/6e0a2916-f3f5-454a-80b9-4589d747a87e)
![Screenshot 2024-04-20 101521](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/c873c320-ead7-47e5-9fc6-5da457d4f447)



![Screenshot 2024-04-20 101305](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/906ffd77-8301-46dd-a5e0-67934994c1e0)
![Screenshot 2024-04-20 122413](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/a5e6de0d-b175-429e-a383-335bbab6d326)


![Screenshot 2024-04-20 102112](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/ef951b05-f8db-4981-9b6c-382b4c65c357)
![image](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/065bbc4f-f022-4a58-8a12-d4bc19776f3c)

![Screenshot 2024-04-20 130106](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/ebb2c0d3-f34e-4af8-95fc-3222356388b2)

![Screenshot 2024-04-20 131125](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/5491187c-4ba3-473e-a5a0-c0c4d4dd5ed7)

![Screenshot 2024-04-20 131248](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/7a68e099-db9f-47b4-8b63-d60011bfec22)

![Screenshot 2024-04-20 132532](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/c2a3d8f1-31ea-413e-84e3-3543a9dd4ea6)
![Screenshot 2024-04-16 142837](https://github.com/amshuDhungel/TiffinBox-FYP/assets/96327878/789eec38-5a91-4632-a605-63051b0879fa)
