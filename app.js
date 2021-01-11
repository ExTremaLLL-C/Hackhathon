const express = require('express');
const session = require('express-session')({secret:'User is logged or not?!', resave:false, saveUninitialized:false});
const database = require('./db');
const routsGet = require('./routs/get');
const bp = require('body-parser');
const mongoose = require('mongoose');
const User = require('./MongoModels/adminListBase');
const Doctor = require('./MongoModels/doctorListBase');
const Clinic = require('./MongoModels/clinicListBase');
const News = require('./MongoModels/newsListBase');
const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;



let PORT = process.env.PORT||3000;
const app = express();
app.use(bp.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(express.static('Image'));
app.use(session);
app.set('view engine','ejs');


//passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect(database.url,{useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex:true})
         .then(console.log("Connected to data base"))
         .catch((err)=>console.log(`ERROR:${err}`));



//GET:
app.use('/medic',routsGet);



//POST:
app.post('/medic/register',(req,res)=>
{
    const newAdmin = new User(
        {
             name:req.body.name,
             username:req.body.email,
             password:req.body.pass
        }
    )
    newAdmin.save();
res.redirect('login');
});

app.post('/medic/login',
  passport.authenticate('local', 
  {
      successRedirect: '/medic/admin',
      failureRedirect: '/medic/login'
  })                                
);


app.post('/medic/DoctorsRegistration',(req,res)=>
{
  const newDoctor = new Doctor({
        Image:req.body.img,
        username:req.body.name,
        Mail:req.body.email,
        About:req.body.textA
  });

  newDoctor.save();
 res.redirect(`/medic/doctors`);
});

app.post('/medic/ClinicRegistration',(req,res)=>
{
    const newClinic = new Clinic(
      {
        Image:req.body.img,
        username:req.body.name,
        Mail:req.body.email,
        About:req.body.textA
      }
    );
    newClinic.save();
    res.redirect(`/medic/hospitals`);
});


app.post('/medic/createNews',(req,res)=>
{
    const newN = new News(
      {
        Image:req.body.img,
        username:req.body.name,
        about:req.body.textA
      }
    );
    newN.save();
    res.redirect('/medic'); 
});

app.listen(PORT,()=>
{
    console.log(`listen to port:${PORT}`);
})