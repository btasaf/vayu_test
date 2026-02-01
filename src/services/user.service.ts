import { User, Group, UserGroup } from '../models';
import { UserStatus } from '../models/user.model';
import sequelize from '../config/database';

export class UserService {
  async findAll(limit: number = 10, offset: number = 0): Promise<{ users: User[]; total: number }> {
    const { rows, count } = await User.findAndCountAll({ limit, offset });
    return { users: rows, total: count };
  }
  
  async batchStatusChange(users: { id: number; status: UserStatus }[]): Promise<{ updated: number }> {
    if (users.length === 0) {
      return { updated: 0 };
    }

    const ids = users.map(u => u.id);
    const statusMap = new Map(users.map(u => [u.id, u.status]));

    const existingUsers = await User.findAll({ where: { id: ids } });

    if (existingUsers.length === 0) {
      return { updated: 0 };
    }

    const usersToUpdate = existingUsers.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      status: statusMap.get(u.id)!
    }));

    await User.bulkCreate(usersToUpdate, { updateOnDuplicate: ['status'] });

    return { updated: usersToUpdate.length };
  }

  async removeFromGroup(userId: number, groupId: number): Promise<boolean> {
    return sequelize.transaction(async (t) => {
      const affected = await UserGroup.destroy({ where: { userId, groupId }, transaction: t });

      if (affected > 0) {
        const remainingMembers = await UserGroup.count({ where: { groupId }, transaction: t });
        if (remainingMembers === 0) {
          await Group.update({ status: 'empty' }, { where: { id: groupId }, transaction: t });
        }
      }

      return affected > 0;
    });
  }
}



export default new UserService();
