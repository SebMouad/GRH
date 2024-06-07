const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employees');
const leaveRoutes = require('./routes/leaves');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
