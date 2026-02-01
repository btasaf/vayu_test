import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface UserGroupAttributes {
  userId: number;
  groupId: number;
}

class UserGroup extends Model<UserGroupAttributes> implements UserGroupAttributes {
  public userId!: number;
  public groupId!: number;
}

UserGroup.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'user_id'
    },
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'group_id'
    }
  },
  {
    sequelize,
    tableName: 'user_groups',
    timestamps: false
  }
);

export default UserGroup;
