const { User } = require("../models/user")
const bcryptjs = require('bcryptjs')


exports.getUsers = async () => {
    const users = await User.find({}, { password: 0 });
    return users;
}

exports.addNewUser = async (userData) => {
    const fullname = userData.email.split('@')[0];
    const newUser = await User.create({ ...userData, fullname });
    return newUser;
}
exports.editUser = async (id, userData) => {
    const user = await User.findByIdAndUpdate(id, { ...userData }, { new: true });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}
exports.signIn = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    if (!bcryptjs.compareSync(password, user.password)) {
        throw new Error('Wrong password');
    }
    return user;
}

exports.addFriend = async (id, friendId) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    const friend = await User.findById(friendId);
    if (!friend) {
        throw new Error('friend not found');
    }
    user.friends.push(friend._id);
    await user.save();
    return user;
}