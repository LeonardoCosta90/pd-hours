import { EntityRepository, Repository } from 'typeorm';
import { Squad } from '../entities/squad';

@EntityRepository(Squad)
class SquadRepository extends Repository<Squad> {
  public async findById(id: number): Promise<Squad | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByName(name: string): Promise<Squad | undefined> {
    const user = await this.findOne({
      where: {
        name: name,
      },
    });

    return user;
  }
}

export { SquadRepository };
