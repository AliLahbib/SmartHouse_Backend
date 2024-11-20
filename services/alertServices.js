const { Alert } = require("../models/alert")

exports.addAlert = async (alertData) => {
    console.log("debug: add alert", alertData);
    
    const alert = await Alert.create({ ...alertData });
  
    return alert;
}