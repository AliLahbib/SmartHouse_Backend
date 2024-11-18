const mongoose = require('mongoose');

exports.initMongoDb = () =>
    new Promise((resolve, reject) => {
        try {
            mongoose.set('strictQuery', true);
            mongoose
                .connect('mongodb://127.0.0.1:27017/natra', {
                    autoCreate: true,
                    autoIndex: true,
                })
                .then(() => {
                    console.log('MongoDB Connected ✅');
                    resolve(mongoose.connection);
                })
                .catch((err) => console.log(err));
        } catch (error) {
            reject(error);
        }
    });