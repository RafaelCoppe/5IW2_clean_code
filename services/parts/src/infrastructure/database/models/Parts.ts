import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

interface PartsRow {
  id: number;
  label: string;
  picture_link: string;
}

export class SequelizeParts extends Model<PartsRow, Omit<PartsRow, 'id'>> {
  declare id: number;
  declare label: string;
  declare picture_link: string;
}

SequelizeParts.init({
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true
  }, 
  label: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  picture_link: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false,
  tableName: 'parts'
})