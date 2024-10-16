import '../util/initEnv'

import { connection1 } from '../util/database'
import { DataTypes } from 'sequelize'
import JWT from 'jsonwebtoken'

const User = connection1.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    role_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      // validate: {
      //   isEmail: {
      //     // args: true,
      //     msg: `email must be in correct format`
      //   },
      //   isUnique: function(value: string, cb: string) {
      //     const Op = require('sequelize').Op
      //     User.findOne({where: {id: {[Op.ne]: this.id}, email: value}})
      //       .then(user => {
      //         if(user) {
      //           // cb(`email already taken`)
      //         }
      //         else {
      //           // cb()
      //         }
      //       })
      //       .catch((err) => {err})
      //   }
      // }
    },
  },
  {
    // hooks: {
    //   beforeCreate: (instance, options) => {
    //     const { generatePassword } = require('../helpers/password')
    //     generatePassword(instance.email: any, instance.password)
    //     .then(function(newPassword: string){
    //       User.update(
    //         {
    //           password: newPassword,
    //         },
    //         {where : { email : instance.email }}
    //         )
    //         .then( (user) => {
    //           console.log("== validation password success", user);
    //         })
    //         .catch( (err) => {
    //           console.log("== validation passowrd failed", err);
    //         })
    //     })
    //   },
    // },
    tableName: 'user',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
)

// User.prototype.generateJWT = function() {
//   const { id, role_id } = this
//   const credentials = { id, role_id }
//   const token = JWT.sign(credentials, process.env.JWT_PRIVATE_KEY ?? "", {
//     expiresIn: '24h'
//   }) // Expiration Date For One Month
//   return token
// }

export default User
