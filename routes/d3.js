var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/hero', function(req, res) {

  function get_hero(id, lag, callback){
    needle.get('http://tw.battle.net/api/d3/profile/' + lag + '/hero/' + id, {'json': true}, function(err, resp){
      if(err) throw err;
      callback(id, resp.body);
    });
  }
  res.send('hero');
});

module.exports = router;