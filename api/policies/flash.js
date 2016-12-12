module.exports=function(req,res,next){
  res.locals.flasherr={};
  if(!req.session.flasherr) return next();
  res.locals.flasherr=_.clone(req.session.flasherr);
  req.session.flasherr={};
  next();
};
