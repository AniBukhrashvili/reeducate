import { Router } from "express";
import { randomService } from "./random.service.js";

const randomRouter = Router();

randomRouter.get("/", randomService);

export default randomRouter;
