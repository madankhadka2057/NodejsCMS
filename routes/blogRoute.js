const { renderAllBlog, renderCreateBlog, postBlog, renderSingleBlog, updateBlog, deleteBlog, renderUpdate, myBlogs } = require("../controller/blog/blogController")
const express = require('express');
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router=require("express").Router()

const {multer,storage,fileSizeFilter}=require("../middleware/multerConfig");
const { validUser, isValidUser } = require("../middleware/validUser");
const upload=multer({storage:storage,fileFilter:fileSizeFilter})

router.route("/").get(renderAllBlog)
router.route("/createBlog").get(isAuthenticated,renderCreateBlog).post(isAuthenticated,upload.single('image'), postBlog)
router.route("/single/:id").get(renderSingleBlog)
router.route("/delete/:id").get(isAuthenticated,isValidUser,deleteBlog)
router.route("/update/:id").get(isAuthenticated,renderUpdate)
router.route("/updateBlog/:id").post(isAuthenticated,isValidUser,upload.single('image'),updateBlog)
router.route("/myBlogs").get(isAuthenticated,myBlogs)
module.exports = router;
