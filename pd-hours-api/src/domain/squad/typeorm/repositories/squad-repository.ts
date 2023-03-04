import { EntityRepository, Repository } from 'typeorm';
import { Squad } from '../entities/squad';

@EntityRepository(Squad)
class SquadRepository extends Repository<Squad> {
  public async findById(id: number): Promise<Squad> {
    const squad = await this.findOne({
      where: {
        id,
      },
    });

    return squad;
  }

  public async findByName(name: string): Promise<Squad> {
    const squad = await this.findOne({
      where: {
        name: name,
      },
    });

    return squad;
  }

  public async findNameById(id: number): Promise<string> {
    const squad = await this.findOne({
      where: {
        id,
      },
    });

    if (!squad) {
      return '';
    }

    return squad.name;
  }
}

export { SquadRepository };
