import { Router } from "express";

import { currencyController } from "../controllers/currency.controller";

const router = Router();

router.get("/", currencyController.getAll);

export const currencyRouter = router;
