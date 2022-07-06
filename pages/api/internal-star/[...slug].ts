import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useState } from 'react';
import { getToken } from "next-auth/jwt"
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

const secret = process.env.SECRET

export default async (req, res) => {
  const { slug, returnTo } = req.query
  const session = await getSession({ req })
  if (!session) return res.status(401).send("Need authentication")
  if (!slug[0] || !slug[1]) return res.status(400).send("Bad request")

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email
    }
  })

  const account = await prisma.account.findFirst({
    where: {
      userId: user.id,
      provider: "github"
    }
  })

  if (!account) return res.status(401).text("Need gh account")

  const octokit = new Octokit({
    auth: account.access_token,
  })

  await octokit.request('GET /user/starred/{owner}/{repo}', {
    owner: slug[0],
    repo: slug[1]
  }).then((data) => {
    if (data.status === 204) return res.status(204).send("Already starred")
  }).catch((err) => {
    console.log(err)
  })

  await octokit.request('PUT /user/starred/{owner}/{repo}', {
    owner: slug[0],
    repo: slug[1]
  })

  if (returnTo) {
    return res.redirect(returnTo)
  }

  res.status(201).send("Done")
};