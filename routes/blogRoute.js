const { renderAllBlog, renderCreateBlog, postBlog, renderSingleBlog, updateBlog, deleteBlog, renderUpdate } = require("../controller/blog/blogController")
const express = require('express');
const router=require("express").Router()

router.route("/").get(renderAllBlog)
router.route("/createBlog").get(renderCreateBlog).post(postBlog)
router.route("/single/:id").get(renderSingleBlog)
router.route("/delete/:id").get(deleteBlog)
router.route("/update/:id").get(renderUpdate)
router.route("/updateBlog/:id").post(updateBlog)
module.exports = router;
