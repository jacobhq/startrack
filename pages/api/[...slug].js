import { oAuthToken } from "../signup"
import { supabase } from "../../utils/supabaseClient"

export default function handler(req, res) {
    const { slug } = req.query

    if (!oAuthToken) res.redirect('/signup')

    res.end(`Post: ${slug.join(', ')}, slug: ${slug}, and token: ${oAuthToken}`)
  }