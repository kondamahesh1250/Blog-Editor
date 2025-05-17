require('dotenv').config();
const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoute');
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require('./db');
connectDB();

app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running!`));