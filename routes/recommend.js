var beverages = require('../beverages.json');

exports.recommend = function(req, res) {
  var beverageObj = beverages["beverages"];
  var company;
  var random = Math.random();
  if(random >= 50) {
    company = 1;
  } else {
    company = 2;
  }

  var beverageList = new Array();
  for(i = 0; i < beverageObj.length; i++) {
    if(beverageObj[i]['cid'] == company) {
      beverageList.push(beverageObj[i]);
      console.log(beverageObj[i]);
    }
  }

  res.render('recommendation', {
    beverages: beverageList
  });
}
