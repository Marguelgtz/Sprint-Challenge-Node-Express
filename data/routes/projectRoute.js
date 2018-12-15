const express = require('express');
const router = express.Router();

const projectDb = require('../helpers/projectModel');

//Get all Projects
router.get('/', (req, res) => {
  projectDb.get()
    .then(projects => {
      res
        .status(200)
        .json(projects)
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed to get projects"})
    })
})

//Get Projects by Id
router.get('/:id', (req, res) => {
  const {id} = req.params;
  console.log(id)
  projectDb.get(id)
    .then(project => {
      console.log(project)
      if(project) {
        res
          .status(200)
          .json(project)
      } else {
        res
          .status(404)
          .json({message: "Project not found under current id"})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed to get project"})
    })
})

//Post a new Project
router.post('/', (req, res) => {
  const project = req.body;
  if(project.name && project.description) {
    projectDb.insert(project)
      .then(newProject => {
        res
          .status(201)
          .json({created: newProject})
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "Project post failed"})
      })
  } else {
    res
      .status(400)
      .json({message: "Missing one or more (name/description)"})
  }
})

//Update Project
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const project = req.body;
  if(project.name && project.description) {
    projectDb.update(id, project)
      .then(updatedProject => {
        res
          .status(201)
          .json({Updated: updatedProject})
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "Failed to update Project"})
      })
  } else {
    res
      .status(400)
      .json({message: "Missing one or more (name/description)"})
  }
})

//Delete Project
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  projectDb.remove(id)
    .then(count => {
      res 
        .status(200)
        .json({message: `${count} deletion`})
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed to delete project"})
    })
})

module.exports = router;