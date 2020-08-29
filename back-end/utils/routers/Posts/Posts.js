var express = require('express')
var router = express.Router()
const { nonAdminAuth, AdminAuth } = require('../../Middleware/Auth')

Post = require('../../db/Models/Post')



router.post('/savePost', AdminAuth, async (req, res) => {
  data = req.body
  post = new Post({...data, author: req.user})
  await post.save()
  res.send(post._id)
})

router.get('/loadPosts', async (req, res) => {
  page = req.query.page
  const posts = await Post.find({})
    .limit(10)
    .skip(page * 10)
    .select("-body -__v -views")
    .sort({createdAt: -1})
    
    res.send(posts)
})

router.get('/fetchPost', async (req, res) => {
  id = req.query.id
  const post = await Post.find({_id: id})
    .select(" -__v -views")
    
  res.send(post[0])
})

  
module.exports = router