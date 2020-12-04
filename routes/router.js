const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


//routes

// router.get('/',  forwardAuthenticated,(req,res)=>{
//   res.render('front-pages/index')
// })
  

// router.get('/online-bank',  forwardAuthenticated,(req,res)=>{

//     res.render('front-pages/loginPage')
// });


// router.get('/dashboard', ensureAuthenticated,  forwardAuthenticated,(req,res)=>{
//     res.render('User-dashboard/dashboard')
// })

// router.get('/local-transfer', ensureAuthenticated,(req,res)=>{
//     res.render('User-dashboard/local-transfer')
// })

// router.get('/inter-transfer',ensureAuthenticated,(req,res)=>{
//     res.render('User-dashboard/inter-transfer')
// })

// router.get('/card-link',ensureAuthenticated,(req,res)=>{
//     res.render('User-dashboard/card-link')
// })

// router.get('/transaction',ensureAuthenticated,(req,res)=>{
//     res.render('User-dashboard/transactions')
// })


// router.get("/admin-login",(req,res)=>{
//     res.render('admin-dashboard/admin-login')
// })



// router.get('/admin-dashboard',forwardAuthenticated,(req,res)=>{
//   User.find({}).exec( (err, users)=>{ 
//     if(err) throw err; 
//     res.render('admin-dashboard/admin-dashboard',{'users':users}, console.log(users));
//   })

// })

// router.get('/transfer',ensureAuthenticated,forwardAuthenticated,(req,res)=>{
//     res.render('User-dashboard/progress')
// })


// router.get('/create-new',forwardAuthenticated,(req,res)=>{
//   res.render('admin-dashboard/create-new')
// })

// // create account

// router.post('/create-account',forwardAuthenticated,(req,res)=>{
//     const { fullName,idNumber,  nationality,Gender,email,  phoneNumber,
//         date_of_birth,  accountName,  accountNumber, maritalStatus,
//         username, password,password2} = req.body;

//         let errors =[];

//         if(!fullName || !idNumber || !nationality || !Gender || !email || !phoneNumber 
//             || !date_of_birth || !accountName || !accountNumber || !maritalStatus || !username
//             || !password || !password2){
//                 errors.push({msg:"please enter all fields"});
//             };
        
//             // validation
//             if (password != password2) {
//                 errors.push({ msg: 'Passwords do not match' });
//               }
             
//               if (password.length < 6) {
//                 errors.push({ msg: 'Password must be at least 6 characters' });
//               }
            
//               if (errors.length > 0) {
//                 res.render('admin-dashboard/create-new', {
                  
//                   errors,
//                   fullName ,
//                   idNumber,
//                   nationality,
//                   Gender ,
//                   email ,
//                   phoneNumber ,
//                   date_of_birth,
//                   accountName,
//                   accountNumber,
//                   maritalStatus,
//                   username,
//                   password,
//                   password2
                  
//                 });
//                 console.log(errors)
//               }
//               else {
//                 User.findOne({ username:username }).then(user => {
//                   if (user) {
//                     errors.push({ msg: 'account already exists' });
//                     res.render('admin-dashboard/create-new', {
//                         errors,
//                         fullName ,
//                         idNumber,
//                         nationality,
//                         Gender ,
//                         email ,
//                         phoneNumber ,
//                         date_of_birth,
//                         accountName,
//                         accountNumber,
//                         maritalStatus,
//                         username,
//                         password,
//                         password2
//                     });
//                   } else {
//                     const newUser = new User({
                    
//                         fullName ,
//                         idNumber,
//                         nationality,
//                         Gender ,
//                         email ,
//                         phoneNumber ,
//                         date_of_birth,
//                         accountName,
//                         accountNumber,
//                         maritalStatus,
//                         username,
//                         password
                       
//                     });
            
//                     bcrypt.genSalt(10, (err, salt) => {
//                       bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if (err) throw err;
//                         newUser.password = hash;
//                         newUser
//                           .save()
//                           .then(user => {
//                             req.flash(
//                               'success_msg',
//                               'You are now registered and can log in'
//                             );
//                             res.redirect('/admin-dashboard');
//                           })
//                           .catch(err => console.log(err));
//                       });
                     
//                     });
//                     console.log(newUser) 
//                   }
//                 });
//               }
// })

// // user login

// router.post('/login', (req, res, next,) => {
//     passport.authenticate('local', {
//       successRedirect: '/dashboard',
//       failureRedirect: '/online-bank',
//       failureFlash: true
//     })(req, res, next);
  
//   });


// //   logout
//   router.get('/logout',ensureAuthenticated, (req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/users/login');
//   });
  

  // module.exports =router;