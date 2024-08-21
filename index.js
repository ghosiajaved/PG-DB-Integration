const {Client}= require('pg');
require('dotenv').config();

const con= new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})


con.connect().then(()=>console.log("Connected"));

//Products table
con.query("Select * from products",(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    con.end;
})

//categories table
con.query("Select * from categories",(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    con.end;
})


//INSERT OPERATION
const insertQuery = `INSERT INTO users (user_id, email, name , address , phone) VALUES ($1,$2,$3,$4,$5)`;
const insertValues = [3 , 'walijaa@gmail.com' , 'Walija', 'Bahria Town' , '1000'];

con.query(insertQuery, insertValues, (err, res) => {
    if (!err) {
        console.log('User inserted successfully');
    } else {
        console.log(err.message);
    }
    con.end;  
});


//UDATE OPERATION
const updateQuery = `UPDATE users SET name = $1 WHERE user_id = $2`;
const updateValues = ['Ayla', 3];

con.query(updateQuery, updateValues, (err, res) => {
    if (!err) {
        console.log('User updated successfully');
    } else {
        console.log(err.message);
    }
    con.end;  // Properly end the connection
});


//DELETE OPERATION
const deleteQuery = `DELETE FROM users WHERE user_id = $1`;
const deleteValues = [3];

con.query(deleteQuery, deleteValues, (err, res) => {
    if (!err) {
        console.log('User deleted successfully');
    } else {
        console.log(err.message);
    }
    con.end;  // Properly end the connection
});

//users table
con.query("Select * from users",(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    con.end();
})



