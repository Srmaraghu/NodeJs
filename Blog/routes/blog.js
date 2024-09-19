const { Router } = require('express');
const multer = require("multer");
const path = require('path');
const mongoose= require('mongoose');

const Blog = require("../models/blog");
const Comment = require("../models/comments");
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



router.get("/addnew", (req, res) => {
    return res.render("addBlog", {
        user: req.user
    }
    )
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
        body, title, author: req.user._id,
        coverImageURL: `uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog.id}`);
})

router.get("/:id", async (req, res) => {
    const allBlogs = await Blog.find({}).sort("createdAt");
    const blog = await Blog.findById(req.params.id)
        .populate({
            path: 'author',
            select: 'fullName profileImageURL'
        });

    const comments = await Comment.find({blogId : req.params.id});
    return res.render("blog", { blog, user: req.user, allBlogs: allBlogs , comments });
});

router.post("/comment/:blogId", async(req,res) => {
    const { blogId } = req.params;
    const { content } = req.body;
    const author = req.user._id; // This should be a valid ObjectId

    // Ensure blogId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).send("Invalid blogId");
    }

    // Ensure author is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(author)) {
        return res.status(400).send("Invalid author ID");
    }

    await Comment.create({
        content: content,
        blogId: blogId,
        author: author, 
    });

    return res.redirect(`/blog/${blogId}`);
});




module.exports = router;