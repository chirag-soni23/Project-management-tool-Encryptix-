const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello")
})

// Routers
const projectRoutes = require('./routes/projectRoutes.js');
app.use('/api/projects', projectRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})