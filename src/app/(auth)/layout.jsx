import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

const AuthLayout = async({children}) => {
    const session = await auth.api.getSession({
        headers:await headers()
    })

    if(session){
        return redirect("/")
    }

  return (
    <div>{children}</div>
  )
}

export default AuthLayout