const express = require('express')
const { blogs, sequelize } = require('./model/index')
const { renderCreateBlog, renderAllBlog, postBlog, renderSingleBlog, renderUpdate, updateBlog, deleteBlog } = require('./controller/blog/blogController')
const app = express()
const blogRoute=require("./routes/blogRoute")
// database connection 
require("./model/index")

// telling the nodejs to set view-engine to ejs
app.set('view engine', 'ejs')

// form bata data aairaxa parse gara or handle gar vaneko ho
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("",blogRoute)
// app.get("/",renderAllBlog)
// app.get("/createBlog", renderCreateBlog)
// app.post("/createBlog", postBlog)
// app.get("/single/:id", renderSingleBlog)
// app.get("/delete/:id",deleteBlog)
// app.get("/update/:id", renderUpdate)
// app.post("/updateBlog/:id", updateBlog)
app.listen(3000, () => {
    console.log("NodeJs project has started at port 3000")
})
