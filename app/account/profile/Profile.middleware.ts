import * as express from "express";
import { ProfileService } from "./Profile.service"
import { TeamService } from "../../tunnel/team/Team.service"
import { SportService } from "../sport/Sport.service"
import { StringHelpers } from "../../helpers/String.helpers"

export async function ProfileExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idProfile: number = req.body.idProfile;
    const profile = await ProfileService.FindOneById(idProfile);
    profile ? next() : res.status(404).json({error: "profile doesn't exist"});
}

export async function ProfileShouldntExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idUser: number = req.body.idUser;
    const sport = await SportService.FindBySport(req.body.sport);
    const profile = await ProfileService.FindOneByUserAndSport(idUser, sport);
    !profile ? next() : res.status(404).json({error: "profile already exist"});
}

export async function TeamExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idTeam: number = req.params.idTeam != null ? req.params.idTeam : req.body.idTeam != null ? req.body.idTeam : res.status(404).json({error: "we need idTeam"});
    const team = await TeamService.FindOneById(idTeam);
    team ? next() : res.status(404).json({error: "team doesn't exist"});
}

export async function CheckCreate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.idUser)){
        res.status(404).json({error: "we need idUser"});
    }
    else if (StringHelpers.isNullOrWhitespace(req.body.sport)){
        res.status(404).json({error: "we need sport"});
    }
    // else if (StringHelpers.isNullOrWhitespace(req.body.size)){
    //     res.status(404).json({error: "we need size"});
    // }
    // else if (StringHelpers.isNullOrWhitespace(req.body.weight)){
    //     res.status(404).json({error: "we need weight"});
    // }
    // else if (StringHelpers.isNullOrWhitespace(req.body.numero)){
    //     res.status(404).json({error: "we need numero"});
    // }
    // else if (StringHelpers.isNullOrWhitespace(req.body.position)){
    //     res.status(404).json({error: "we need position"});
    // }
    else {
        next();
    }
}

export async function CheckJoin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.idProfile)){
        res.status(404).json({error: "we need idProfile"});
    }
    else {
        next();
    }
}

export async function CheckDelete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.id)){
        res.status(404).json({error: "we need id"});
    }
    else {
        next();
    }
}