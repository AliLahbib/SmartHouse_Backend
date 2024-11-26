
const deviceService=require("../services/deviceServices")
exports.getDevices = async (req, res) => {
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