import { Group } from '../models';

export class GroupService {
  async findAll(limit: number = 10, offset: number = 0): Promise<{ groups: Group[]; total: number }> {
    const { rows, count } = await Group.findAndCountAll({ limit, offset });
    return { groups: rows, total: count };
  }

}

export default new GroupService();
