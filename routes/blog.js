const { Router } = require("express");
const router = Router();
const {Blog, upload} = require("../models/blog");

router.get('/add-new', (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
})

router.post('/add-new', upload.single("coverImage"), async (req, res) => {
    const {title, body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;