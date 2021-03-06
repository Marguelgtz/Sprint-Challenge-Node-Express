const express = require('express');
const router = express.Router();

const actionDb = require('../helpers/actionModel');

//Get all actions 
router.get('/', (req, res) => {
  actionDb.get()
    .then(actions => {
      res
        .status(200)
        .json(actions)
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed to get actions"})
    })
})

//Get action by id
router.get('/:id', (req, res) => {
  const {id} = req.params;
  actionDb.get(id)
    .then(action => {
      if(action) {
        res 
          .status(200)
          .json(action)
      } else {
        res
          .status(404)
          .json({message: "Action not found under current id"})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed to get action"})
    })
})

//Post a new action 
router.post('/', (req, res) => {
  const action = req.body;
  if(action.project_id && action.description && action.notes) {
    actionDb.insert(action)
      .then(newAction => {
        res
          .status(200)
          .json({Added: newAction})
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "Failed to add action"})
      })
  } else {
    res
      .status(400)
      .json({message: "Missing on or more (project_id/description/notes)"})
  }
})

//Edit an action 
router.put('/:id', (req,res) => {
  const {id} = req.params;
  const action = req.body;
  if(action.project_id && action.description && action.notes) {
    actionDb.update(id, action)
      .then(updatedAction => {
        console.log(updatedAction)
        res
          .status(201)
          .json(updatedAction)
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "Could not update the action"})
      })
  } else {
    res
      .status(400)
      .json({message: "Missing on or more (project_id/description/notes)"})
  }
})

//Delete Action
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  actionDb.remove(id)
    .then(count => {
      console.log(count)
      res
        .status(200)
        .json({message:`${count} action removed`})
    })
    .catch(err => {
      res
        .status(500)
        .catch({message: "Failed to remove Action"})
    })
})

module.exports = router;