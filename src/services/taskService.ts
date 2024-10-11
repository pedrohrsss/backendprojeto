import { error } from "console";
import { DevDataSource } from "../connections/dbDev";
import { Task } from "../models/task";
import { promises } from "dns";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Task)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newTaskRequest = {
    description: string,
    date_task: Date
}

type findTaskRequest = {
    id: string
}

type updateTaskRequest = {
    id : string
    description : string
    date_task : Date
}

export class TaskService {
    async createTask({ description, date_task } : newTaskRequest) : Promise<Task | Error> {
        
        try{
            // INSERT INTO tasks VALUES(description, date_task)
            const task = cursor.create({
                description, date_task
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(task)
            return task
        
        } catch(err){
            return new Error("Unexpected error reading task")
        }
    }

    async readOneTask({ id } : findTaskRequest) : Promise<Task | Error> {

        try {
        // SELECT * FROM tasks WHERE id = id LIMIT 1
        const task = await cursor.findOne({ where: {id}})
        if(!task) {
            return new Error("Task not found!")
        }
        return task
        } catch(err){
            return new Error("Unexpected error reading task")
        }

    }
    
    async readAllTask(): Promise<Task[] | Error> {

        try {
            // SELECT * FROM tasks
            const tasks = await cursor.find()
            return tasks
        }catch (err){
            return new Error("Unexpected error reading task")
        }
        
    }
    
    async updateTask({id, description, date_task} : updateTaskRequest) : Promise<Task | Error> {
        try{
            // SELECT * FROM tasks WHERE id = id LIMIT 1
            const task = await cursor.findOne({where : {id}})
                if(!task){
                    return new Error("task not found!")
                }

                task.description = description ? description : task.description
                task.date_task = date_task ? date_task : task.date_task

                await cursor.save(task)
                return task
        }catch(err){
            return new Error("Unexpected error reading task")
        }

    }
    
    async deleteTask({id} : findTaskRequest): Promise<string| Error> { 
        
        try{
            // SELECT * FROM tasks WHERE id = id LIMIT 1
            const task = await cursor.findOne({where : {id}})
                if(!task){
                    return new Error("task not found!")
                }
                await cursor.delete(task.id)
                return "Deletado com sucesso"
        }catch(err){
            return new Error("Unexpected error reading task")
        }

    }
}