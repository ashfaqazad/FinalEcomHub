// app/api/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // JWT cookie ko expire kar do (clear the cookie)
    const response = NextResponse.json({ message: "Logout successful" });

    // Clear the cookie by setting empty token and setting maxAge = 0
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Logout failed", error }, { status: 500 });
  }
}
