import * as express from "express";
import * as jwt from "express-jwt";
import { UserRoute } from "../app/account/user/User.route";
import { ProfileRoute } from "../app/account/profile/Profile.route";
import { MatchRoute } from "../app/tunnel/match/Match.route";
import { TeamRoute } from "../app/tunnel/team/Team.route";
import { ScoreRoute } from "../app/score/score/Score.route";
import { SportRoute } from "../app/account/sport/Sport.route"
import { ConversationRoute } from "../app/messaging/conversation/Conversation.route"
import { MessageRoute } from "../app/messaging/message/Message.route"
import { config } from "../config";

interface IROUTER {
    path: string;
    middleware: any[];
    handler: express.Router;
}

export const ROUTER: IROUTER[] = [ {
    handler: UserRoute,
    middleware: [
        jwt({secret: config.SECRET}),
    ],
    path: "/user/jwt",
}, {
    handler: UserRoute,
    middleware: [],
    path: "/user",
}, {
    handler: ProfileRoute,
    middleware: [],
    path: "/profile",
}, {
    handler: MatchRoute,
    middleware: [],
    path: "/match",
}, {
    handler: TeamRoute,
    middleware: [],
    path: "/team",
}, {
    handler: ScoreRoute,
    middleware: [],
    path: "/score",
}, {
    handler: SportRoute,
    middleware: [],
    path: "/sport",
}, {
    handler: ConversationRoute,
    middleware: [],
    path: "/conversation",
}, {
    handler: MessageRoute,
    middleware: [],
    path: "/message",
}];
