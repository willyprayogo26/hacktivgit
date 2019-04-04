const router = require('express').Router()
const { UserController } = require('../controllers')

router.get('/starred', UserController.getAllStarred)
router.get('/starred/search', UserController.getRepoByFilter)
router.post('/create', UserController.createRepo)
router.get('/:username', UserController.getRepoByUsername)
router.delete('/unstar/:username/:reponame', UserController.unstarRepo)

module.exports = router