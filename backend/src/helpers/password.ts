import bcrypt from 'bcryptjs';

// export default {
//   generatePassword: function (email: string, password: string) {
//     return new Promise(function (resolve, reject) {
//       const saltRound = 10
//       const emailPassword = email + password
//       bcrypt.genSalt(saltRound, function (err: Error | null, salt: string): void {
//         bcrypt.hash(emailPassword, salt, function (err: Error | null, hash: string) {
//           if (!err) {
//             resolve(hash)
//           } else {
//             reject(err)
//           }

//         })
//       })
//     })
//   },

//   checkPassword: function (password: string, hashedPassword: string, email: string) {
//     const emailPassword = email + password
//     return new Promise((resolve, reject) => {
//       bcrypt.compare(emailPassword, hashedPassword, function (err: Error | null, data: boolean) {
//         if (data) {
//           resolve(data)
//         } else {
//           reject(err)
//         }
//       });
//     } )
//   },
// }

export const generatePassword = function async (email: string, password: string) {
  return new Promise(function (resolve: (arg0: string) => void, reject: (arg0: Error) => void) {
    const saltRound = 10
    const emailPassword = email + password
    bcrypt.genSalt(saltRound, function (err: Error | null, salt: string): void {
      bcrypt.hash(emailPassword, salt, function (err: Error | null, hash: string) {
        if (!err) {
          resolve(hash)
        } else {
          reject(err)
        }
      })
    })
  })
}

export const checkPassword = function async (password: string, hashedPassword: string, email: string) {
  const emailPassword = email + password
  return bcrypt.compare(emailPassword, hashedPassword)
}