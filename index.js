const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {Blog} = require("./models/blog")

//hmare routes import krne honge
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

// Add this at the top of your middleware chain (right after `const app = express()`)
app.use((req, res, next) => {
  console.log(`[DEBUG] Request received: ${req.method} ${req.url}`);
  next();
});

mongoose
    .connect('mongodb://127.0.0.1:27017/blogify')
    .then(e => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); //iss line k liye path require kraa thaa

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


app.get("/", async (req, res) => {
    //u can also pass sort ki kaise sort krne hain
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.render("home", {
        user: req.user || null,
        blogs: allBlogs,
    }
    );
})

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, ()=> {
    console.log(`Server started at PORT ${PORT}`);
})