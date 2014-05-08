var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/hero', function(req, res) {

  var lag = req.query.lag;
  var id = req.query.id;

  if(lag && id){
    get_hero(id, lag, function(id, data){
      res.json(data);
    });
  }else{
    res.send('hero');
  }

  function get_hero(id, lag, callback){
    needle.get('http://tw.battle.net/api/d3/profile/' + lag + '/hero/' + id, {'json': true}, function(err, resp){
      if(err) throw err;
      callback(id, resp.body);
    });
  }
});

module.exports = router;