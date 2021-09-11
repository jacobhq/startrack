import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Center } from '@chakra-ui/react'

function Account({ router }) {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        // TODO: Auth security
    }, [])

    return (
        <Center>
            
        </Center>
    )
}

export default withRouter(Account)