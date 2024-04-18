import { connectDB } from "@/lib/dbConnect";
import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    await connectDB()
  const users= await UserModel.find({},{ password: 0 });
    if(!users) return NextResponse.json([]);
  return NextResponse.json(users);

}