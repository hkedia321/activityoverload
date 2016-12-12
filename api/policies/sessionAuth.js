/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return;
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  else{
    var requiredLoginError=[{name:'requiredLoginError',message:'You must be signned in'}];
    req.session.flasherr={
      err:requiredLoginError
    };
    res.redirect('/session/new');
    return;
  }
};
