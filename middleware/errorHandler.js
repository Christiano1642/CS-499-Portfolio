module.exports = function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
  if (req.originalUrl.startsWith('/api')) {
    res.json({ error: err.message || 'Internal Server Error' });
    
  }
  else {
    res.render({ message: err.name + ":" + err.message });
  }
};
