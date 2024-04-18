import { connectDB } from "@/lib/dbConnect";
import { UserModel } from "@/models/UserModel";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";

export const authOption:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email", type:"email"},
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials :any ):Promise<any>{
                console.log(credentials);
                
                await connectDB()
                try {
                    const user= await UserModel.findOne({email:credentials.email})
                    if(!user) throw new Error("User not found")
                    if(user.password!==credentials.password) throw new Error("Invalid password")
                    return user
                } catch (error:any) {
                    throw new Error(error.message)
                }
                
            }
        })
    ],
    pages:{
        signIn:"/sign-in",
    },
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET,

}