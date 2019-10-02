const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);


router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error("dsfjiosd",err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0){
      const removeIndex = post.dislikes
      .map(dislike => dislike.user.toString())
      .indexOf(req.user.id);

    post.dislikes.splice(removeIndex, 1);
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post);
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.dislikes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already disliked' });
    }
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
      const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    post.dislikes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post);
    }

    post.dislikes.unshift({ user: req.user.id });
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
