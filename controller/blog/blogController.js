const { blogs } = require("../../model")
exports.renderAllBlog= async (req, res) => {
    //blogs vanney table bata vayejati sabai data dey vaneko 
    const allBlogs = await blogs.findAll()

    // blogs vanney key/name ma allBlogs/data pass gareko ejs file lai
    res.render('blogs', { blogs: allBlogs })
}
exports.renderCreateBlog= (req, res) => {
    res.render("createBlog")
}
exports.postBlog=  async (req,res)=>{
const title = req.body.title
const description  = req.body.description
const subtitle = req.body.subtitle

await blogs.create({
    title : title,
    subTitle:subtitle,
    description : description
})
res.redirect("/")
}
exports.renderSingleBlog= async (req, res) => {
    const id = req.params.id
    // second approach
    // const {id} = req.params 
    // id ko data magnu/find garnu paryo hamro table bata
    const blog = await blogs.findAll({
        where: {
            id: id
        }
    })
    // second finding approach
    // const blog = await blogs.findByPk(id)

    res.render("singleBlog", { blog: blog })
}
exports.renderUpdate= (req, res) => {
    const id = req.params.id
    res.render("updateBlog", { id: id })
}
exports.updateBlog= async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
            await blogs.update({
            title: req.body.title,
            subTitle: req.body.subTitle,
            description: req.body.description
        },
            {
                where: {
                    id: id
                },
            })      
        res.redirect("/")
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}
exports.deleteBlog=  async (req, res) => {
    const id = req.params.id
    // blogs vanney table bata tyo id ko delete gar vaneko yaha
    await blogs.destroy({
        where: {
            id: id
        }
    })
    res.redirect("/")
}
