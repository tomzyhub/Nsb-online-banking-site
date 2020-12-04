// localstrategy


passport.use(new LocalStrategy(
  
    {
    passReqToCallback:true,
    usernameField:"username",
    passwordField:"password"
   
      },(username,password,done)=>{
        // let query = { username: username };
    // match user
    User.findOne({username:username}).then(user =>{
        
// create new user
        if(!user){
            const newUser = new User({username,password});

            // hash password with bcrypt
            bcrypt.genSalt(newUser.password, salt, (err, hash)=>{

                if(err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user => { return done(null,user)})
                .catch(err =>{
                    return done(null, false, {msg: err});
                });
            });
            // return other users
        } else {
    //  match password
    
    bcrypt.compare(password, user.password, (err,ismatch)=>{
        if(err) throw err;

        if(ismatch){
            return done(null ,user);
            console.error(err)
        }else{

        }
        return done(null, false, {msg:"wrong password "})
    })

        }
    })
    .catch(err =>{
        return done(null, false, {msg: "error please check and retry ! "})
    })
    
})
);


passport.serializeUser( (user, done)=>{
    done(null, user.id);
})

passport.deserializeUser( (id,done)=>{
  User.findById(id ,(err, user)=>{
      done(err,user);
  })
})


 module.export = passport;