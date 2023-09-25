const express = require("express");
const { blogs, sequelize } = require("./model/index");
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
app.use(express.static('public'))//access public folder to use we can insert css files and picture andother
const blogRoute = require("./routes/blogRoute");//import routes for blogs
const userRoute = require("./routes/userRoute");//import routes for authUser
require("./model/index");//~ database connection
app.set("view engine", "ejs");// !telling the nodejs to set view-engine to ejs

// form bata data aairaxa parse gara or handle gar vaneko ho
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
