import { RequestHandler } from "express";
import { DialogoModel } from "../model/conversaciones";
import { UserModel } from "../model/user";

export const DeleteRute: RequestHandler = async (req, res) => {
    console.log('borrado');
    
   await DialogoModel.deleteMany();
    
   res.status(200);
 };

 export const DeleteRuteUserModel: RequestHandler = async (req, res) => {
  console.log('borrado');
  
 await UserModel.deleteMany();
  
 res.status(200);
};

 