import { Router } from "express";
import { PaymentController } from "../controllers/folha.controller";

const router : Router = Router();

router.post("/:folha/:cadastrar", new PaymentController().cadastrar);
router.get("/:folha/:listar", new PaymentController().listar);
router.get("/:folha/:listar/:cpf/:mes/:ano", new PaymentController().buscar);

export { router };