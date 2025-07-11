const { Router } = require("express");
const router = Router();
const {upload} = require("../models/blog");

router.get('/add-new', (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
})

router.post('/', upload.single("coverImage"), (req, res) => {
    console.log("Text fields:", req.body);
    console.log("File fields:", req.file);
    return res.redirect("/");
})

module.exports = router;