/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function (req,res){
    res.view();
  },
  create: function (req,res,next) {
    //create user with form data in new.ejs
    Users.create(req.allParams(), function userCreated(err,user){
     //if error
      if(err)
      {
        //available till user closes
        req.session.flasherr={
          err:err
        }
        console.log(err);
        res.redirect('/users/new');
        return res;
      }
      //success- redirect to show action
      res.redirect('/users/show/'+user.id);
    });
  },
  show:function(req,res,next){
    Users.findOne(req.param('id'),function foundUser(err,user){
      if(err) return next(err);
      if(!user) return next();
      res.view({
        user: user
      });
    });
  },
  index: function (req,res,next) {
    Users.find(function foundUser(err,users) {
      if(err) return next(err);
      res.view({
        users:users
      });
    });
  },
  edit:function(req,res,next){
    //find the user from the id passed in params
    Users.findOne(req.param('id'),function foundUser(err,user){
      if(err) return next(err);
      if(!user) return next();

      res.view({
        user:user
      });
    });
  },
  update:function(req,res,next){
    Users.update(req.param('id'),req.allParams(),function userUpdated(err){
      if(err){
        return res.redirect('/users/edit/'+req.param('id'));
      }
      res.redirect('/user/show/'+req.param('id'));
    });
  },
  destroy:function (req,res,next) {
    Users.findOne(req.param('id'),function foundUser(err,user){
      if(err) return next(err);
      if(!user) return next('User doesn\'t exist.' );
      Users.destroy(req.param('id'),function userDestroyed(err) {
        if(err) return next(err);
      });
      res.redirect('/users');
    });

  }
};

