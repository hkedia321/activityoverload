/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcryptjs=require('bcryptjs');
module.exports = {
	'new':function (req,res) {
    // var oldDateObj=new Date();
    // var newDateObj=new Date(oldDateObj.getTime()+60000);
    // req.session.cookie.expires=newDateObj;
    // req.session.authenticated=true;
    // console.log(req.session);
    res.view('session/new');
  },
  create:function(req,res,next){
    if(!req.param('email')||!req.param('password')){
      //return next({err:"password doesn't match"});

      var usernamePasswordRequiredError=[{name:'usernamePasswordRequiredError',message:'You must enter both a username and password'}];
      //remember that flash.err is the object being passed down whose value is another object
      //with the key of usernamePasswordRequiredError
      req.session.flasherr={
        err:usernamePasswordRequiredError
      };
      res.redirect('/session/new');
      return;
    }

    //Try to find the user by their email address
    Users.findOneByEmail(req.param('email'),function foundUser(err,user) {
      if (err) return next(err);
      //If no user found
      if (!user) {
        var noAccountError = [{name: 'noAccount', message: 'The email address' + req.param('email') + ' not found.'}];
        req.session.flasherr = {
          err: noAccountError
        };
        res.redirect('/session/new');
        return;
      }
      //Compare password
      bcryptjs.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
        if (err) return next(err);
        //if the password doesn't match
        if (!valid) {
          var usernamePasswordMismatchError = [{
            name: 'usernamePasswordMismatchError',
            message: 'Invalid username and password combination'
          }];
          req.session.flasherr = {
            err: usernamePasswordMismatchError
          };
          res.redirect('/session/new');
          return;
        }
        //log in user
        req.session.authenticated = true;
        req.session.User = user;
        res.redirect('/users/show/' + user.id);
      });
    });
  },
  destroy:function(req,res,next){
    //wipe out the session
    req.session.destroy();
    res.redirect('/session/new');
  }
};

