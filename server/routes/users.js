const router = require('express').Router()
const { userController } = require('../controllers')

router.get('/starred', userController.getAllStarred)
router.get('/starred/search', userController.getRepoByFilter)
router.post('/create', userController.createRepo)
router.get('/:username', userController.getRepoByUsername)
router.delete('/unstar/:username/:reponame', userController.unstarRepo)

module.exports = router