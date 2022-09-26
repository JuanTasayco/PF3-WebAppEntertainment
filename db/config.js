const mongoose = require("mongoose");

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.BBDD_CNN)
        console.log("DB ONLINE")
    } catch {
        throw new Error();
    }

}

module.exports = {
    dbConnection
}