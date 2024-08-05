const express = require('express');
const {getTask,createTask,deleteTask} = require('../controllers/taskController.js');

const router = express.Router();
router.route("/:projectid").get(getTask);
router.route('/').post(createTask);
router.route("/:taskId").delete(deleteTask);




module.exports = router;