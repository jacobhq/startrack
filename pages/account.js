import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";

function account({ router }) {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        // TODO: Auth security
    }, [])

    return (
        <div>HI</div>
    )
}

export default withRouter(account)