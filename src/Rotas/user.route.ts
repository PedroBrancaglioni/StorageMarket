import express from "express"
import userController from "../Controladores/user.controller"
import userWithTypeormController from "../Controladores/userWithTypeorm.controller";

const route = express.Router()

route.get("/:username",userWithTypeormController.getUserByUsername);
route.get("/",userWithTypeormController.getUsers);
route.post("/",userWithTypeormController.createUser);

export default route;