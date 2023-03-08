const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mySQL123$$',
    database: 'parking'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected..');
});


const app = express();

// Create Entry Point
app.post('/createentrypoint/', (req,res) => {
    const id = req.body.id;
    const description = req.body.description;

    db.query('INSERT INTO entry_point VALUES(?,?)',[id,description], post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json({ message: "Entry Point Created" });
    });
    
});

// Check available slot
app.post('/checkavailable/', (req,res) => {
    const id = req.body.size;
    
    let sql = `SELECT location FROM parking_slot WHERE vehicle_type = ${id}`;
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    
});

// Time in
app.post('/timein/', (req,res) => {
    const id = req.body.id;
    const plate_number = req.body.plate_number;
    const parking_slot = req.body.parking_slot;
    const time_in = req.body.time_in;
    const entry_point = req.body.entry_point;
    const vehicle_type = req.body.vehicle_type;

    db.query('INSERT INTO transactions(id, plate_number, parking_slot, time_in, entry_point, vehicle_type ) VALUES(?,?,?,?,?,?)',[id, plate_number, parking_slot, time_in, entry_point, vehicle_type], post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json({ message: "Time in Successful" });
    });
});

// Time out
app.post('/timeout/', (req,res) => {
    const plate_number = req.body.plate_number;
    const time_out = req.body.time_out;
    const fee = req.body.fee;

    let sql = `UPDATE transactions SET time_out = ${time_out}, fee = ${fee} WHERE plate_number = ${plate_number}`;
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    
});

// Update Parking Status
app.post('/updateparkingstatus/', (req,res) => {
    const location = req.body.location;
    const status = req.body.status;

    let sql = `UPDATE parking_slot SET status = ${status} WHERE plate_number = ${location}`;
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});