import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

async function getCollection() {
  const client = await clientPromise;
  const db     = client.db("noor-e-ramadan");
  return db.collection("bookmarks");
}

// GET — user এর সব bookmarks
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const col       = await getCollection();
  const bookmarks = await col.find({ userId: session.user.id }).toArray();
  return NextResponse.json({ bookmarks });
}

// POST — bookmark toggle (add/remove)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, type } = await req.json();
  // type = "dua" | "recipe"

  const col      = await getCollection();
  const existing = await col.findOne({ userId: session.user.id, itemId, type });

  if (existing) {
    await col.deleteOne({ userId: session.user.id, itemId, type });
    return NextResponse.json({ bookmarked: false });
  } else {
    await col.insertOne({
      userId:    session.user.id,
      itemId,
      type,
      createdAt: new Date(),
    });
    return NextResponse.json({ bookmarked: true });
  }
}