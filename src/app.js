const express = require("express")
const app =express();
const path = require("path");
const hbs = require("hbs");


const port = process.env.PORT || 3000

require("./db/conn");
const Register = require("./models/registers");
const Login=require("./models/logins");
const { register } = require("module");

const static_path = path.join(__dirname,"../public/css")
const templates_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",templates_path)
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("register")
});
app.get("/register",(req,res)=>{
    res.render("register")
});
// create a new user in our database
app.post("/register",async(req,res)=>{
    try{

      const registerUser = new Register({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password

      })

      const registered = await registerUser.save();
      res.status(201).render("register")

    }catch(error){
        res.status(400).send(error);
    }
});
app.get("/login",(req,res)=>{
    res.render("login")
});


app.post("/login",async(req,res)=>{
    email=req.body.email;
    pswd=req.body.pswd;
   




    try {
        // Check if user with the given email exists in the database
        const user = await Register.findOne({ email });
    
        if (!user) {
          // User not found
          return res.status(401).json({ message: "Invalid email or password" });
        }
    
        // Check if the provided password matches the stored password
        if (pswd !== user.password) {
          // Passwords don't match
          return res.status(401).json({ message: "Invalid email or password" });
        }
    
        // Authentication successful
        res.render("index")
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });






app.listen(port,()=>{
    console.log('server is running at port no ',port)
});

console.log()