import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Team } from "../team/Team.model"
import { Sport } from "../../account/sport/Sport.model"
import { Score } from "../../score/score/Score.model"
import { ScoreVerif } from "../../score/scoreVerif/ScoreVerif.model";

@Entity("match")
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;

    @ManyToOne(type => Sport, sport => sport.matchs)
    sport: Sport;

    @OneToMany(type => Team, team => team.match, {
        cascade: true
    })
    teams: Team[];

    @Column({
        default: false
    })
    public isFill: boolean;

    @OneToMany(type => Score, score => score.match, {
        cascade: true
    })
    scores: Score[];

    @Column({
        type: "numeric",
        default: 0
    })
    teamCount: number;

    @OneToOne(type => ScoreVerif, scoreVerif => scoreVerif.match, {
        cascade: true
    })
    @JoinColumn()
    scoreVerif: ScoreVerif;
}
