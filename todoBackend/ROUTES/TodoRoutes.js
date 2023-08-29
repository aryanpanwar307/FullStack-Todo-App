const express = require('express');
const router = express.Router();
const Todo = require('../MODELS/Todo')//this would be the refrence of schema that is if you want 
// to add things to databse you would be making new Todo that would refer directly to database.

router.get('/testapi',(req,res) => {
    res.json({message:'routes api is working'})
})

router.post('/createtodo',async(req,res) => {
    try{
        const {title,description} = req.body;
        const newTodo = new Todo({
            title,
            description
        });
        await newTodo.save();
        res.json({message:"todo has been created"})
    }
    catch(err){
        res.status(500).json({
            message:err.messsage
        })
    }
})

router.get('/getalltodos', async(req,res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json({
            todos,
            message:"todos fetched successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
})

router.get('/gettodo/:id', async(req,res) => {
    try{
        const todo = await Todo.findById(req.params.id);
        if(!todo)
        {
            res.status(404).json({message:"todo not found"})
        }
        res.status(200).json({
            todo,
            message:"todo fetched successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
})

router.put('/updatetodo/:id', async(req,res) => {
    try{
        const {title, description, completed} = req.body;
        const todo = await Todo.findByIdAndUpdate(req.params.id,{completed},{new:true} )
        if(!todo)
        {
            res.status(404).json({message:"todo not found"})
        }
        res.status(200).json({
            todo,
            message:"todo updated successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
})

router.delete('/deletetodo/:id',async(req,res) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo)
        {
            res.status(404).json({message:"todo not found"})
        }
        res.status(200).json({message:"deleted successfully"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router;