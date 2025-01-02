"use server"
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try{
    const rs = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    return rs;
  } catch (error) {
    if((error as any).name === 'InvalidEmailPasswordError') {
      return { error: "Incorrect username or password" }
    }
    return { error: "Incorrect username or password" }
  }
}