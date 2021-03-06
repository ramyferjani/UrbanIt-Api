import * as express from "express";
import { url } from "inspector";
import { Match } from "./Match.model"
import { Sport } from "../../account/sport/Sport.model";
import { MatchService } from "./Match.service";
import { Team } from "../team/Team.model";
import { TeamService } from "../team/Team.service";
import { ResultHelpers } from "../../helpers/Result.helpers";
import { Profile } from "../../account/profile/Profile.model";
import { ConversationController } from "../../messaging/conversation/Conversation.controller";
import { ConversationService } from "../../messaging/conversation/Conversation.service";
import { ProfileService } from "../../account/profile/Profile.service";

export class MatchHelpers {
    public static Closest(matchs: Match[], num: number): Match {
        var minDiff = 4000;
        var match;

        matchs.forEach(function (element) {
            var m = Math.abs(num - element.ranking);
            if (m < minDiff) {
                minDiff = m;
                match = element;
            }
        });

        return match;
    }

    public static async CreateMatch(sport: Sport) {
        const match = new Match();
        match.sport = sport;

        try {
            const Result = await MatchService.Save(match);
            return Result;
        } catch (ex) {
            return null;
        }
    }

    public static AverageRank(match: Match, rank: number): number {
        var sum = Number(0);
        match.teams.forEach(function (element) {
            sum += Number(element.ranking);
        });
        sum += Number(rank);
        var averrage = Number(sum) / Number(((match.teams ? match.teams.length : 0) + 1));
        match.ranking = averrage;

        return averrage;
    }

    public static SumAverageRank(match: Match): number {
        var sum = Number(0);
        match.teams.forEach(function (element) {
            sum += Number(element.ranking);
        });
        var averrage = Number(sum) / Number(((match.teams ? match.teams.length : 0)));
        match.ranking = averrage;

        return averrage;
    }

    public static async SaveAndReturn(match: Match, team: Team, res: express.Response, profileId: number) {
        if (team.isFill) {
            if (!match.teams || match.teams.length <= 0) {
                match.ranking = team.ranking;
                match.teamCount = 1;
            } else {
                match.ranking = MatchHelpers.AverageRank(match, team.ranking);
                match.teamCount = ((match.teams ? match.teams.length : 0) + 1);
            }
            if (match.teamCount == match.sport.nbTeam) {
                match.isFill = true;
                try {
                    const profilesInMatch: Profile[] = [];
                    match.teams.forEach(team => team.profiles.forEach(pro => profilesInMatch.push(pro)));
                    const conversation = await ConversationController.CreateConversation(profilesInMatch);
                    await ConversationService.Save(conversation);
                } catch (ex) {
                    return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
                }
            }

            try {
                await MatchService.Save(match);
            } catch (ex) {
                return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
            }
            team.match = match;
            try {
                await TeamService.Save(team);
                const ProfileResult = await ProfileService.FindOneById(profileId);
                return res.status(200).json(ResultHelpers.createReturnJson(201, "success", ProfileResult))
            } catch (ex) {
                return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
            }
        } else {
            return res.status(400).json(ResultHelpers.createReturnJson(400, "error", { server: "team not fill" }));
        }
    }
}
