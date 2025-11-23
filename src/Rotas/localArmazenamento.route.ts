import express from "express"
import localArmazenamentoOrm from "../Controladores/localArmazenamentoTypeorm.controller";
import { verificarToken } from "../middlewares/auth.middleware";

const route = express.Router()

route.get("/:corredor", verificarToken, localArmazenamentoOrm.getLocalByCorredor);
route.get("/", verificarToken, localArmazenamentoOrm.getLocais);
route.post("/", verificarToken, localArmazenamentoOrm.createLocalArmazenamento);
route.put("/:corredor", verificarToken, localArmazenamentoOrm.updateLocal);
route.delete("/:corredor", verificarToken, localArmazenamentoOrm.deleteLocal);
export default route;