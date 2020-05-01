const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'you must have a name!'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'you must have an email'],
        unique: true,
        validate: [validator.isEmail, 'please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'you must have a password'],
        minlength: [6, 'please enter a password with 6 characters'],
        select: false
    },
    confirmpassword: {
        type: String,
        required: [true, 'you must have a confirmpassword'],
        validate: {
            validator: function(value) {
                return value === this.password;
            },
            message: 'confirmpassword not equal to password,try again...',
        },
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmpassword = undefined;
    next();
});

userSchema.methods.comparePassword = async function(candidateSentPassword, userpassword) {
    return await bcrypt.compare(candidateSentPassword, userpassword);
}
const User = mongoose.model('User', userSchema);
module.exports = User;