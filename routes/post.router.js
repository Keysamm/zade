const express = require('express')
const router = express.Router()

// Import Controllers
const {
  createPostController,
  getAllPosts,
  getPostByIdController,
  updateController,
  deletePostController,
} = require('../controllers/post.controller')

// Import validator
const { validPost } = require('../utils/valid')

router.post('/post/create', validPost, createPostController)
router.get('/post/get-all', getAllPosts)
router.get('/post/:id', getPostByIdController)
router.put('/post/update/:id', updateController)
router.delete('/post/delete/:id', deletePostController)

module.exports = router
