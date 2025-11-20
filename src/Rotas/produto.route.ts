import express from "express";
import produtoTypeorm from "../Controladores/produtoTypeorm.controller";

const router = express.Router();

router.get("/:id", produtoTypeorm.getProdutoById);
router.get("/", produtoTypeorm.getProdutos);
router.post("/", produtoTypeorm.createProduto);
router.put("/:id", produtoTypeorm.updateProduto);
router.delete("/:id", produtoTypeorm.deleteProduto);
export default router;