import {RequestHandler} from  "express"
import Todo from "../models/todo.model";
import { CustomError } from "../helpers/error.helper";






export const getTodos:RequestHandler = async(req,res,next)=>{


    try {

        const allTodos = await Todo.find()

        return res.status(201).json({
            success:true,
            data:allTodos
        })
        
    } catch (err) {
        next(err)
    }

};




export const getTodo:RequestHandler = async(req,res,next)=>{

    try {
        const {id}=req.params;

        const todofound = await Todo.findById(id)

        //check if todood the id was not found
        if(!todofound){
            throw new CustomError("Todo not found",402)
        }

        return res.status(200).json({
            success:true,
            data:todofound
        })


    } catch (error) {
        next(error)
    }

};




export const createTodo:RequestHandler = async(req,res,next)=>{

    try {
        
        const {title,description,completed} =req.body;

       const newTodo = await Todo.create({title,description,completed})
        console.log(newTodo)
       if(newTodo){
        return res.status(200).json({
            success: true,
            data: newTodo
        })
       }else{

         throw  new CustomError("Todo creation failed",401)
       }



    } catch (error) {
        next(error)
    }

};




export const updateTodo:RequestHandler = async(req,res,next)=>{

    try {
        const {id} =req.params;
        const {title,description,completed}=req.body;

        const updatedTodo =await Todo.findByIdAndUpdate(id,{title,description,completed},{new:true})

        if(!updatedTodo){throw new CustomError("Todo item not found",402)}

        return res.status(200).json({
            success:true,
            data:updatedTodo
        })

    } catch (err) {
        next(err)
    }

};




export const deleteTodo:RequestHandler = async(req,res,next)=>{

    try {
        const {id}=req.params;

        const todoItem = await Todo.findByIdAndDelete(id)

        //check if todood the id was not found
        if(!todoItem){
            throw new CustomError("Todo not found",402)
        }

        return res.status(200).json({
            success:true,
            message:"Todo deeleted successfully"
        })


    } catch (error) {
        next(error)
    }


};







