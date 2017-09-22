var Model = require('../lib/Model.js');
var extend = require('../lib/extend.js');

var UserSchema = {
  username : String,
  password : String
};

function User () {
  Model.call(this, UserSchema);
};

//Model.extend(User);

module.exports = User;