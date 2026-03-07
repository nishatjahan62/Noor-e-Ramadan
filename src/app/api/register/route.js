import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "সব field পূরণ করুন" },
        { status: 400 }
      );
    }

    const client   = await clientPromise;
    const db       = client.db();
    const existing = await db.collection("users").findOne({ email });

    if (existing) {
      return NextResponse.json(
        { error: "এই email দিয়ে আগেই account আছে" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashed,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Account তৈরি হয়েছে!" },
      { status: 201 }
    );

  } catch (err) {
  console.error("REGISTER ERROR:", err);  // ← এটা add করুন
  return NextResponse.json(
    { error: err.message },  // ← actual error দেখাবে
    { status: 500 }
  );
}
}