var express = require('express');
var router = express.Router();

var needle = require('needle');

/* GET users listing. */
router.get('/hero', function(req, res, next) {

  var lag = req.query.lag.split('#').join('-') || 'Xiao-1116';
  // var lag = 'Xiao-1116';
  var id = req.query.id || '36459693';

  if(lag && id){
    get_hero(id, lag, function(id, data){
      console.log(data);
      res.render('./hero', {j :data});
    });
  }else{
    res.send('抱歉未找到对应角色信息！');
  }

  function get_hero(id, lag, callback){
    needle.get('http://tw.battle.net/api/d3/profile/' + lag + '/hero/' + id, {'json': true}, function(err, resp){
      if(err) throw err;
      callback(id, resp.body);
    });
  }
});

router.get('/item', function(req, res){
  needle.get('http://tw.battle.net/api/d3/data/' + req.query.data, {'json': true}, function(err, resp){
    if(err) throw err;
    res.json(resp.body);
  });
});

module.exports = router;