// to hash a password we import this crypto node docs
const {createHmac, randomBytes} = require("crypto");
const mongoose = require("mongoose");
const { createTokenForUser } = require("../services/auth");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,  
    },
    //profile image humne rkh toh li but we need to get a default photo like if they haven't set a profile photo 
    profileImageUrl: {
        type: String,
        default: "/images/avatar.png"
    },
    //in role we have to always pass an enum. Enum is like an array. Default means that what do u want for default
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, {timestamps: true}
);

userSchema.pre("save", function (next) {
    const user = this;

    if(!user.isModified("password")) return next();

    //adds random 16 digits to a persons password and these would be different forr every user
    const salt = randomBytes(16).toString();
    // const salt = "someRandomCode"; //abhi k liye isse hardcode kiya h
    //which coding      here: sha256        kyaa krna h: salt( upar wala kaam )
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        //hex mei return kro
        .digest("hex");

        user.salt = salt;
        user.password = hashedPassword;

        next();
})

userSchema.static('matchPasswordAndGenerateToken', async function(email, password) {
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedpassword = user.password;

    const userProvideHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if(hashedpassword !== userProvideHash)throw new Error("Incorrect Password");
    const token = createTokenForUser(user);
    return token;
});

const User = mongoose.model('user', userSchema);

module.exports = User;