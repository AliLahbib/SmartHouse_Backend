const express = require("express");
const cors = require('cors');
const app = express();
const router = express.Router();
const routerUsers = require('./routes/usersRouter');
const routerPieces = require('./routes/pieceRouter');
const routerDevices = require('./routes/deviceRouter');
const routerAuth=require('./routes/authRoutes');

const connection = require('./config/connection');

app.use(express.json());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routerAuth.router);
app.use(routerUsers.router);
app.use(routerPieces.router);
app.use(routerDevices.router);


router.get('/*', (req, res) => {
    res.status(404).json('endPoint not found !');
});

(async () => {
    try {
        await connection.initMongoDb();
        app.listen(4000, () => {
            console.log(`Server started on : ${4000} ✅`);
        });
    } catch (error) {
        throw new Error(error);
    }
})();