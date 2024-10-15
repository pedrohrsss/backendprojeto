import { Router } from "express"
import { TaskController } from "../controllers/taskController"

const router = Router()
const controller = new TaskController()
router.get("/", (request, response) => {
    return response.json("home page")
})

router.get("/tasks", controller.readAllTasks)

router.get("/tasks/:id", controller.readOneTasks)

router.get("/tasks", controller.createTask)

router.get("/tasks/:id", controller.updateTask)

router.get("/tasks/:id", controller.deleteTask)

export default router