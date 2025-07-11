const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin");
});



router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    //mongoose virtual function on google
    //we need to use try and catch otherwise our app will be crashed
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password);

    console.log("token", token);
    return res.cookie("token", token).redirect("/");
} catch(error){
    console.error("Sign-in error:", error.message);
    return res.render("signin", {
        error: "Incorrect Email or Password",
    })
}
})

router.post('/signup', async (req, res) => {
    //hum log kya kya denge fullName, email,password
    const {fullName, email, password} = req.body;
    //naya user create krna h database isiliye require kiya
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});

//easy h bss cookie ko clr krna h
router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

module.exports = router;