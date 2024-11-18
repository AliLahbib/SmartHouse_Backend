const express = require("express");
const cors = require('cors');
const app = express();
const router = express.Router();
const routerUsers = require('./routes/usersRouter')
const routerAlerts = require('./routes/alertRoutes')
const connection = require('./config/connection');

app.use(express.json());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routerUsers.router);
app.use(routerAlerts.router);

router.get('/*', (req, res) => {
    res.status(404).json('endPoint not found !');
});

(async () => {
    try {
        await connection.
        
        
        initMongoDb();
        app.listen(4000, () => {
            console.log(`Server started on : ${4000} ✅`);
        });
    } catch (error) {
        throw new Error(error);
    }
})();