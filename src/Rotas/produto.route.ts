import express from "express";
import produtoTypeorm from "../Controladores/produtoTypeorm.controller";
import { verificarToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:id", verificarToken, produtoTypeorm.getProdutoById);
router.get("/", verificarToken, produtoTypeorm.getProdutos);
router.post("/", verificarToken, produtoTypeorm.createProduto);
router.put("/:id", verificarToken, produtoTypeorm.updateProduto);
router.delete("/:id", verificarToken, produtoTypeorm.deleteProduto);
export default router;