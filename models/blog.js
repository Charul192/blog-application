//sbse pehle blog k liye we need a schema
const { Schema, model} = require("mongoose");
const path = require("path");

//we'll use disk storage
const multer = require("multer");
const storage = multer.diskStorage({
    //kaha store krna h
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/${req.user._id}`));
  },
  //file ka name kya hone wala h
  filename: function (req, file, cb) {
    const fileName = `${Date.now}-${file.originalname}`
    //callback
    cb(null, fileName);
  }
})

const upload = multer({ storage: storage })

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
},
{timestamps: true}
);

const Blog = model("blog", blogSchema);

module.exports = {
    Blog,
    upload,
}