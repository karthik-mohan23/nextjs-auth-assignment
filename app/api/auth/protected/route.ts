import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const SECRET_KEY = "123";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = verify(token, SECRET_KEY);
      // The decoded payload contains the user info
      const username = (decoded as { username: string }).username;
      verify(token, SECRET_KEY);
      return NextResponse.json({ username });
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
