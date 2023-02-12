const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
exports.connectDB = async () => {
    try {
        let uri = process.env.DB_URI
        let conn = await mongoose.connect(uri)
        console.log(`DB connected on host ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
    }
}