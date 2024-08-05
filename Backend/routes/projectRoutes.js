const express = require('express');
const {getProject,createProject,deleteProject} = require('../controllers/projectController.js');
const router = express.Router();
router.route('/').get(getProject).post(createProject)
router.route("/:projectId").delete(deleteProject);


module.exports = router;