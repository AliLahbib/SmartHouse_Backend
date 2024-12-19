const pieceServices = require("../services/pieceServices");

exports.getPieces = async (req, res, next) => {
  try {
    console.log("debug route request from controller");
    const result = await pieceServices.getPieces();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      details: "Internal Server Error !",
    });
  }
};

exports.getPieceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await pieceServices.getPieceById(id);   
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      details: "Internal Server Error !",
    });
  }
};

exports.addPiece = async (req, res, next) => {
  try {
    console.log("debug add Piece from piece controller");

    const pieceData = req.body;
    const result = await pieceServices.addNewPiece(pieceData);
    console.log("debug pieces from constroller : " + result);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      details: "Internal Server Error !",
    });
  }
};

exports.deletePiece = async (req, res, next) => {
  try {
    
    const id = req.params.id;
    console.log("debug from delete piece  "+id); 
    const result = await pieceServices.deletePiece(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      details: "Internal Server Error  from delete!",
    });
  }
};

exports.updatePiece = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pieceData = req.body;
    const result = await pieceServices.updatePiece(id, pieceData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      details: "Internal Server Error !",
    });
  }
};

exports.addDeviceToPiece = async (req, res, next) => {
  try {
    const idPiece = req.params.id;
    const idDevice = req.body.idDevice;
    const result = await pieceServices.addDeviceToPiece(id, idDevice);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      details: "Internal Server Error !",
    });
  }
};

exports.addPieceToUser = async (req, res, next) => {
  try {
    const idPiece = req.params.id;
    const idUser = req.body.idUser;
    const result = await pieceServices.addPieceToUser(idUser, idPiece);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      details: "Internal Server Error !",
    });
  }
};


exports.getPiecesByUser=async(req,res,next)=>{
    try{
        const idUser=req.params.id;
        const result=await pieceServices.getPiecesByUser(idUser);
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({
            message: error.message,
            details: "Internal Server Error !",
        });
    }
}
