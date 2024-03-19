const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const facultyRoutes=require('./routes/faculty')
const timeslotRoutes=require('./routes/timeslot')
const timetableRoutes=require('./routes/TimeTable')
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/timeslot', timeslotRoutes);
app.use('/api/timetable',timetableRoutes);
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));