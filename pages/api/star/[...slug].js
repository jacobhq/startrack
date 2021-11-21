import { getSession } from 'next-auth/react'
import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useState } from 'react';

export default async (req, res) => {
  const session = await getSession({ req });
  const { slug } = req.query
  let token

  await axios.get('/api/getToken').then(function (response) {
    console.log(slug)
    res.send(slug, response.token)
    token = response.token

    axios.put('https://api.github.com/user/starred/' + slug[0] + '/' + slug[1], {
      headers: {
        'Authorization': `Bearer ${response.token}`
      }
    })
  }).catch(function (error) {
    // handle error
    res.send(error)
  })

  res.end(slug.toString(), token);
};