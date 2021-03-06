var express = require('express');
var router = express.Router();
const partySchema = require('../models/party.js')
const stallSchema = require('../models/stall.js')


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/home', function(req, res) {
  res.render('home', { title: 'Express' });
});


//GET stall allocation page
router.get('/addStall/:name', function(req, res) {
res.render('stall',{name:req.params.name});
});

//GET updatePartyForm

router.get('/updateParty/:id', function(req, res) {
  partySchema.find({_id:req.params.id},(err,data) =>{
    if (err) console.log(err);
    else{
      console.log(data);
    res.render('updatePartyForm', { "party" : data });
  }
  });
  });

//GET updateStallForm

router.get('/updateStall/:id', function(req, res) {
  stallSchema.find({_id:req.params.id},(err,data) =>{
    if (err) console.log(err);
    else{
      console.log(data);
    res.render('updateStallForm', { "stall" : data });
  }
  });
  });

router.get('/stallAllocation/:name', function(req, res) {
  stallSchema.find({name:req.params.name},(err, data) => {
    if (err) console.log(err);
    else{
    res.render('displayStall', { "stall" : data });
  }
  
})
});





//GET Display page

router.get('/display', function(req, res) {
  partySchema.find({},(err, data) => {
    if (err) console.log(err);
    else{
    res.render('display', { "party" : data });
  }
});  

});

//GET stallAllocation page

router.get('/allStalls', function(req, res) {
  stallSchema.find({},(err, data) => {
    if (err) console.log(err);
    else{
    res.render('stallAllocation', { "stall" : data });
  }
});  

});

//GET collections page

router.get('/collections', function(req, res) {
  stallSchema.find({},(err, data) => {
    if (err) console.log(err);
    else{
    res.render('collections', { "stall" : data });
  }
});  

});




/* GET party page */

router.get('/party', function(req, res) {

    // var query = partySchema.find({})
    //     query.exec((err, data) => {

    //       console.log(data);
    //       res.render('party',{ data : data })

    //     });
    res.render('party');
        
});


router.post('/login', function(req, res) {
  if(req.body.username === "admin@xyz.com" && req.body.password === "admin"){
    res.render('tables', { title: 'Express'});
  } else {
    res.redirect('/');
  }
    
});


/* GET party details*/

router.post('/party', function(req, res) {
  let newParty = new partySchema(req.body);
  newParty.save()
    .then(res.redirect('/display'))
    .catch((err) => console.log(err))
});

//GET stall details

router.post('/addStall', function(req, res) {
  console.log(req.body);
  let newStall = new stallSchema(req.body);
  newStall.save()
    .then(res.redirect('/display'))
    .catch((err) => console.log(err))
});

//DELETE party row

router.get('/deleteParty/:id', function(req, res, next){
  
  var query = { _id: req.params.id };
  partySchema.find(query,(err,data) =>{
    if (err) console.log(err);
    var vendorName = data[0].name;
    stallSchema.deleteMany({name:vendorName}, (err,data) =>{

    

    partySchema.deleteOne(query, function (err, result) {

      if (err) {
  
          console.log("error query");
  
      }

  res.redirect('/display')
    })
    })
})
});

//DELETE stall row

router.get('/deleteStall/:id', function(req, res, next){
  
  var query = { _id: req.params.id };
  stallSchema.find({_id:req.params.id},(err,data) =>{
    
    stallSchema.deleteOne(query, function (err, result) {

      if (err) {
  
          console.log("error query");
  
      }
  res.redirect('/stallAllocation/'+data[0].name+'')
})
})
});

//UPDATE party row

router.post('/updateParty/:id', function(req,res) {
  
  var myquery = { _id:req.params.id };
  var newvalues = req.body;
  partySchema.updateOne(myquery, newvalues, function(err) {
    if (err) throw err;
    else{
      res.redirect('/display');
    }
    });
});

//UPDATE stall row

router.post('/updateStall/:id', function(req,res) {
  
  var myquery = { _id:req.params.id };
  var newvalues = req.body;
  stallSchema.updateOne(myquery, newvalues, function(err) {
    if (err) throw err;
    else{
      console.log(newvalues.name)
      res.redirect('/stallAllocation/'+newvalues.name+'');
    }
    });
});

module.exports = router;
