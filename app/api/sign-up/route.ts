import { connectDB } from "@/lib/dbConnect";
import { UserModel } from "@/models/UserModel";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest ){
    await connectDB()
    const body = await req.json();
    const {username, email, password} = body;
    if(!username || !email || !password){
        return NextResponse.json({message:"Please fill all the fields",sucess:false}, {status:400});
    }
    const user=await UserModel.findOne({username,email})
    if(user){
        return NextResponse.json({message:"Username already exists",sucess:false}, {status:400});
    }
    const newuser=await UserModel.create({username,email,password})
    if(!newuser){
        return NextResponse.json({message:"Something went wrong",sucess:false}, {status:500});
    }
    return  NextResponse.json({message:"User created", sucess:true },{status:200});
}