import { EntityRepository, Repository, LessThan } from "typeorm";
import { Score } from "./Score.model";

@EntityRepository(Score)
export class ScoreRepository extends Repository<Score> {
    public findOneById(idScore: number): Promise<Score> {
        return this.manager.findOne(Score, {where: {id: idScore}, relations: ["team", "profile"]});
    }

    public findByMatch(idMatch: number): Promise<Score[]> {
        return this.manager.find(Score, {where: {match: idMatch}, relations: ["team", "profile"]});
    }

    public findByMatchAndTeam(idMatch: number, idTeam: number): Promise<Score[]> {
        return this.manager.find(Score, {where: {match: idMatch, team: idTeam}, relations: ["team", "profile"]});
    }
}
