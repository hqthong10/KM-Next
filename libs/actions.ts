"use server"
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function authenticate(email: string, password: string) {
  try{
    const rs = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    console.log('signIn', rs);
    return rs;
  } catch (error) {
    if((error as any).name === 'InvalidEmailPasswordError') {
      return { error: "Incorrect username or password" }
    }
    return { error: "Incorrect username or password" }
  }
}