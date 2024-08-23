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

// Routers
const projectRoutes = require('./routes/projectRoutes.js');
// const taskRoutes = require('./routes/taskRoutes.js');

app.use('/api/projects',projectRoutes);
// app.use('/api/tasks',taskRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})