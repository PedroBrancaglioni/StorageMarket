import express from "express"
import authController from "../Controladores/auth.controller"

const route = express.Router();

route.post("/login",authController.login);

export default route;