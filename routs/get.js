const routs = require('express').Router();
const doctors = require('../MongoModels/doctorListBase');
const clinicks = require('../MongoModels/clinicListBase');
const news = require('../MongoModels/newsListBase');

routs.get('/chat',(req,res)=>
{
    res.render('chat');
})

routs.get('/', async(req,res)=>
{
    const newN = await news.find();

     res.render('index',{newN:newN});
});

routs.get('/createNews',(req,res)=>
{
   res.render('createNews');
});

//sclinicks
routs.get('/ClinicRegistration',(req,res)=>
{
res.render('registeClinic');
});

routs.get('/hospitals', async (req,res)=>
{
    const allClinicks = await clinicks.find();
    res.render('clinicks',{allClinicks:allClinicks});
});

routs.get('/hospitals/:id', async (req,res)=>
{
   const hopis = await clinicks.findById(req.params.id);
   res.render('singlepages/hospital',{hopis:hopis});
});


//doctors pages

routs.get('/doctors', async (req,res)=>
{
    const doctorAll = await doctors.find() ;
res.render('doctors',{doctorAll:doctorAll});
});

routs.get('/doctors/:id', async (req,res)=>
{
    const doc =  await doctors.findById(req.params.id);
    res.render('singlepages/doc',{doc:doc});
})
//////////////////////////////////////




/////////////////////////////////////


routs.get('/about',(req,res)=>
{
res.render('about');
});

routs.get('/login',(req,res)=>
{
res.render('login');
});

routs.get('/register',(req,res)=>
{
res.render('register');
});

routs.get('/admin',isLog,(req,res)=>
{
res.render('admin');
});


routs.get('/logout',(req,res)=>
{
req.logOut();
res.redirect('/medic/login');
});



routs.get('/DoctorsRegistration',(req,res)=>
{
res.render('registerDoctor');
});

//functions
function isLog(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/medic/login');
}


module.exports = routs;