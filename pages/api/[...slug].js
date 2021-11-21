import { getSession } from 'next-auth/react'
import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useState } from 'react';
let token

async function getToken () {
  await axios.get('/api/getToken').then(function (res) {
    token = res
  })
}

export default async (req, res) => {
  const session = await getSession({ req });

  getToken()

  const {id} = req.query
  const octokit = new Octokit({
    auth: token
  });

  const data = await octokit.request('PUT /user/starred/{owner}/{repo}', {
    owner: id[0],
    repo: id[1]
  })

  res.status(200).json(data);
};