const { blogs, users } = require("../../model"); //blogs is dataBase table name for all blogs and its define in model index
const fs = require("fs"); //fs-->fileSystem
exports.renderAllBlog = async (req, res) => {
  //blogs vanney table bata vayejati sabai data dey vaneko
  const allBlogs = await blogs.findAll();
  // blogs vanney key/name ma allBlogs/data pass gareko ejs file lai
  res.render("blogs", { blogs: allBlogs });
};
exports.renderCreateBlog = (req, res) => {
  res.render("createBlog");
};
exports.postBlog = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const subtitle = req.body.subtitle;
  const useId = req.user[0].id;
  const fileName = req.file.filename;
  // console.log(req.file)
  await blogs.create({
    title: title,
    subTitle: subtitle,
    description: description,
    userId: useId,
    image: process.env.PROJECT_URL + fileName,
  });
  res.redirect("/");
};
exports.renderSingleBlog = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  console.log(userId);
  // second approach
  // const {id} = req.params
  // id ko data magnu/find garnu paryo hamro table bata
  const blog = await blogs.findAll({
    where: {
      id: id,
    },
    include: {
      model: users,
    },
  });
  // second finding approach
  // !const blog = await blogs.findByPk(id)
  res.render("singleBlog", { userId: userId, blog: blog });
};
exports.renderUpdate = async (req, res) => {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const id = req.params.id;
  const updateData = await blogs.findAll({
    where: {
      id: id,
    },
  });

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!
  res.render("updateBlog", { data: updateData, id: id });
};
exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const description = req.body.description;

    const oldDatas = await blogs.findAll({
      where: {
        id: id,
      },
    });
    let fileUrl;
    if (req.file) {
      // console.log(req.file)
      fileUrl = process.env.PROJECT_URL + req.file.filename; // process.env.PROJECT_URL-->http://localhost:3000/ and req.file.filename-->1696487619794-DSC_0032.JPG
      const oldImagePath = oldDatas[0].image;
      // console.log(oldImagePath)//http://localhost:3000/1696487619794-DSC_0032.JPG
      const actualPath = oldImagePath.slice(23);
      // console.log(actualPath)//1696487619794-DSC_0032.JPG

      //delete file form uploads folder
      fs.unlink("uploads/" + actualPath, (err) => {
        if (err) {
          console.log("Error accure: ", err);
        } else {
          console.log("Deleted Succesfully");
        }
      });
    } else {
      fileUrl = oldDatas[0].image;
      console.log(fileUrl); // old already exist image url-->http://localhost:3000/1696487619794-DSC_0032.JPG
    }

    await blogs.update(
      {
        title: title,
        subTitle: subTitle,
        description: description,
        image: fileUrl,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.redirect("/single/" + id);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
//delete blog
exports.deleteBlog = async (req, res) => {
  const id = req.params.id;

  const allData = await blogs.findAll({
    where: {
      id: id,
    },
  });
  const imageUrl = allData[0].image;
  const actualUrl = imageUrl.slice(23);
//   console.log(actualUrl);
  await blogs.destroy({
    where: {
      id: id,
    },
  });
  fs.unlink("uploads/" + actualUrl, (err) => {
    if (err) {
      console.log("Error accure:-", err);
    } else {
      console.log("Sucessfully Deleted");
    }
  });
  res.redirect("/");
};
//myBlogs
exports.myBlogs = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const myBlogs = await blogs.findAll({
    where: {
      userId,
    },
  });
  // console.log("All data is:-",myBlogs)
  await res.render("myBlogs", { myBlogs: myBlogs });
};
//var 
