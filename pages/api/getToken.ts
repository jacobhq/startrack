// pages/api/getToken.js
// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (token) {
    // Signed in
    // @ts-ignore
    res.json(token)
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}