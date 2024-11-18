const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: {
        type: String,
        set: (value) => {
            return bcrypt.hashSync(value, 12)
        }
    },
    fullname: String,
    phone: String,
    avatar: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

exports.User = User;