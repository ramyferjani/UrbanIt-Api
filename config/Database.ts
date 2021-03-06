import { createConnection } from "typeorm";
import { User } from "../app/account/user/User.model";
import { Match } from "../app/tunnel/match/Match.model";
import { Team } from "../app/tunnel/team/Team.model";
import { Profile } from "../app/account/profile/Profile.model";
import { Sport } from "../app/account/sport/Sport.model";
import { Score } from "../app/score/score/Score.model";
import { TeamLeader } from "../app/tunnel/teamLeader/TeamLeader.model";
import { ScoreVerif } from "../app/score/scoreVerif/ScoreVerif.model"
import { config, DIALECT } from "../config";
import { Conversation } from "../app/messaging/conversation/Conversation.model";
import { Message } from "../app/messaging/message/Message.model";

export const Connection = createConnection({
    database: config.DATABASE.DB,
    entities: [
        User,
        Match,
        Team,
        Profile,
        Sport,
        Score,
        TeamLeader,
        ScoreVerif,
        Conversation,
        Message,
    ],
    host: config.DATABASE.SERVER,
    logging: false,
    password: config.DATABASE.PASSWORD,
    port: config.DATABASE.PORT_DB,
    synchronize: true,
    type: DIALECT,
    username: config.DATABASE.USER_DB,
});
