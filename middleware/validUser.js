const { users, blogs } = require("../model");

exports.isValidUser = async (req, res, next) => {
  const userId = req.userId;
  const id = req.params.id;

  const oldData = await blogs.findAll({
    where: {
      id: id,
    },
  });

  // Check if user data exists
  if (oldData[0].userId !== userId) {
    // console.log("User data found:", oldData[0]);
    res.send("You can't edit this blog");
  }else{

      next();
  }
};
