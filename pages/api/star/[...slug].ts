import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useState } from 'react';
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const { slug } = req.query
  const token = await getToken({ req, secret })
  let data

  await axios.get('http://localhost:3000/api/getToken', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(function (response) {
    data = response.data
    res.send(slug, response.data.token)
    axios.put('https://api.github.com/user/starred/' + slug[0] + '/' + slug[1], {
      headers: {
        'Authorization': `Bearer ${response.data.token}`
      }
    })
  }).catch(function (error) {
    // handle error
    console.log(error.message)
  })

  res.end(slug.toString(), data);
};