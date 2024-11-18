const mongoose = require('mongoose');

exports.initMongoDb = () =>
    new Promise((resolve, reject) => {
        try {
            mongoose.set('strictQuery', true);
            mongoose
                .connect(
                    'mongodb+srv://alilahbib_dev:Azerty123mongodb@cluster0.gwcyu.mongodb.net/Natra?retryWrites=true&w=majority&appName=Cluster0',
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        autoCreate: true,
                        autoIndex: true,
                    }
                )
                .then(() => {
                    console.log('MongoDB Connected ✅');
                    resolve(mongoose.connection);
                })
                .catch((err) => console.log('MongoDB Connection Error ❌:', err));
        } catch (error) {
            reject(error);
        }
    });
