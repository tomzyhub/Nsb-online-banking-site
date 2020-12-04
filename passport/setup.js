const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
const User = require('../models/User');

module.exports = function(passport) {


    passport.use(new LocalStrategy(
        (username, password, done) => {
          //for debugging
          console.log('*** in passport.use')
       
          User.findOne({ username}, function(err, user) {
            //for debugging
            console.log('*** in User.findOne callback')
            if (err) {
              console.log('*** err', err)
              return done(err);
            }
             if (!user) {   
                //   myproblem
              console.log('*** no username')
              return done(null, false, {
                message: 'Incorrect username.'
              });
            }
            if (!user.validPassword(password)) {
              console.log('*** bad password')
              return done(null, false, {
                message: 'Incorrect password.'
              });
            }
            console.log('*** found?')
            return done(null, user);
          });
        }
      ));

//   passport.use(
//     new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
//       // Match user
//       User.findOne({
//         username: username
//       })
//       .then(user => {
//         if (!user) {
//           return done(null, false, { message: 'That username is not registered' });
//         }

//         // Match password
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//           if (err) throw err;
//           console.log(err);
//           if (isMatch) {
//             return done(null, user);
//           } else {
//             return done(null, false, { message: 'Password incorrect' });
//           }
//         });
//       });
//     })
//   );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log(user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
      console.log(err)
     
    });
  });
};