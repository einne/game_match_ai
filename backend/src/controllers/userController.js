function getMe(req, res) {
  return res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      game: req.user.game,
      rank: req.user.rank,
      preferredRole: req.user.preferredRole,
      serverRegion: req.user.serverRegion,
      language: req.user.language,
      playTime: req.user.playTime,
      bio: req.user.bio
    }
  });
}

module.exports = { getMe };
