import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface GroupAttributes {
  id: number;
  name: string;
  status: string;
  createdAt?: Date;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public readonly createdAt!: Date;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'groups',
    updatedAt: false
  }
);

export default Group;
