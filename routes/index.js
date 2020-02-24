var express = require('express');
var router = express.Router();
const partySchema = require('../models/party.js')
const stallSchema = require('../models/stall.js')


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


//GET stall allocation page
router.get('/addStall/:name', function(req, res) {
res.render('stall',{name:req.params.name});
});

router.get('/stallAllocation/:name', function(req, res) {
  console.log(req.params.name);
  stallSchema.find({name:req.params.name},(err, data) => {
    if (err) console.log(err);
    else{
      console.log(data);
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

  

module.exports = router;
