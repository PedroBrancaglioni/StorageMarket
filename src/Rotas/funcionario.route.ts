import express from "express"
import funcionarioTypeorm from "../Controladores/funcionarioTypeorm.controller";

const route = express.Router()

route.get("/:cpf",funcionarioTypeorm.getFuncionarioByCPF);
route.get("/",funcionarioTypeorm.getFuncionarios);
route.post("/",funcionarioTypeorm.createFuncionario);
route.put("/:cpf",funcionarioTypeorm.updateFuncionario);
route.delete("/:cpf",funcionarioTypeorm.deleteFuncionario);

export default route;