var chai = require('chai');
chai.should();

var db = require('../lib/DataStore').store;
var Model = require('../lib/Model');
var User = require('../lib/User');
var Account = require('../lib/Account');
var Model = require('../lib/Model');
var Message = require('../lib/Message');
var Location = require('../lib/Location');

describe('Model', function() {
  
  var model;
  var testSchema = {
    a : String,
    b : String,
    c : Number,
    d : Date
  }
  beforeEach(function () {
    model = new Model(testSchema);
  });
  
  describe('constructor', function() {
    it('should accept a single argument `schema` and assign it\'s value to a public property named `schema`', function() {
      model.should.have.property('schema').deep.equal(testSchema);
    });

    it('should have a public property named `id` set to `null`', function() {
      model.should.have.property('id').to.equal.null;
    });
    
    it('should set a new public property for each key in `schema`, using the same name as the key, and set to an initial value of null', function() {
      model.should.have.property('a').to.equal.null;
      model.should.have.property('b').to.equal.null;
      model.should.have.property('c').to.equal.null;
      model.should.have.property('d').to.equal.null;
    });

    it('should set a new default value of an empty array in the datastore using the constructor\'s name as the key, if that key does not already exist in the datastore', function() {
      db.should.have.property('Model').to.be.an('array');
      db.should.have.property('Model').deep.equal([]);
    });

  });

  describe('inheritable static methods', function() {
    
    afterEach(function () {
      db.Model = [];
    });

    it('should have a method named `getNextId` that returns the next successive number in the datastore for this model, the highest `id` plus one.', function() {
      Model.getNextId().should.equal(1);
    });

    it('should have a method named `find` that accepts a single argument `id` that returns the stored data object in the datastore for this model, having the same `id` value passed in from the `find` argument', function() {
      var m1 = new Model();
      m1.a = 'A1';
      m1.save();
      
      var m2 = new Model();
      m2.a = 'A2';
      m2.save();

      Model.find(1).should.have.property('a').to.equal('A1');
      Model.find(2).should.have.property('a').to.equal('A2');
    });
    
    it('should have a method named `extend` that accepts a single argument `klass`, and extends each static and prototype method of `Model` onto `klass`', function() {
      function Obj(){
      }
      Model.extend(Obj);
      var obj = new Obj();
      obj.should.have.property('save');
      obj.should.have.property('destroy');
      Obj.should.have.property('find');
      Obj.should.have.property('getNextId');
    });
    
  });

  describe('prototype', function() {
    
    afterEach(function () {
      db.Model = [];
    });

    it('should have a method named `save` that sets it\'s `id` to the next id in this model\'s datastore, if this object\'s `id` is null', function() {
      var m1 = new Model();
      m1.a = 'A1';
      m1.save();
      
      var m2 = new Model();
      m2.a = 'A2';
      m2.save();

      Model.find(1).should.have.property('a').to.equal('A1');
      Model.find(2).should.have.property('a').to.equal('A2');
    });

    it('should have a method named `destroy` that removes the stored data object from the datastore for this model, if it has an `id` set', function() {
      var m1 = new Model();
      m1.a = 'A1';
      m1.save();
      
      var m2 = new Model();
      m2.a = 'A2';
      m2.save();
      
      m1.destroy();
      chai.assert.isNull( Model.find(1) );

      Model.find(2).should.have.property('a').to.equal('A2');
    });
    
  });

});

describe('User', function() {
  
  describe('is a Model', function() {
    var user;
    beforeEach(function () {
      user = new User();
    });

    it('should have a public property named `id` set to `null`', function() {
      user.should.have.property('id').to.equal.null;
    });

    it('should set the schema to UserSchema', function() {
      user.should.have.property('schema').to.deep.equal({ username : String, password : String });
    });
    
    it('should set a new public property for each key in `schema`, using the same name as the key, and set to an initial value of null', function() {
      user.should.have.property('username').to.equal.null;
      user.should.have.property('password').to.equal.null;
    });

    it('should have a "space" reserved in the data store', function() {
      db.should.have.property('User').to.be.an('array');
      db.should.have.property('User').deep.equal([]);
    });
  });

  describe('behaves like a Model and', function() {
    var u1;
    var u2;
    beforeEach(function () {
      u1 = new User();
      u1.username = 'username1';
      u1.password = 'hunter1';
      u1.save();
      
      u2 = new User();
      u2.username = 'username2';
      u2.password = 'hunter2';
      u2.save();
    });

    afterEach(function () {
      db.User = [];
    });

    it('should be "savable"', function() {
      db.User.should.have.length(2);
      db.User[0].should.deep.property('id').to.equal(1);
      db.User[0].should.deep.property('username').to.equal('username1');
      db.User[0].should.deep.property('password').to.equal('hunter1');
      db.User[1].should.deep.property('id').to.equal(2);
      db.User[1].should.deep.property('username').to.equal('username2');
      db.User[1].should.deep.property('password').to.equal('hunter2');
      
    });

    it('should be "findable"', function() {
      User.find(1).should.have.property('username').to.equal('username1');
      User.find(2).should.have.property('username').to.equal('username2');
    });
    
    it('should be "destroyable"', function() {
      u1.destroy();
      chai.assert.isNull( User.find(1) );

      User.find(2).should.have.property('username').to.equal('username2');
    });  
  });

});

describe('Account', function() {
  
  describe('is a Model', function() {
    var account;
    beforeEach(function () {
      account = new Account();
    });

    it('should have a public property named `id` set to `null`', function() {
      account.should.have.property('id').to.equal.null;
    });

    it('should set the schema to AccountSchema', function() {
      account.should.have.property('schema').to.deep.equal({ user : User, accountNumber : Number, address : String, balance : Number });
    });
    
    it('should set a new public property for each key in `schema`, using the same name as the key, and set to an initial value of null', function() {
      account.should.have.property('user').to.equal.null;
      account.should.have.property('accountNumber').to.equal.null;
      account.should.have.property('address').to.equal.null;
      account.should.have.property('balance').to.equal.null;
    });

    it('should have a "space" reserved in the data store', function() {
      db.should.have.property('Account').to.be.an('array');
      db.should.have.property('Account').deep.equal([]);
    });
  });

  describe('behaves like a Model and', function() {
    var u1;
    var u2;
    var a1;
    var a2;
    beforeEach(function () {
      u1 = new User();
      u1.username = 'username1';
      u1.save();

      u2 = new User();
      u2.username = 'username2';
      u2.save();

      a1 = new Account();
      a1.user = u1;
      a1.accountNumber = 1234;
      a1.address = '1234 HI';
      a1.balance = 12.34;
      a1.save();
      
      a2 = new Account();
      a2.user = u2;
      a2.accountNumber = 4567;
      a2.address = '4567 HI';
      a2.balance = 45.67;
      a2.save();
    });

    afterEach(function () {
      db.User = [];
      db.Account = [];
    });

    it('should be "savable"', function() {
      db.Account.should.have.length(2);
      db.Account[0].should.deep.property('id').to.equal(1);
      db.Account[0].should.deep.property('accountNumber').to.equal(1234);
      db.Account[0].should.deep.property('address').to.equal('1234 HI');
      db.Account[0].should.deep.property('balance').to.equal(12.34);
      db.Account[1].should.deep.property('id').to.equal(2);
      db.Account[1].should.deep.property('accountNumber').to.equal(4567);
      db.Account[1].should.deep.property('address').to.equal('4567 HI');
      db.Account[1].should.deep.property('balance').to.equal(45.67);
      
    });

    it('should be "findable"', function() {
      Account.find(1).should.have.property('accountNumber').to.equal(1234);
      Account.find(2).should.have.property('accountNumber').to.equal(4567);
    });
    
    it('should be "destroyable"', function() {
      a1.destroy();
      chai.assert.isNull( Account.find(1) );

      Account.find(2).should.have.property('accountNumber').to.equal(4567);
    });  
  });

});

describe('Message', function() {
  
  describe('is a Model', function() {
    var account;
    beforeEach(function () {
      account = new Message();
    });

    it('should have a public property named `id` set to `null`', function() {
      account.should.have.property('id').to.equal.null;
    });

    it('should set the schema to AccountSchema', function() {
      account.should.have.property('schema').to.deep.equal({ from : User, to : User, message : String, sent : Date });
    });
    
    it('should set a new public property for each key in `schema`, using the same name as the key, and set to an initial value of null', function() {
      account.should.have.property('from').to.equal.null;
      account.should.have.property('to').to.equal.null;
      account.should.have.property('message').to.equal.null;
      account.should.have.property('sent').to.equal.null;
    });

    it('should have a "space" reserved in the data store', function() {
      db.should.have.property('Account').to.be.an('array');
      db.should.have.property('Account').deep.equal([]);
    });
  });

  describe('behaves like a Model and', function() {
    var u1;
    var u2;
    var m1;
    var m2;
    beforeEach(function () {
      u1 = new User();
      u1.username = 'username1';
      u1.save();

      u2 = new User();
      u2.username = 'username2';
      u2.save();

      m1 = new Message();
      m1.from = u1;
      m1.to = u2;
      m1.message = 'hi';
      m1.sent = Date.now();
      m1.save();
      
      m2 = new Message();
      m2.from = u2;
      m2.to = u1;
      m2.message = ':)';
      m2.sent = Date.now();
      m2.save();
    });

    afterEach(function () {
      db.User = [];
      db.Message = [];
    });

    it('should be "savable"', function() {
      db.Message.should.have.length(2);
      db.Message[0].should.deep.property('from').to.equal(u1);
      db.Message[0].should.deep.property('to').to.equal(u2);
      db.Message[0].should.deep.property('message').to.equal('hi');
      db.Message[0].should.deep.property('sent').to.equal(m1.sent);
      db.Message[1].should.deep.property('from').to.equal(u2);
      db.Message[1].should.deep.property('to').to.equal(u1);
      db.Message[1].should.deep.property('message').to.equal(':)');
      db.Message[1].should.deep.property('sent').to.equal(m2.sent);
    });

    it('should be "findable"', function() {
      Message.find(1).should.have.property('message').to.equal('hi');
      Message.find(2).should.have.property('message').to.equal(':)');
    });
    
    it('should be "destroyable"', function() {
      m1.destroy();
      chai.assert.isNull( Message.find(1) );

      Message.find(2).should.have.property('message').to.equal(':)');
    });  
  });

});

describe('Location', function() {
  
  describe('is a Model', function() {
    var account;
    beforeEach(function () {
      account = new Location();
    });

    it('should have a public property named `id` set to `null`', function() {
      account.should.have.property('id').to.equal.null;
    });

    it('should set the schema to AccountSchema', function() {
      account.should.have.property('schema').to.deep.equal({ lat : Number, lng : Number });
    });
    
    it('should set a new public property for each key in `schema`, using the same name as the key, and set to an initial value of null', function() {
      account.should.have.property('lat').to.equal.null;
      account.should.have.property('lng').to.equal.null;
    });

    it('should have a "space" reserved in the data store', function() {
      db.should.have.property('Location').to.be.an('array');
      db.should.have.property('Location').deep.equal([]);
    });
  });

  describe('behaves like a Model and', function() {
    var l1;
    var l2;
    beforeEach(function () {
      l1 = new Location();
      l1.lat = 21.308857;
      l1.lng = -157.808458;
      l1.save();
      
      l2 = new Location();
      l2.lat = 21.292034;
      l2.lng = -157.821608;
      l2.save();
    });

    afterEach(function () {
      db.Location = [];
    });

    it('should be "savable"', function() {
      db.Location.should.have.length(2);
      db.Location[0].should.deep.property('lat').to.equal(21.308857);
      db.Location[0].should.deep.property('lng').to.equal(-157.808458);
      db.Location[1].should.deep.property('lat').to.equal(21.292034);
      db.Location[1].should.deep.property('lng').to.equal(-157.821608);
    });

    it('should be "findable"', function() {
      Location.find(1).should.have.property('lat').to.equal(21.308857);
      Location.find(2).should.have.property('lat').to.equal(21.292034);
    });
    
    it('should be "destroyable"', function() {
      l1.destroy();
      chai.assert.isNull( Location.find(1) );

      Location.find(2).should.have.property('lat').to.equal(21.292034);
    });  
  });

});
