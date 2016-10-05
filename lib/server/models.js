function getByUsername (username, callback) {
  if (username === 'admin') {
    return callback(null, true);
  }

  return callback (null, false);
}

module.exports = {
  users: {
    getByUsername: getByUsername
  }  
};