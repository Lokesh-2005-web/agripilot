const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const app = require("./app");

const listEndpoints = require("express-list-endpoints");

connectDB();

console.log(listEndpoints(app));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("--------------------------------");
    console.log(`🚀 Server running on Port ${PORT}`);
    console.log("--------------------------------");
});