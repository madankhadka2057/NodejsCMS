const express = require("express");
const session = require('express-session');// for flash error message
const flash=require('connect-flash')
const { blogs, sequelize } = require("./model/index");//its used in controller now
//!its use when we dont us route now its used in routes
// const {
//   renderCreateBlog,
//   renderAllBlog,
//   postBlog,
//   renderSingleBlog,//!they are not being used 
//   renderUpdate,
//   updateBlog,
//   deleteBlog,
// } = require("./controller/blog/blogController");
const app = express();
const cookieParser=require('cookie-parser');
app.use(cookieParser())
app.use(express.static('public'))//access public folder to use we can insert css files and picture andother
app.use(express.static('uploads'))
const blogRoute = require("./routes/blogRoute");//import routes for blogs
const userRoute = require("./routes/userRoute");//import routes for authUser
const { decodeToken } = require("./services/decodeToken");
require("./model/index");//~ database connection
app.set("view engine", "ejs");// !telling the nodejs to set view-engine to ejs

// form bata data aairaxa parse gara or handle gar vaneko ho
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key', // Change this to a secure random string
  resave: false,
  saveUninitialized: true,
  // cookie: { maxAge: 5000 } // Set the max age of the session, adjust as needed
}));
app.use(flash())

app.use( async(req,res,next)=>{
  res.locals.currentUser=req.cookies.token
  const token=req.cookies.token
  if(token){
    const decryptedResult=await decodeToken(token,process.env.secretKey)
    if(decryptedResult&&decryptedResult.id){
      console.log(decryptedResult)
      res.locals.currentUserId=decryptedResult.id
      
    }
  }
  next()
})

app.use("", blogRoute);//use route blog here like bogs,createBlog,singleBlog,updateBlog,deleteBlog
app.use("", userRoute);//use route user like renderLogin,Login,renderRegister,register
//! we can use this when we haven't use router,only user controller ,its used in route
// app.get("/",renderAllBlog)
// app.get("/createBlog", renderCreateBlog)
// app.post("/createBlog", postBlog)
// app.get("/single/:id", renderSingleBlog)
// app.get("/delete/:id",deleteBlog)
// app.get("/update/:id", renderUpdate)
// app.post("/updateBlog/:id", updateBlog)

//stablished node conncetion
app.listen(3000, () => {
  console.log("NodeJs project has started at port 3000");
});
