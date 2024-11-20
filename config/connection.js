const mongoose = require('mongoose');

exports.initMongoDb = async () => {
    try {
        mongoose.set('strictQuery', true); // Activer ou désactiver la validation stricte des requêtes

        // Configuration et connexion à MongoDB
        const connection = await mongoose.connect(
            'mongodb+srv://aliDevMain:Azerty123mongodb@cluster0.ptt2b.mongodb.net/Natra?retryWrites=true&w=majority&appName=Cluster0',
            {
                autoCreate: true,  // Automatically create collections
                autoIndex: true,   // Automatically build indexes
            }
        );

        console.log('MongoDB Connected ✅');
        return connection;
    } catch (error) {
        // Gestion des erreurs avec des informations détaillées
        console.error('MongoDB Connection Error ❌:', error.message);
        console.error('Full Error Details:', error);

        // Optionnel : Arrêter l'application en cas d'erreur critique
        process.exit(1);
    }
};
