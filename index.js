var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/registration',{useNewUrlParser:true})

const reg_schema = {
    email : String ,
    password : Number 
}
const reg_model = mongoose.model("Registration_Model", reg_schema)

app.get('/' , (req,res)=>{ 
   
     res.sendFile(__dirname +"/login.html")
})

app.post('/' , (req,res)=>{
    var my_email = req.body.email;
    var my_pass = req.body.password;
    
    const user = new reg_model({
        email : my_email ,
        password : my_pass 
    })
    user.save()
    res.redirect('/')
})

app.listen(3000, ()=>{

   console.log("Connected Server")
})