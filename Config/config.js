require("dotenv").config();

module.exports = {
    SECRET: process.env.SECRET,
    mongoURI: process.env.MONGO_URI,
    PORT: process.env.PORT,
}