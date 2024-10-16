import '../util/initEnv'

import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import JWT from 'jsonwebtoken'

const EventImage = connection1.define(
  'EventImage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    organizer: {
      type: DataTypes.STRING,
    },
    city_id: {
      type: DataTypes.INTEGER,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    date_start: {
      type: DataTypes.TIME,
    },
    date_end: {
      type: DataTypes.TIME,
    },
  },
  {
    tableName: 'event_image',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

export default EventImage
