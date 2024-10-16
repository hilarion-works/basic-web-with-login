require('dotenv').config()
import './initEnv'

// import { debugDB } from './debug'
import { Sequelize } from 'sequelize'

// const sequelize = new Sequelize(process.env.DB_USERNAME ?? "", {})
export const connection1 = new Sequelize(process.env.DATABASE_URL ?? "", {
  ssl: false,
  // dialectOptions: {
  //   ssl: {
  //     // require: true,
  //     rejectUnauthorized: false
  //   }
  // },
  logging: console.log,
  // logging: false,
  // logging: true,
  timezone: '+07:00',
  pool: {
    max: 10,
    acquire: 40000,
    idle: 10000,
    evict: 1000
  },
  // define: {
  //   underscored: true,
  //   timestamps: true
  // }
  // ssl: true,
  // dialectOptions: {
  //   ssl: {
  //     ca: fs.readFileSync(__dirname + '/key/ca-certificate-devdb-v2.crt')
  //   }
  // }
})
