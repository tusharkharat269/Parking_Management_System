const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'your_password', 
  database: 'DB_Name'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.get('/getSlots', (req, res) => {
  const sql = 'SELECT * FROM parking_slots';

  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get('/addSlot', (req, res) => {
  const slotNumber = req.query.slotNumber;
  const vehicleNumber = req.query.vehicleNumber;
  const entryTime = req.query.entryTime;

  const sql = `INSERT INTO parking_slots (slot_number, vehicle_number, entry_time, is_occupied) VALUES (${slotNumber}, '${vehicleNumber}', '${entryTime}', false)`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Slot added successfully' });
  });
});

app.get('/updateSlot', (req, res) => {
  const id = req.query.id;
  const vehicleNumber = req.query.vehicleNumber;

  const sql = `UPDATE parking_slots SET vehicle_number = '${vehicleNumber}', is_occupied = ${vehicleNumber !== ''} WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Slot updated successfully' });
  });
});

app.get('/deleteSlot', (req, res) => {
  const id = req.query.id;

  const sql = `DELETE FROM parking_slots WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Slot deleted successfully' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
