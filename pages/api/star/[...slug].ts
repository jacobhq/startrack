import { Octokit } from "@octokit/rest";
import axios from 'axios';
import { useState } from 'react';
import { getToken } from "next-auth/jwt"
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

const secret = process.env.SECRET

export default async (req, res) => {
  const { slug } = req.query
  const session = await getSession({ req })

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

  await octokit.request('PUT /user/starred/{owner}/{repo}', {
    owner: slug[0],
    repo: slug[1]
  })

  res.status(201).send("Done")
};