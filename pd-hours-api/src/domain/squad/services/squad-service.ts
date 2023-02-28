import { AppError } from '@shared/errors/app-error';
import { DayjsDateProvider } from '@shared/providers/date-provider/dayjs-date-provider';
import { getCustomRepository, getRepository } from 'typeorm';
import { SquadResponsePaginate } from '../models/squad-paginate-response';
import { SquadQueryRequest } from '../models/squad-query-request';
import { Squad } from '../typeorm/entities/squad';
import { SquadRepository } from '../typeorm/repositories/squad-repository';

export class SquadService {
  format = new DayjsDateProvider();
  async createSquad(name: string): Promise<Squad> {
    const squadRepository = getCustomRepository(SquadRepository);
    const squadExists = await squadRepository.findByName(name);

    if (squadExists) {
      throw new AppError(`Ja existe um squad com o nome: ${name}`, 400);
    }

    const squad = await squadRepository.create({
      name,
      created_at: this.format.convertToUTC(new Date()),
      updated_at: this.format.convertToUTC(new Date()),
    });
    const response = await squadRepository.save(squad);
    return response;
  }

  async findSquadId(id: string): Promise<Squad> {
    const squadRepository = getCustomRepository(SquadRepository);
    const squad = await squadRepository.findOne(id);
    if (!squad) {
      throw new AppError('Squad não encontrado', 404);
    }
    return squad;
  }

  async getSquads(
    squadQueryRequest: SquadQueryRequest,
  ): Promise<SquadResponsePaginate> {
    const squadRepository = getRepository(Squad);
    const page = squadQueryRequest.page ? Number(squadQueryRequest.page) : 1;
    const totalItemsPerPage = squadQueryRequest.totalItemsPerPage
      ? Number(squadQueryRequest.totalItemsPerPage)
      : 5;
    const query = squadRepository.createQueryBuilder('squads');

    query.skip((page - 1) * totalItemsPerPage).take(totalItemsPerPage);
    const [squads, count] = await query.getManyAndCount();
    const totalPages = Math.ceil(count / totalItemsPerPage);
    return {
      data: squads,
      totalItems: count,
      totalItemsPerPage,
      page,
      totalPages,
    };
  }
}
