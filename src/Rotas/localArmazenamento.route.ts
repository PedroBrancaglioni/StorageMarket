import express from "express"
import localArmazenamentoOrm from "../Controladores/localArmazenamentoTypeorm.controller";

const route = express.Router()

route.get("/:corredor",localArmazenamentoOrm.getLocalByCorredor);
route.get("/",localArmazenamentoOrm.getLocais);
route.post("/",localArmazenamentoOrm.createLocalArmazenamento);
route.put("/:corredor",localArmazenamentoOrm.updateLocal);
route.delete("/:corredor",localArmazenamentoOrm.deleteLocal);
export default route;