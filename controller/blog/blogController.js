const { QueryTypes } = require("sequelize");
const { blogs, users, sequelize } = require("../../model"); //blogs is dataBase table name for all blogs and its define in model index
const fs = require("fs"); //fs-->fileSystem
exports.renderAllBlog = async (req, res) => {
  //blogs vanney table bata vayejati sabai data dey vaneko
  const allBlogs = await blogs.findAll();
  // blogs vanney key/name ma allBlogs/data pass gareko ejs file lai
  res.render("blogs", { blogs: allBlogs });
};
exports.renderCreateBlog = (req, res) => {
  const error = req.flash("error");
  res.render("createBlog", { error });
};
exports.postBlog = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const subtitle = req.body.subtitle;
  const useId = req.user[0].id;
  if (!req.file) {
    req.flash("error", "Please upload an image");
    res.redirect("/createBlog");
    return;
  }
  const fileName = req.file.filename;
  const fileSize = req.file.size;
  const image = process.env.PROJECT_URL + fileName;
  //check fileSize is is less then 2mb or not
  if (fileSize > 2097152) {
    req.flash("error", "File size must be less than 2MB");
    res.redirect("/createBlog");
    return;
  }
  //query to make separate blog table for each user
  // await sequelize.query(`CREATE TABLE IF NOT EXISTS blog_${useId}(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  //   userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  //   title VARCHAR(255),
  //   description VARCHAR(255),
  //   subtitle VARCHAR(255),
  //   image VARCHAR(255)
  // )`),
  //   {
  //     type: QueryTypes.CREATE,
  //   };
  // //inserting blog data
  // await sequelize.query(
  //   `INSERT INTO blog_${useId}(title,subtitle,description,userId,image)VALUEs(?,?,?,?,?)`,
  //   {
  //     type: QueryTypes.INSERT,
  //     replacements: [title, subtitle, description, useId, image],
  //   }
  // );
  await blogs.create({
    title: title,
    subTitle: subtitle,
    description: description,
    userId: useId,
    image: image,
  });
  res.redirect("/");
};
exports.renderSingleBlog = async (req, res) => {
  const id = req.params.id;
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
  res.render("singleBlog", { blog: blog });
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
  //   console.log(actualUrl); //like this-->1696487619794-DSC_0032.JPG
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
  // console.log(userId);
  const myBlogs = await blogs.findAll({
    where: {
      userId,
    },
  });
  // console.log("All data is:-",myBlogs)
  await res.render("myBlogs", { myBlogs: myBlogs });
};
//var
