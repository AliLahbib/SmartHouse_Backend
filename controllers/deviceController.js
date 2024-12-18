const Piece = require("../models/piece");
const deviceService = require("../services/deviceServices")
exports.getDevices = async (req, res) => {
  console.log("debug route get Devices");
  try {
    const devices = await deviceService.getDevices();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getDeviceById = async (req, res) => {
  try {
    const id = req.params.id;
    const device = await deviceService.getDeviceById(id);
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addDevice = async (req, res) => {
  console.log("debug route add Device");
  try {
    const deviceData = req.body;
    const device = await deviceService.addDevice(deviceData);
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const id = req.params.id;
    const deviceData = req.body;
    const device = await deviceService.updateDevice(id, deviceData);
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDevice = async (req, res) => {
  console.log("debug from controller delete device ");
  try {
    const id = req.params.id;

    const device = await deviceService.deleteDevice(id);
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.turnOnDevice = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("")
    const device = await deviceService.turnOnDevice(id);
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.turnOffDevice = async (req, res) => {
  try {
    
    const id = req.params.id;
    console.log("debug from controller turn off device ",id);
    const device = await deviceService.turnOffDevice(id);
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};