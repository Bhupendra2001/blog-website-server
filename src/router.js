const router = require('express').Router()

const { login, register, logout } = require('./controllers/userController')
const { CreatePost , getPost , getPosts , updatePost , deletePost} = require('./controllers/postController')
const { Authenticated , Authorization  } = require('./middleware/middle')


//-------------------User APIs---------------------//



router.post('/api/auth/register', register)
router.post('/api/auth/login', login)
router.post('/api/auth/logout', logout)



//----------------------Blog APIs----------------//


router.post('/api/posts/:userId' , Authenticated , CreatePost )
router.get('/api/posts' , getPosts )
router.get('/api/posts/:blogId', getPost)
router.patch('/api/posts/:blogId/:userId', Authenticated , Authorization , updatePost)
router.delete('/api/posts/:blogId/:userId', Authenticated , Authorization , deletePost)



module.exports = router