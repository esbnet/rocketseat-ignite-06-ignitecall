import dayjs from "dayjs";
import { google } from "googleapis";
import { prisma } from "./prisma";

export async function getGoogleOAuthToken(userId: string) {

  const account = await prisma.account.findFirst({
    where: {
      provider: 'google',
      user_id: userId
    }
  })

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )

  if(!account?.access_token || !account?.refresh_token || !account?.expires_at)  {
    return auth;
  }

  auth.setCredentials({ 
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at * 1000,
  })

  const isTokenExpered = dayjs(account.expires_at * 1000).isBefore(new Date)

  if(isTokenExpered) {
    const { credentials} = await auth.refreshAccessToken()
    const {
       access_token, 
       expiry_date, 
       id_token, 
       refresh_token, 
       scope, 
       token_type 
    } = credentials

    await prisma.account.update({
      where: {
        id: userId
      },
      data: {
        access_token, 
        expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null, 
        id_token, 
        refresh_token, 
        scope, 
        token_type 
       }
    })

    auth.setCredentials({
      access_token, 
      refresh_token, 
      expiry_date, 
    })
  }

  return auth

}