require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/api/products",productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes); // ✅ Ensure this is correct

console.log("MongoDB URI:", process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>console.log("MongoDB connected")).catch(err => console.log(err))

app.get("/",(req,res)=>{
    res.send("Mutton Store API is running...");
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server running on port ${PORT}`));