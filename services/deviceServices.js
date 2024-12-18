const Device  = require("../models/device");
const { Piece } = require("../models/piece");

exports.getDevices = async () => {
  const devices = await Device.find().populate("room");
  return devices;
};
exports.getDeviceById = async (id) => {
  const device = await Device.findById(id).populate("room");
  if (!device) {
    throw new Error("Device not found");
  }
  return device;
};

exports.updateDevice = async (id, deviceData) => {
  const device = await Device.findById(id).populate("room");

  if (!device) {
    throw new Error("Device not found");
  }

  const previousRoomId = device.room?._id?.toString();
  const newRoomId = deviceData.room;

  // Mettre à jour le dispositif
  device.name = deviceData.name;
  device.type = deviceData.type;
  device.specificParams = deviceData.specificParams;
  device.room = newRoomId || null; // Gérer la pièce
  device.updatedAt = new Date();

  await device.save();

  // Gérer les pièces associées
  if (previousRoomId && previousRoomId !== newRoomId) {
    await exports.removeDeviceFromPiece(id, previousRoomId);
  }

  if (newRoomId && previousRoomId !== newRoomId) {
    await exports.addDeviceToPiece(id, newRoomId);
  }

  return device;
};

exports.addDevice=async (deviceData) => {
  const device = await Device.create({
    ...deviceData,
    room:null,
    status:"off",
    lastConnected:null, 
    consumption:0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return device;
};

exports.turnOnDevice = async (id) => {
  const device = await Device.findByIdAndUpdate(id, {status: "on", updatedAt: new Date(),lastConnected: new Date()}).populate("room");
  if (!device) {
    throw new Error("Device not found");
  }
  return device;
}

exports.turnOffDevice = async (id) => {
  console.log("debug from services turn off device ");
  const device= await Device.findById(id).populate("room");
  console.log("debug from services turn off device---- ",device);
  if(!device){
    console.log("device not found");
    throw new Error("Device not found");
  }
  console.log("debug from services turn off device +++++",device);
  devicee=await turnOffProcess(device);
  await devicee.save();
  return devicee;
}

turnOffProcess=function(device){
  console.log("start process",device);
  device.status="off";
  device.updatedAt=new Date(); 
  lastConnected=device.lastConnected;
  currentTime=new Date();
  consumption=device.consumption;
  device.consumption=consumption+((currentTime-lastConnected)/1000)*device.specificParams.powerConsumption;
  console.log("finish process",device);
  return device;
}


exports.deleteDevice = async (id) => {
  const device = await Device.findByIdAndDelete(id);
  Piece.updateMany(
    { _id: { $in: device.pieces } },
    { $pull: { devices: id } }
  )
  if (!device) {
    throw new Error("Device not found");
  }
  return device;
};

exports.addDeviceToPiece = async (deviceId, pieceId) => {
  if (!pieceId) return;

  const piece = await Piece.findById(pieceId);
  if (!piece) {
    throw new Error("Piece not found");
  }

  // Ajouter le dispositif à la liste
  piece.devices = piece.devices || [];
  if (!piece.devices.includes(deviceId)) {
    piece.devices.push(deviceId);
    await piece.save();
  }
};

exports.removeDeviceFromPiece = async (deviceId, pieceId) => {
  if (!pieceId) return;

  const piece = await Piece.findById(pieceId);
  if (!piece) {
    throw new Error("Piece not found");
  }

  // Retirer le dispositif
  piece.devices = piece.devices.filter((id) => id.toString() !== deviceId.toString());
  await piece.save();
};
