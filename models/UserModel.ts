import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document{
    username:string,
    email:string,
    password:string
}



export const UserSchema: Schema<User>  = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        }
    }
)

export const UserModel : Model<User>=(mongoose.models.User as Model<User>) || mongoose.model("User",UserSchema)