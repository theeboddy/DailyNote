const Router = require('express')
const router = new Router()
const controller = require('./authController')
const postController = require('./postController')
const {check} = require('express-validator')
const authMiddleWare = require('./middleware/authMiddleWare')

router.post('/registration', controller.registration)
router.post('/auth', controller.auth)
router.get('/users', authMiddleWare, controller.getUsers)
router.post('/posts', postController.posts)
router.get('/posts', postController.getPosts)
router.delete('/posts/:id', postController.deletePost)
router.post('/posts/:postId/comments', postController.addComment);
router.get('/posts/:postId/comments', postController.getComments);

module.exports = router