import mongoose from "mongoose";

export const connectDB = () => {
    const db = mongoose.connect(process.env.MONGO_URI , {
        dbName: "FleetLink-Logistic"
    }).then((conn) => {
        console.log(`Database is connected: ${conn.connection.host}`)
    }).catch((err) => {
        console.log(err)
    })
}