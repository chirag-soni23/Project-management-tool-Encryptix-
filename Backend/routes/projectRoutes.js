const express = require('express');
const {getProject,createProject,deleteProject,updateProject} = require('../controllers/projectController.js');
const router = express.Router();
router.route('/').get(getProject).post(createProject)
router.route("/:projectId").delete(deleteProject).put(updateProject);


module.exports = router;