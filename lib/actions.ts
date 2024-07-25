"use server"

import { SessionData } from "@/lib/session";
import { defaultSession, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ADD THE GETSESSION ACTION
export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
    // If user visits for the first time session returns an empty object.
    // Let's add the isLoggedIn property to this object and its value will be the default value which is false
    if (!session.isLoggedIn) {
      session.isLoggedIn = defaultSession.isLoggedIn;
    }
  
    return session;
}

export async function login(
    formData: FormData
  ) {
    const session = await getSession();
  
    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;
  
    // CHECK USER IN DB USING THE USERNAME AND PASSWORD
    // it depends on your database (mongoose,prisma,drizzle etc.)
    // for the testing purpose, I assigned a dummy user
    const user = {
      id:1,
      username:formUsername,
      img:"avatar.png"
    }
  
    // IF CREDENTIALS ARE WRONG RETURN AN ERROR
    if(!user){
        return { error: "Wrong Credentials!" }
    }
  
    // You can pass any information you want
    session.isLoggedIn = true;
    session.user = user;
  
    await session.save();
    redirect("/")
}