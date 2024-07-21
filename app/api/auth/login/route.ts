import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

const SECRET_KEY = "123";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  //   console.log(username);
  //   console.log(password);
  //to test
  if (username !== "" && password !== "") {
    const token = sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return NextResponse.json({ username, token });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
