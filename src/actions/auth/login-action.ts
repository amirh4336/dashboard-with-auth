"use server";

import { headers } from "next/headers";

export async function loginAction(phone: string) {
  try {
    const header = await headers();
    const host = header.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    
    const res = await fetch(`${baseUrl}/api/login/${phone}`, {
      method: "GET",
    });

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch user data" };
  }
}
