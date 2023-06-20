import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = mongoose.Schema({
    name: { type: String, },
    userName: { type: String, },
    DOB: { type: String, },
    location: { type: String, },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, },
    profilePicture: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    bio: { type: String, default: '' },
    registeredAt: { type: Date, default: Date.now },
    loginAt: { type: Date, default: '' },
    friends: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] },
    notifications: { type: [Object], default: [] },         //{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, content: String, type: String, createdAt: { type: Date, default: Date.now } }
    sendRequests: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] },       // jin logo ko friend request bheji h 
    activityLog: { type: [String], default: [] },
    tokens: [{ name: String, token: String }],
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password
    }, process.env.AUTH_TOKEN_SECRET_KEY)
    const index = this.tokens.findIndex(token => token.name == 'auth_token')
    if (index == -1) this.tokens = this.tokens.concat({ name: 'auth_token', token })        // auth_token should only be 1
    return token
}
userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
};


userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    // const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, 12);
    user.password = hash;
    next();
});


const user = new mongoose.model("User", userSchema)
export default user