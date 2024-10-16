import JWT from 'jsonwebtoken'

export const generateToken = (user: {id: number, role_id: number}) => {
      const { id, role_id } = user
      const credentials = { id, role_id }
      const token = JWT.sign(credentials, process.env.JWT_SECRET ?? "", {
        expiresIn: '30d'
      }) // Expiration Date For 30 days
      return token
    }


export const verifyToken = (token: string) => {
  const content = JWT.verify(token, 'shhhhh', function(err, decoded) {
    console.log(decoded) // bar
  });
  return content
}