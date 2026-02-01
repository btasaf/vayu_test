import User from './user.model';
import Group from './group.model';
import UserGroup from './userGroup.model';

User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId', otherKey: 'groupId', as: 'groups' });
Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId', otherKey: 'userId', as: 'users' });

export { User, Group, UserGroup };
