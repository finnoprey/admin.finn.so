import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Finn's Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
    </div>
  )
}
