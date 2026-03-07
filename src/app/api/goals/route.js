import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

async function getCollection(userId) {
  const client = await clientPromise;
  const db     = client.db("noor-e-ramadan");
  return db.collection("goals");
}

// GET — today's goals
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const col   = await getCollection();
  const today = new Date().toISOString().slice(0, 10);
  const goals = await col.find({ userId: session.user.id, date: today }).toArray();
  return NextResponse.json({ goals });
}

// POST — add goal
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: "Empty" }, { status: 400 });

  const col   = await getCollection();
  const today = new Date().toISOString().slice(0, 10);
  await col.insertOne({ userId: session.user.id, text, done: false, date: today, createdAt: new Date() });

  const goals = await col.find({ userId: session.user.id, date: today }).toArray();
  return NextResponse.json({ goals });
}

// PATCH — toggle done
export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const col    = await getCollection();
  const goal   = await col.findOne({ _id: new ObjectId(id) });
  if (!goal) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await col.updateOne({ _id: new ObjectId(id) }, { $set: { done: !goal.done } });

  const today = new Date().toISOString().slice(0, 10);
  const goals = await col.find({ userId: session.user.id, date: today }).toArray();
  return NextResponse.json({ goals });
}

// DELETE — remove goal
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const col    = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id), userId: session.user.id });

  const today = new Date().toISOString().slice(0, 10);
  const goals = await col.find({ userId: session.user.id, date: today }).toArray();
  return NextResponse.json({ goals });
}