import { RequestHandler } from "express";
import { DialogoModel } from "../model/conversaciones";

// TODO: recuerda balidar la password
export const GetRute: RequestHandler = async (req, res) => {
    const user = req.params;
   const resdatos = await DialogoModel.find({ user:user.id });
    
   res.status(200).json(resdatos);
 };
 
 // TODO: recuerda balidar la password
 export const GetRuteID: RequestHandler = async (req, res) => {
   const ID = req.params;
   
  const resdatos = await DialogoModel.findById({_id:ID.id});
   
  res.status(200).json(resdatos);
 };


 // TODO: recuerda balidar la password
export const GetRuteUrl: RequestHandler = async (req, res) => {
    const user = req.body;
   const resdatos = await DialogoModel.findOne({ identificador:user.uri });
    
   if (resdatos) {
    res.status(200).json(resdatos);
   } else {
    res.status(200).json({no:'no'});
   }
 };