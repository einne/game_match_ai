function getMe(req, res) {
  return res.json({
    message: 'Protected profile endpoint (placeholder).',
    user: req.user
  });
}

module.exports = { getMe };
