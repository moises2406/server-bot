import { RequestHandler } from "express";
import { AcountModel } from "../model/Acount";

// TODO: esto es para cuando ballas a crear un usuario
export const PostUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const newmodel = new AcountModel({ email, password });
  await newmodel.save();

  res.json({ cuenta: "creada" });
};

export const PostUserPrueba: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  

  res.json({ cuenta: "creada" });
};
// TODO: esto es para cuando ballas a crear un usuarios de ventas de una cuenta
export const PostUsersTheAcount: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  
  const usuarios = await AcountModel.findOne({ email });
  if (usuarios) {
    if (usuarios.password === password) {
      res.json(usuarios);
    } else {
      res.send("la contraceña no conside");
    }
  } else {
    res.send("este correo no existe");
  }
};
