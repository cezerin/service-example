const allowOrDenyRequest = (req, res, next) => {
  // req.user.account
  const deny = false;
  if (deny) {
    res.status(403).end();
  } else {
    next();
  }
}

module.exports = {
  allowOrDenyRequest: allowOrDenyRequest
}
