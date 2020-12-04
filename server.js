const express = require('express');
const mongoose = require('mongoose');
const passport =require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const Port = process.env.port || 3000 ;
const bcrypt = require('bcrypt');
const User = require('./models/User');


const app = express();

// Passport Config
require('./passport/setup')(passport);

const db = require('./config/keys').url;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
    useUnifiedTopology:true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  app.set('view engine', 'ejs');
  // Express body parser
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static('public'));
// Express session
app.use(
  session({
    secret: 'verysecret',
    resave: true,
    saveUninitialized: true
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.messages = req.flash('messages');
  res.locals.errors = req.flash('errors');
  next();
});


//routes

app.get('/', (req,res)=>{
  res.render('front-pages/index')
})
  

app.get('/online-bank', (req,res)=>{

    res.render('front-pages/loginPage')
});


app.get('/dashboard',  (req,res)=>{
    res.render('User-dashboard/dashboard')
})

app.get('/local-transfer', (req,res)=>{
    res.render('User-dashboard/local-transfer')
})

app.get('/inter-transfer',(req,res)=>{
    res.render('User-dashboard/inter-transfer')
})

app.get('/card-link',(req,res)=>{
    res.render('User-dashboard/card-link')
})

app.get('/transaction',(req,res)=>{
    res.render('User-dashboard/transactions')
})


app.get("/admin-login",(req,res)=>{
    res.render('admin-dashboard/admin-login')
})



app.get('/admin-dashboard',(req,res)=>{
  User.find({}).exec( (err, users)=>{ 
    if(err) throw err; 
    res.render('admin-dashboard/admin-dashboard',{'users':users});
  })

})

app.get('/transfer',(req,res)=>{
    res.render('User-dashboard/progress')
})


app.get('/create-new',(req,res)=>{
  res.render('admin-dashboard/create-new')
})

// create account
app.post('/create-account',(req,res)=>{
    const { fullName,idNumber,  nationality,Gender,email,  phoneNumber,
        date_of_birth,  accountName,  accountNumber, maritalStatus,
        username, password,password2} = req.body;

        let errors =[];

        if(!fullName || !idNumber || !nationality || !Gender || !email || !phoneNumber 
            || !date_of_birth || !accountName || !accountNumber || !maritalStatus || !username
            || !password || !password2){
                errors.push({msg:"please enter all fields"});
            };
        
            // validation
            if (password != password2) {
                errors.push({ msg: 'Passwords do not match' });
              }
             
              if (password.length < 6) {
                errors.push({ msg: 'Password must be at least 6 characters' });
              }
            
              if (errors.length > 0) {
                console.log(errors)
                res.render('admin-dashboard/create-new', {
                  
                  errors,
                  fullName ,
                  idNumber,
                  nationality,
                  Gender ,
                  email ,
                  phoneNumber ,
                  date_of_birth,
                  accountName,
                  accountNumber,
                  maritalStatus,
                  username,
                  password,
                  password2
                  
                });
                
              }
              else {
                User.findOne({ username:username }).then(user => {
                  if (user) {
                    errors.push({ msg: 'account already exists' });
                    res.render('admin-dashboard/create-new', {
                        errors,
                        fullName ,
                        idNumber,
                        nationality,
                        Gender ,
                        email ,
                        phoneNumber ,
                        date_of_birth,
                        accountName,
                        accountNumber,
                        maritalStatus,
                        username,
                        password,
                        password2
                    });
                  } else {
                    const newUser = new User({
                    
                        fullName ,
                        idNumber,
                        nationality,
                        Gender ,
                        email ,
                        phoneNumber ,
                        date_of_birth,
                        accountName,
                        accountNumber,
                        maritalStatus,
                        username,
                        password
                       
                    });
            
                    bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                          .save()
                          .then(user => {
                            req.flash(
                              'success_msg',
                              'You are now registered and can log in'
                            );
                            res.redirect('/admin-dashboard');
                          })
                          .catch(err => console.log(err));
                      });
                     
                    });
                    console.log(newUser) 
                  }
                });
              }
})

// user login

app.post('/login', (req, res, next,) => {
  
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/online-bank',
      failureFlash: true
    })(req, res, next);
  });


// //   logout
  app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
 


 
// server listerner
app.listen(Port, console.log(
    `program started on server ${Port} hello benny`
));