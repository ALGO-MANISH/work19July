import express from "express";
import mysql from "mysql"
import cors from 'cors'
import cookieParser  from "cookie-parser";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'; 
dotenv.config();


const port =process.env.port || 8088;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.static('build'))
//   app.use(cors())


const db=mysql.createConnection({    
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database 
})



db.connect((err) => { 
    if (err) { 
      console.log("Database Connection Failed !!!", err); 
    } else { 
      console.log("connected to Database"); 
    } 
}); 



// to insert student registration data in usertab table 
app.post('/api/addStudents', (req, res) => {

    const sql = "INSERT INTO usertab (name, scholarid, username, passwords, phoneno, email, department, gender, role) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sql, [req.body.name, req.body.scholarId, req.body.uname, req.body.password, req.body.phone, req.body.email, req.body.dept, req.body.gender,req.body.role], (err) => {
        if (err) return res.json({ Message: "Server Side Error " + err });
        return res.json({ Status: "Success", Message: "Data Inserted Succesfully" });
    });
});



// to insert student payment details in studentDetails table 
app.post('/api/addPayments', (req, res) => {
    const sql = "SELECT * FROM usertab WHERE scholarid=?";
    db.query(sql, [req.body.scholarId], (err,data) => {
        if(err)return res.json({Message:"server Side Error "+err})
        if(data.length>0){
            const sl =data[0].sl;
            const scholarId =data[0].scholarid;
            const sqltemp = "INSERT INTO studentDetails (sl_ref, scholarid, paid, leave_taken, joining_date, hostel_name, room_no) VALUES(?,?,?,?,?,?,?)";
            db.query(sqltemp, [sl, scholarId, req.body.paid, req.body.leave, req.body.joining, req.body.hostetName, req.body.roomNo], (err) => {
                if (err) return res.json({ Message: "Server Side Error " + err });        
                return res.json({ Status: "Success", Message: "Data Inserted Succesfully" });        
            });
        }else {
            return res.json({Message:"Please first create user profile"});
        }
    });
});





//to verifyUser wether a studetn loged in or not , if loged in we will create and assign data in username, displayname, email, role, scholarId
const verifyUser=(req, res, next)=>{
    const token=req.cookies.token;
    if(!token){           
            return res.json({Message : "Session Expired !! "})
    }else {
        jwt.verify(token , "our-jsonwebtoken-secret-key",(err, decoded)=>{
            if(err){
                return res.json({Message : "Authentication Error"})
            }else {
                req.username=decoded.username;                
                req.displayName=decoded.displayName;
                req.email=decoded.email;
                req.role=decoded.role;  
                req.scholarId=decoded.scholarId;              
                
                next();
            }
        } )
    }
}






//to get all data of student who have loged in
app.get('/api/data',verifyUser,(req,res)=>{
    const sql="select * from userTab where scholarid=? ";
    db.query(sql,[req.scholarId], (err, result)=>{
        if(err)res.json("Error");
        if(result.length>0) return res.json({ Status: "Success", dataArray: result });
        else {
            return res.json({ Status: "No Data" });
        }
    })
})

app.get('/api/paymentdata',verifyUser,(req,res)=>{
    const sql="select * from studentDetails where scholarid=? ";
    db.query(sql,[req.scholarId], (err, result)=>{
        if(err)res.json("Error");
        if(result.length>0)return res.json({ Status: "Success", dataArray: result });
        else {
            return res.json({ Status: "No Data" });
        }
    })
})











app.get('/api',verifyUser,(req,res)=>{
    return res.json({Status : "Success", username: req.username, displayname :req.displayName,email :req.email,role :req.role, scholarId :req.scholarId})
})




app.post('/api/login',(req,res)=>{
    const sql="SELECT * FROM userTab WHERE username=? AND passwords=?";
    db.query(sql,[req.body.email, req.body.password],(err, data)=>{
       
        if(err)return res.json({Message:"server Side Error "+err})
        if(data.length>0){
            const username =data[0].username;
            const displayName =data[0].name;               
            const email=data[0].email;
            const role=data[0].role;
            const scholarId=data[0].scholarid;
            
            const token=jwt.sign({username,displayName,email,role,scholarId},"our-jsonwebtoken-secret-key",{expiresIn :'1d'});
            res.cookie('token',token);
            return res.json({Status :"Success"})
        }else {
            return res.json({Message:"No Records Existed"});
        }
    })
})




app.get('/api/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"})
})

app.listen(port, ()=>{
    console.log(`Running ${port}`)
})
