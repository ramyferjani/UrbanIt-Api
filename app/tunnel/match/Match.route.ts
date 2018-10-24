import * as express from "express";
import { MatchController } from "../match/Match.controller";

export const MatchRoute: express.Router = express.Router()
    .get("/", MatchController.All)
    .post("/elo", MatchController.Ranking)
