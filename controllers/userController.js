const userServices = require('../services/userServices');


exports.getUsers = async (req, res, next) => {
    try {
        const result = await userServices.getUsers();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await userServices.getUser(id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const result = await userServices.addNewUser(userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}

exports.editUser = async (req, res, next) => {
    try {
        console.log("debug edit user from controller");
        const id = req.params.id;
        const userData = req.body;
        const result = await userServices.editUser(id, userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}

exports.signIn = async (req, res, next) => {
    try {
        
        const email = req.body.email;
        const password = req.body.password;
        console.log('debug ' + email + '/' + password);
        const result = await userServices.signIn(email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
exports.reinitilizePassword= async (req,res,next)=>{
    const email=req.body.email;
    
    
    const newPass=req.body.newPass
    console.log("debug "+email+"/"+newPass);
    try{
    const result=await userServices.reinitilizePassword(email,newPass);
    res.status(201).json(result);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
    
}


exports.deleteUser = async (req, res, next) => {
    try {
        console.log("debug delete user from controller");
        const id = req.params.id;
        const result = await userServices.deleteUser(id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}


exports.addPieceToUser = async (req, res, next) => {
    try {
        const idPiece = req.body.idPiece;
        const idUser = req.params.id;
        const result = await userServices.addPieceToUser(idUser, idPiece);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: 'Internal Server Error !',
        });
    }
}


exports.getUsersByPiece=async(req,res,next)=>{
    try{
        const idPiece=req.params.id;
        const result=await userServices.getUsersByPiece(idPiece);
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({
            message: error.message,
            details: "Internal Server Error !",
        });
    }
}