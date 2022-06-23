
let dbparams={
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306
};

const mysql = require("mysql2");
const con = mysql.createConnection(dbparams);

const express = require("express");
const app = express();


app.use(express.static("abc"));

app.get("/click", (req, resp)=>{
    console.log("click event");
    let a = req.query.a;
    let b = req.query.b;
    let c = req.query.c;

    console.log("click"+a);

    let result={ bookfoundstatus: false};

    con.query('insert into book (bookid, bookname, price)values (?, ?, ?)', [a,b,c], (err, rows) => {
        if (err) {
            result.bookfoundstatus = false;
			// look at  this 
        } else {
            if(rows.affectedrows > 0){
                result.bookfoundstatus = true;
            result.bookdetails = rows[0]
            }else{
                result.bookfoundstatus = false;
            }
        }
        resp.send(result);
});


})
// oon blur
app.get("/blur", (req, resp)=>{
    let input = req.query.x;

   console.log("1st blur");

    let output={ bookfoundstatus: false};
    console.log(output);

    con.query('select * from book', [], (err, rows) => {
        if (err) {
            output.bookfoundstatus = false;
			// look at  this 
        } else {  
            output.bookfoundstatus = true;
            output.allbooks = rows;
                console.log(rows);
        }
        resp.send(output);
});


})

// oon add buttons
app.get("/blur2", (req, resp)=>{
    let input = req.query.x;

   console.log("add wala blur");

    let output={ bookfoundstatus: false};
    console.log(output);

    con.query('select * from book', [], (err, rows) => {
        if (err) {
            output.bookfoundstatus = false;
			// look at  this 
        } else {  
            output.bookfoundstatus = true;
            output.allbooks = rows;
                console.log(rows);
        }
        resp.send(output);
});
});
app.listen(808, function(){
    console.log("Server listening at port 8080...");
});