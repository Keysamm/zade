const Post = require('../models/Post')
const { validationResult } = require('express-validator')

exports.createPostController = async (req, res) => {
  const { title, description, author } = req.body
  const errors = validationResult(req)
  // Validator to req.body
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
  try {
    const posts = new Post({
      title,
      description,
      author,
    })
    await posts.save((err, save) => {
      if (err) {
        console.log(err || 'Server error')
        return res.status(401).json({
          errors: [{ message: 'Server Error' }],
        })
      } else {
        return res.status(201).json({
          success: true,
          message: posts,
        })
      }
    })
  } catch (err) {
    return res.status(400).json({
      errors: [{ message: 'Do not success' }],
    })
  }
}

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    return res.status(200).json(posts)
  } catch (err) {
    return res.status(400).json({
      errors: [{ message: 'Do not success' }],
    })
  }
}

// Get post by id
exports.getPostByIdController = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    res.status(200).json({
      success: true,
      message: post,
    })
  } catch (err) {
    return res.status(400).json({
      errors: [{ message: 'Do not success' }],
    })
  }
}

// Update post by id
exports.updateController = (req, res) => {
  const { title, description, author } = req.body

  Post.findOne({ _id: req.params.id }, async (err, post) => {
    if (err || !post) {
      return res.status(400).json({
        errors: [{ message: 'Post not found' }],
      })
    }
    if (!title) {
      return res.status(400).json({
        errors: [{ message: 'Title is required' }],
      })
    } else {
      post.title = title
    }
    if (!description) {
      return res.status(400).json({
        errors: [{ message: 'Description is required' }],
      })
    } else {
      post.description = description
    }
    if (!author) {
      return res.status(400).json({
        errors: [{ message: 'Author is required' }],
      })
    } else {
      post.author = author
    }
    await post.save((err, updatedPost) => {
      if (err) {
        console.log('POST UPDATE ERROR', err)
        return res.status(400).json({
          errors: [{ message: 'Post update failed' }],
        })
      }
      res.status(200).json({
        success: true,
        message: updatedPost,
      })
    })
  })
}

// Delete post by id
exports.deletePostController = async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.id })
    res.status(200).json({
      success: true,
      message: 'Portfolio delete success',
    })
  } catch (err) {
    return res.status(400).json({
      errors: [{ message: 'Do not success' }],
    })
  }
}
