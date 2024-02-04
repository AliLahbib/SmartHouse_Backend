const { Alert } = require("../models/alert")

exports.addAlert = async (alertData) => {
    const alert = await Alert.create({ ...alertData });
    return alert;
}