const mongoose = require('mongoose');

exports.initMongoDb = () =>
    new Promise((resolve, reject) => {
        try {
            mongoose.set('strictQuery', true); // Conserve le mode strict des requêtes.
            mongoose
                .connect(
                    'mongodb+srv://alilahbib_dev:Azerty123mongodb@cluster0.gwcyu.mongodb.net/natra?retryWrites=true&w=majority&appName=Cluster0',
                    {
                        autoCreate: true,
                        autoIndex: true,
                    }
                )
                .then(() => {
                    console.log('MongoDB Connected ✅');
                    resolve(mongoose.connection);
                })
                .catch((err) => {
                    console.log('MongoDB Connection Error ❌:', err);
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
